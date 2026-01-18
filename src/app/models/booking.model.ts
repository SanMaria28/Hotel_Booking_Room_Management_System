import { BaseEntity } from './base-entity';

export interface Booking extends BaseEntity {
  userId: number;
  hotelId: number;
  roomId: number;
  checkIn: string;  // Storing dates as ISO strings is safer for JSON server
  checkOut: string;
  totalAmount: number;
  status: 'confirmed' | 'cancelled' | 'pending';
}