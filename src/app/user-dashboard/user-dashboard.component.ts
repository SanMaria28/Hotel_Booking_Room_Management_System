import { Component } from '@angular/core';

interface Booking {
  id: number;
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: string;
}

interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  date: string;
  method: string;
  status: string;
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  userName = 'Clara Patrison';
  
  bookings: Booking[] = [
    {
      id: 1,
      hotelName: 'Grand Hyatt',
      roomType: 'Deluxe Room',
      checkIn: '2026-02-15',
      checkOut: '2026-02-18',
      guests: 2,
      totalAmount: 15000,
      status: 'Confirmed'
    },
    {
      id: 2,
      hotelName: 'Seaside Resort',
      roomType: 'Beach View Room',
      checkIn: '2026-03-10',
      checkOut: '2026-03-12',
      guests: 3,
      totalAmount: 16000,
      status: 'Pending'
    },
    {
      id: 3,
      hotelName: 'Cozy Cottage',
      roomType: 'Standard Room',
      checkIn: '2026-01-05',
      checkOut: '2026-01-07',
      guests: 2,
      totalAmount: 4000,
      status: 'Completed'
    }
  ];

  payments: Payment[] = [
    {
      id: 1,
      bookingId: 1,
      amount: 15000,
      date: '2026-01-20',
      method: 'Credit Card',
      status: 'Paid'
    },
    {
      id: 2,
      bookingId: 2,
      amount: 16000,
      date: '2026-01-21',
      method: 'UPI',
      status: 'Pending'
    },
    {
      id: 3,
      bookingId: 3,
      amount: 4000,
      date: '2026-01-04',
      method: 'Debit Card',
      status: 'Paid'
    }
  ];
}
