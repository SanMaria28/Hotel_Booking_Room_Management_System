import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

import { Hotel } from '../models/hotel.model';
import { Room, RoomCategory } from '../models/room.model';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-detail',
  standalone: false,
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {
  hotel?: Hotel;
  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  category: RoomCategory | 'all' = 'all';

  readonly categoryLinks = [
    { label: 'All Rooms', path: '' },
    { label: 'Standard', path: 'standard' },
    { label: 'Deluxe', path: 'deluxe' },
    { label: 'Suite', path: 'suite' }
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly hotelService: HotelService
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.parent?.paramMap ?? this.route.paramMap, this.route.data]).subscribe(
      ([params, data]) => {
        const hotelId = Number(params.get('id'));
        this.category = (data['category'] as RoomCategory | undefined) ?? 'all';

        this.hotelService.getHotelById(hotelId).subscribe((hotel) => (this.hotel = hotel));
        this.hotelService.getRooms(hotelId).subscribe((rooms) => {
          this.rooms = rooms;
          this.filteredRooms = this.hotelService.filterRoomsByCategory(rooms, this.category);
        });
      }
    );
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src =
      'https://via.placeholder.com/1200x800/0f766e/f8fafc?text=Hotel+Preview';
  }
}
