import { BaseEntity } from './base-entity';

export interface Booking extends BaseEntity {
  userId: number;
  hotelId: number;
  roomId: number;
  guests: number;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'pending';
  createdAt: string;
}
