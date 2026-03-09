import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest } from 'rxjs';

import { Booking } from '../models/booking.model';
import { Hotel } from '../models/hotel.model';
import { Room } from '../models/room.model';
import { User } from '../models/user.model';
import { BookingService } from '../services/booking.service';
import { HotelService } from '../services/hotel.service';
import { UserService } from '../services/user.service';

interface OccupancyRow {
  hotelName: string;
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  occupancyRate: number;
}

interface BookingDetailRow {
  id: number;
  hotelName: string;
  roomType: string;
  roomCategory: string;
  customerName: string;
  customerEmail: string;
  customerUsername: string;
  guests: number;
  stayLabel: string;
  nights: number;
  totalAmount: number;
  status: Booking['status'];
  createdAt: string;
}

interface GuestDetailRow {
  id: number;
  fullName: string;
  username: string;
  email: string;
  totalBookings: number;
  activeBookings: number;
  totalSpend: number;
  lastStayDate: string | null;
}

@Component({
  selector: 'app-admin-panel',
  standalone: false,
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  readonly bookingColumns = ['id', 'customer', 'contact', 'stay', 'room', 'guests', 'amount', 'status', 'bookedOn'];
  readonly roomColumns = ['roomType', 'hotel', 'category', 'capacity', 'price', 'availability'];

  hotelForm!: FormGroup;
  roomForm!: FormGroup;
  bookings: Booking[] = [];
  bookingDetails: BookingDetailRow[] = [];
  rooms: Room[] = [];
  hotels: Hotel[] = [];
  guests: User[] = [];
  guestDetails: GuestDetailRow[] = [];
  occupancyRows: OccupancyRow[] = [];
  totalRevenue = 0;
  activeBookingsCount = 0;
  occupiedRoomsCount = 0;

  constructor(
    private readonly bookingService: BookingService,
    private readonly hotelService: HotelService,
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      rating: [4.8, [Validators.required, Validators.min(1), Validators.max(5)]],
      imageUrl: ['', Validators.required],
      priceMin: [10000, [Validators.required, Validators.min(1000)]],
      priceMax: [25000, [Validators.required, Validators.min(1000)]],
      amenities: ['Luxury Stay, Fine Dining, Pool, Spa, Concierge', Validators.required]
    });

    this.roomForm = this.fb.group({
      hotelId: [null, Validators.required],
      roomType: ['', Validators.required],
      category: ['standard', Validators.required],
      price: [5000, [Validators.required, Validators.min(1000)]],
      capacity: [2, [Validators.required, Validators.min(1)]],
      discounted: [false],
      isAvailable: [true]
    });

    this.loadAdminData();
  }

  submitHotel(): void {
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      return;
    }

    const value = this.hotelForm.getRawValue();
    this.hotelService
      .createHotel({
        name: value.name,
        location: value.location,
        description: value.description,
        rating: Number(value.rating),
        imageUrl: value.imageUrl,
        amenities: String(value.amenities)
          .split(',')
          .map((amenity) => amenity.trim())
          .filter(Boolean),
        priceRange: {
          min: Number(value.priceMin),
          max: Number(value.priceMax)
        }
      })
      .subscribe(() => {
        this.snackBar.open('Hotel added successfully.', 'Close', { duration: 3000 });
        this.hotelForm.reset({
          rating: 4.8,
          priceMin: 10000,
          priceMax: 25000,
          amenities: 'Luxury Stay, Fine Dining, Pool, Spa, Concierge'
        });
        this.loadAdminData();
      });
  }

  submitRoom(): void {
    if (this.roomForm.invalid) {
      this.roomForm.markAllAsTouched();
      return;
    }

    const value = this.roomForm.getRawValue();
    this.hotelService
      .createRoom({
        hotelId: value.hotelId,
        roomType: value.roomType,
        category: value.category,
        price: value.price,
        capacity: value.capacity,
        isAvailable: value.isAvailable,
        discounted: value.discounted,
        amenities: ['Premium Linen', 'Housekeeping', 'WiFi'],
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
      })
      .subscribe(() => {
        this.snackBar.open('Room saved successfully.', 'Close', { duration: 3000 });
        this.roomForm.reset({
          category: 'standard',
          price: 5000,
          capacity: 2,
          discounted: false,
          isAvailable: true
        });
        this.loadAdminData();
      });
  }

  hotelName(hotelId: number): string {
    return this.hotels.find((hotel) => this.sameId(hotel.id, hotelId))?.name ?? 'Unknown';
  }

  private loadAdminData(): void {
    combineLatest([
      this.hotelService.getHotels(),
      this.hotelService.getAllRooms(),
      this.bookingService.getAllBookings(),
      this.userService.getUsers()
    ]).subscribe(([hotels, rooms, bookings, users]) => {
      this.hotels = hotels;
      this.rooms = rooms;
      this.bookings = bookings;
      this.guests = users;
      this.totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
      this.activeBookingsCount = bookings.filter((booking) => booking.status === 'confirmed').length;
      this.occupiedRoomsCount = rooms.filter((room) => !room.isAvailable).length;
      this.bookingDetails = bookings.map((booking) => this.createBookingDetail(booking));
      this.guestDetails = users
        .filter((user) => user.role !== 'admin')
        .map((user) => this.createGuestDetail(user))
        .sort((left, right) => right.totalSpend - left.totalSpend);
      this.occupancyRows = hotels.map((hotel) => {
        const hotelRooms = rooms.filter((room) => this.sameId(room.hotelId, hotel.id));
        const occupiedRooms = hotelRooms.filter((room) => !room.isAvailable).length;

        return {
          hotelName: hotel.name,
          totalRooms: hotelRooms.length,
          occupiedRooms,
          availableRooms: hotelRooms.length - occupiedRooms,
          occupancyRate: hotelRooms.length ? Math.round((occupiedRooms / hotelRooms.length) * 100) : 0
        };
      });
    });
  }

  occupancyValue(): number {
    return this.rooms.length ? Math.round((this.occupiedRoomsCount / this.rooms.length) * 100) : 0;
  }

  private createBookingDetail(booking: Booking): BookingDetailRow {
    const guest = this.guests.find((user) => this.sameId(user.id, booking.userId));
    const room = this.rooms.find((candidate) => this.sameId(candidate.id, booking.roomId));
    const hotel = this.hotels.find((candidate) => this.sameId(candidate.id, booking.hotelId));
    const nights = this.calculateNights(booking.checkIn, booking.checkOut);

    return {
      id: booking.id,
      hotelName: hotel?.name ?? 'Unknown hotel',
      roomType: room?.roomType ?? 'Unknown room',
      roomCategory: room?.category ?? 'n/a',
      customerName: guest?.fullName ?? 'Unknown guest',
      customerEmail: guest?.email ?? 'No email',
      customerUsername: guest?.username ?? 'n/a',
      guests: booking.guests,
      stayLabel: `${booking.checkIn} - ${booking.checkOut}`,
      nights,
      totalAmount: booking.totalAmount,
      status: booking.status,
      createdAt: booking.createdAt
    };
  }

  private createGuestDetail(user: User): GuestDetailRow {
    const guestBookings = this.bookings.filter((booking) => this.sameId(booking.userId, user.id));
    const sortedBookings = [...guestBookings].sort(
      (left, right) => new Date(right.checkOut).getTime() - new Date(left.checkOut).getTime()
    );

    return {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      totalBookings: guestBookings.length,
      activeBookings: guestBookings.filter((booking) => booking.status === 'confirmed').length,
      totalSpend: guestBookings.reduce((sum, booking) => sum + booking.totalAmount, 0),
      lastStayDate: sortedBookings[0]?.checkOut ?? null
    };
  }

  private calculateNights(checkIn: string, checkOut: string): number {
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    const millisecondsPerNight = 1000 * 60 * 60 * 24;

    return Math.max(1, Math.round((end - start) / millisecondsPerNight));
  }

  private sameId(left: number, right: number): boolean {
    return Number(left) === Number(right);
  }
}
