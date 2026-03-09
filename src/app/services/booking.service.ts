import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly bookingsUrl = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) {}

  createBooking(booking: Omit<Booking, 'id'>): Observable<Booking> {
    return this.http.post<Booking>(this.bookingsUrl, booking);
  }

  getUserBookings(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.bookingsUrl}?userId=${userId}`);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingsUrl);
  }

  cancelBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.bookingsUrl}/${bookingId}`);
  }
}
