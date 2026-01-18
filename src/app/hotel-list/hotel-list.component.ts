import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  // Hardcoded data for now (we will connect the Service in the next task)
  hotels = [
    { id: 1, name: 'Grand Hyatt', location: 'Mumbai', price: 5000, image: 'https://via.placeholder.com/300' },
    { id: 2, name: 'Cozy Cottage', location: 'Manali', price: 2000, image: 'https://via.placeholder.com/300' },
    { id: 3, name: 'Seaside Resort', location: 'Goa', price: 8000, image: 'https://via.placeholder.com/300' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewDetails(id: number): void {
    this.router.navigate(['/hotels', id]);
  }
}