import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Hotel } from '../models/hotel.model';
import { Room, RoomCategory } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private readonly hotelsUrl = 'http://localhost:3000/hotels';
  private readonly roomsUrl = 'http://localhost:3000/rooms';

  constructor(private http: HttpClient) {}

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.hotelsUrl);
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.hotelsUrl}/${id}`);
  }

  getRooms(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.roomsUrl}?hotelId=${hotelId}`);
  }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomsUrl);
  }

  createRoom(room: Omit<Room, 'id'>): Observable<Room> {
    return this.http.post<Room>(this.roomsUrl, room);
  }

  filterHotels(
    priceMin?: number,
    priceMax?: number,
    rating?: number,
    location?: string
  ): Observable<Hotel[]> {
    return this.getHotels().pipe(
      map((hotels) =>
        hotels.filter((hotel) => {
          const matchesLocation = location
            ? hotel.location.toLowerCase().includes(location.toLowerCase())
            : true;
          const matchesPriceMin = priceMin == null || hotel.priceRange.min >= priceMin;
          const matchesPriceMax = priceMax == null || hotel.priceRange.max <= priceMax;
          const matchesRating = rating == null || hotel.rating >= rating;

          return matchesLocation && matchesPriceMin && matchesPriceMax && matchesRating;
        })
      )
    );
  }

  filterRoomsByCategory(rooms: Room[], category: RoomCategory | 'all'): Room[] {
    if (category === 'all') {
      return rooms;
    }
    return rooms.filter((room) => room.category === category);
  }
}
