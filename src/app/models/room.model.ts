import { BaseEntity } from './base-entity';

export class Room implements BaseEntity {
  id: number;
  hotelId: number;
  roomType: 'Single' | 'Double' | 'Suite'; // TypeScript Union Type
  pricePerNight: number;
  isAvailable: boolean;

  constructor(
    id: number,
    hotelId: number,
    roomType: 'Single' | 'Double' | 'Suite',
    price: number,
    available: boolean = true
  ) {
    this.id = id;
    this.hotelId = hotelId;
    this.roomType = roomType;
    this.pricePerNight = price;
    this.isAvailable = available;
  }

  // Helper method: Logic inside the class
  get discountPrice(): number {
    return this.isAvailable ? this.pricePerNight : this.pricePerNight * 0.9;
  }
}