import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Room {
  id: number;
  type: string;
  price: number;
  available: boolean;
  amenities: string[];
}

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  rooms: Room[];
}

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrl: './hotel-detail.component.css'
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel | null = null;
  hotelId: number = 0;

  // Hardcoded hotel data
  private hotels: Hotel[] = [
    {
      id: 1,
      name: 'Grand Hyatt',
      location: 'Mumbai',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop',
      description: 'Experience luxury at its finest in the heart of Mumbai. Grand Hyatt offers world-class amenities, stunning views, and exceptional service.',
      rating: 4.8,
      rooms: [
        { id: 101, type: 'Deluxe Room', price: 5000, available: true, amenities: ['Wi-Fi', 'TV', 'Mini Bar', 'AC'] },
        { id: 102, type: 'Executive Suite', price: 8000, available: true, amenities: ['Wi-Fi', 'TV', 'Mini Bar', 'AC', 'Ocean View', 'Jacuzzi'] },
        { id: 103, type: 'Presidential Suite', price: 15000, available: false, amenities: ['Wi-Fi', 'TV', 'Mini Bar', 'AC', 'Ocean View', 'Jacuzzi', 'Private Pool'] }
      ]
    },
    {
      id: 2,
      name: 'Cozy Cottage',
      location: 'Manali',
      price: 2000,
      image: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800&h=500&fit=crop',
      description: 'A charming mountain retreat perfect for a peaceful getaway. Enjoy breathtaking views of the Himalayas and cozy comfort.',
      rating: 4.5,
      rooms: [
        { id: 201, type: 'Standard Room', price: 2000, available: true, amenities: ['Wi-Fi', 'Heater', 'Mountain View'] },
        { id: 202, type: 'Family Room', price: 3500, available: true, amenities: ['Wi-Fi', 'Heater', 'Mountain View', 'Fireplace'] },
        { id: 203, type: 'Luxury Cottage', price: 5000, available: true, amenities: ['Wi-Fi', 'Heater', 'Mountain View', 'Fireplace', 'Private Balcony'] }
      ]
    },
    {
      id: 3,
      name: 'Seaside Resort',
      location: 'Goa',
      price: 8000,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=500&fit=crop',
      description: 'Unwind by the beach at our luxurious seaside resort. Perfect for beach lovers seeking sun, sand, and relaxation.',
      rating: 4.9,
      rooms: [
        { id: 301, type: 'Beach View Room', price: 8000, available: true, amenities: ['Wi-Fi', 'TV', 'AC', 'Beach Access', 'Mini Bar'] },
        { id: 302, type: 'Ocean Suite', price: 12000, available: true, amenities: ['Wi-Fi', 'TV', 'AC', 'Beach Access', 'Mini Bar', 'Private Balcony'] },
        { id: 303, type: 'Beachfront Villa', price: 20000, available: true, amenities: ['Wi-Fi', 'TV', 'AC', 'Beach Access', 'Mini Bar', 'Private Balcony', 'Private Pool', 'Butler Service'] }
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = +params['id'];
      this.loadHotelDetails();
    });
  }

  loadHotelDetails(): void {
    this.hotel = this.hotels.find(h => h.id === this.hotelId) || null;
  }

  handleImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/800x500/667eea/ffffff?text=Hotel+Image';
  }
}
