import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

import { Booking } from '../models/booking.model';
import { Room } from '../models/room.model';
import { BookingService } from '../services/booking.service';
import { HotelService } from '../services/hotel.service';
import { UserService } from '../services/user.service';
import { BookingConfirmationDialogComponent } from './booking-confirmation-dialog.component';

@Component({
  selector: 'app-booking-form',
  standalone: false,
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingForm!: FormGroup;
  hotelId = 0;
  hotelName = '';
  hotelPrice = 0;
  selectedRoom?: Room;
  rooms: Room[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly bookingService: BookingService,
    private readonly hotelService: HotelService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group(
      {
        checkIn: ['', Validators.required],
        checkOut: ['', Validators.required],
        guests: [1, [Validators.required, Validators.min(1)]],
        roomId: [null, Validators.required]
      },
      { validators: this.dateRangeValidator }
    );

    this.route.paramMap.subscribe((params) => {
      this.hotelId = Number(params.get('id'));
      this.hotelService.getHotelById(this.hotelId).subscribe((hotel) => (this.hotelName = hotel.name));
      this.hotelService.getRooms(this.hotelId).subscribe((rooms) => {
        this.rooms = rooms.filter((room) => room.isAvailable);
        if (this.rooms.length) {
          this.bookingForm.patchValue({ roomId: this.rooms[0].id });
          this.setSelectedRoom(this.rooms[0].id);
        }
      });
    });

    this.bookingForm.get('roomId')?.valueChanges.subscribe((roomId) => this.setSelectedRoom(Number(roomId)));
  }

  get totalAmount(): number {
    const checkIn = this.bookingForm.get('checkIn')?.value;
    const checkOut = this.bookingForm.get('checkOut')?.value;
    return this.calculateNights(checkIn, checkOut) * this.hotelPrice;
  }

  submit(): void {
    if (this.bookingForm.invalid || !this.userService.currentUser || !this.selectedRoom) {
      return;
    }

    const value = this.bookingForm.getRawValue();
    const bookingDraft: Omit<Booking, 'id'> = {
      userId: this.userService.currentUser.id,
      hotelId: this.hotelId,
      roomId: value.roomId,
      guests: value.guests,
      checkIn: value.checkIn,
      checkOut: value.checkOut,
      totalAmount: this.totalAmount,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    this.dialog
      .open(BookingConfirmationDialogComponent, {
        data: {
          hotelName: this.hotelName,
          guests: value.guests,
          checkIn: value.checkIn,
          checkOut: value.checkOut,
          totalAmount: this.totalAmount
        }
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) {
          return;
        }

        this.bookingService
          .createBooking(bookingDraft)
          .pipe(switchMap(() => this.hotelService.updateRoomAvailability(value.roomId, false)))
          .subscribe({
          next: () => {
            this.snackBar.open('Booking confirmed successfully.', 'Close', { duration: 3000 });
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.snackBar.open(`Booking failed: ${error.message}`, 'Close', { duration: 3000 });
          }
          });
      });
  }

  private setSelectedRoom(roomId: number): void {
    this.selectedRoom = this.rooms.find((room) => room.id === roomId);
    this.hotelPrice = this.selectedRoom?.price ?? 0;
  }

  private dateRangeValidator(form: FormGroup): { dateRange: true } | null {
    const checkIn = form.get('checkIn')?.value;
    const checkOut = form.get('checkOut')?.value;

    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      return { dateRange: true };
    }

    return null;
  }

  private calculateNights(checkIn?: string, checkOut?: string): number {
    if (!checkIn || !checkOut) {
      return 1;
    }

    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
  }
}
