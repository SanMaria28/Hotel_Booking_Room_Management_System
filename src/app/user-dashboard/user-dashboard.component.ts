import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

import { Booking } from '../models/booking.model';
import { Hotel } from '../models/hotel.model';
import { BookingService } from '../services/booking.service';
import { HotelService } from '../services/hotel.service';
import { UserService } from '../services/user.service';

type BookingView = Booking & { hotelName?: string };

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  readonly displayedColumns = ['hotelName', 'checkIn', 'checkOut', 'guests', 'amount', 'status', 'actions'];
  userName = '';
  bookings: BookingView[] = [];

  constructor(
    private readonly bookingService: BookingService,
    private readonly userService: UserService,
    private readonly hotelService: HotelService
  ) {}

  ngOnInit(): void {
    const user = this.userService.currentUser;
    if (!user) {
      return;
    }

    this.userName = user.fullName;
    this.loadBookings(user.id);
  }

  cancel(id: number): void {
    const booking = this.bookings.find((item) => Number(item.id) === Number(id));
    if (!booking) {
      return;
    }

    this.bookingService
      .cancelBooking(id)
      .pipe(
        switchMap(() => this.hotelService.updateRoomAvailability(booking.roomId, true)),
        switchMap(() => this.bookingService.getUserBookings(this.userService.currentUser!.id))
      )
      .subscribe((bookings) => this.mapBookings(bookings));
  }

  private loadBookings(userId: number): void {
    this.bookingService.getUserBookings(userId).subscribe((bookings) => this.mapBookings(bookings));
  }

  private mapBookings(bookings: Booking[]): void {
    this.hotelService.getHotels().subscribe((hotels) => {
      this.bookings = bookings.map((booking) => ({
        ...booking,
        hotelName: hotels.find((hotel: Hotel) => hotel.id === booking.hotelId)?.name
      }));
    });
  }
}
