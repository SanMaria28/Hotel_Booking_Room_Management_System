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
    { id: 1, name: 'Grand Hyatt', location: 'Mumbai', price: 5000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop' },
    { id: 2, name: 'Cozy Cottage', location: 'Manali', price: 2000, image: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=400&h=300&fit=crop' },
    { id: 3, name: 'Seaside Resort', location: 'Goa', price: 8000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewDetails(id: number): void {
    this.router.navigate(['/hotels', id]);
  }

  handleImageError(event: any): void {
    // Fallback image if the URL fails to load
    event.target.src = 'https://via.placeholder.com/400x300/667eea/ffffff?text=Hotel+Image';
  }
}