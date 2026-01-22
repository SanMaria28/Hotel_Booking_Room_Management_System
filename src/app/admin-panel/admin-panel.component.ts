import { Component } from '@angular/core';

interface Room {
  id: number;
  hotelName: string;
  roomType: string;
  price: number;
  available: boolean;
  capacity: number;
}

interface Reservation {
  id: number;
  guestName: string;
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: string;
  amount: number;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  rooms: Room[] = [
    { id: 101, hotelName: 'Grand Hyatt', roomType: 'Deluxe Room', price: 5000, available: true, capacity: 2 },
    { id: 102, hotelName: 'Grand Hyatt', roomType: 'Executive Suite', price: 8000, available: true, capacity: 3 },
    { id: 201, hotelName: 'Cozy Cottage', roomType: 'Standard Room', price: 2000, available: false, capacity: 2 },
    { id: 301, hotelName: 'Seaside Resort', roomType: 'Beach View Room', price: 8000, available: true, capacity: 2 }
  ];

  reservations: Reservation[] = [
    {
      id: 1,
      guestName: 'John Doe',
      hotelName: 'Grand Hyatt',
      roomType: 'Deluxe Room',
      checkIn: '2026-02-15',
      checkOut: '2026-02-18',
      status: 'Confirmed',
      amount: 15000
    },
    {
      id: 2,
      guestName: 'Jane Smith',
      hotelName: 'Seaside Resort',
      roomType: 'Beach View Room',
      checkIn: '2026-03-10',
      checkOut: '2026-03-12',
      status: 'Pending',
      amount: 16000
    },
    {
      id: 3,
      guestName: 'Mike Johnson',
      hotelName: 'Cozy Cottage',
      roomType: 'Standard Room',
      checkIn: '2026-01-05',
      checkOut: '2026-01-07',
      status: 'Completed',
      amount: 4000
    }
  ];
}
