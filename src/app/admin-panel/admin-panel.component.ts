import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest } from 'rxjs';

import { Booking } from '../models/booking.model';
import { Hotel } from '../models/hotel.model';
import { Room } from '../models/room.model';
import { BookingService } from '../services/booking.service';
import { HotelService } from '../services/hotel.service';

interface OccupancyRow {
  hotelName: string;
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
}

@Component({
  selector: 'app-admin-panel',
  standalone: false,
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  readonly bookingColumns = ['id', 'hotel', 'checkIn', 'checkOut', 'guests', 'amount', 'status'];
  readonly roomColumns = ['roomType', 'hotel', 'category', 'capacity', 'price', 'availability'];
  readonly occupancyColumns = ['hotelName', 'totalRooms', 'occupiedRooms', 'availableRooms'];

  roomForm!: FormGroup;
  bookings: Booking[] = [];
  rooms: Room[] = [];
  hotels: Hotel[] = [];
  occupancyRows: OccupancyRow[] = [];

  constructor(
    private readonly bookingService: BookingService,
    private readonly hotelService: HotelService,
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.roomForm = this.fb.group({
      hotelId: [null, Validators.required],
      roomType: ['', Validators.required],
      category: ['standard', Validators.required],
      price: [5000, [Validators.required, Validators.min(1000)]],
      capacity: [2, [Validators.required, Validators.min(1)]],
      discounted: [false],
      isAvailable: [true]
    });

    this.loadAdminData();
  }

  submitRoom(): void {
    if (this.roomForm.invalid) {
      this.roomForm.markAllAsTouched();
      return;
    }

    const value = this.roomForm.getRawValue();
    this.hotelService
      .createRoom({
        hotelId: value.hotelId,
        roomType: value.roomType,
        category: value.category,
        price: value.price,
        capacity: value.capacity,
        isAvailable: value.isAvailable,
        discounted: value.discounted,
        amenities: ['Premium Linen', 'Housekeeping', 'WiFi'],
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
      })
      .subscribe(() => {
        this.snackBar.open('Room saved successfully.', 'Close', { duration: 3000 });
        this.roomForm.reset({
          category: 'standard',
          price: 5000,
          capacity: 2,
          discounted: false,
          isAvailable: true
        });
        this.loadAdminData();
      });
  }

  hotelName(hotelId: number): string {
    return this.hotels.find((hotel) => hotel.id === hotelId)?.name ?? 'Unknown';
  }

  private loadAdminData(): void {
    combineLatest([
      this.hotelService.getHotels(),
      this.hotelService.getAllRooms(),
      this.bookingService.getAllBookings()
    ]).subscribe(([hotels, rooms, bookings]) => {
      this.hotels = hotels;
      this.rooms = rooms;
      this.bookings = bookings;
      this.occupancyRows = hotels.map((hotel) => {
        const hotelRooms = rooms.filter((room) => room.hotelId === hotel.id);
        const occupiedRooms = hotelRooms.filter((room) => !room.isAvailable).length;

        return {
          hotelName: hotel.name,
          totalRooms: hotelRooms.length,
          occupiedRooms,
          availableRooms: hotelRooms.length - occupiedRooms
        };
      });
    });
  }
}
