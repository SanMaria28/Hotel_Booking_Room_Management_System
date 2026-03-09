import { BaseEntity } from './base-entity';

export type RoomCategory = 'standard' | 'deluxe' | 'suite';

export interface Room extends BaseEntity {
  hotelId: number;
  roomType: string;
  category: RoomCategory;
  price: number;
  capacity: number;
  isAvailable: boolean;
  discounted: boolean;
  amenities: string[];
  imageUrl: string;
}
