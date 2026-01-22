import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {
  hotelName = 'Grand Hyatt';
  roomType = 'Deluxe Room';
  roomPrice = 5000;
  checkInDate = '';
  checkOutDate = '';
  guestName = '';
  guestEmail = '';
  guestPhone = '';
  totalAmount = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get hotel and room details from route params
  }
}
