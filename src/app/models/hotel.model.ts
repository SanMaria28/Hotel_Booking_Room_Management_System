import { BaseEntity } from './base-entity';

export interface Hotel extends BaseEntity {
  name: string;
  location: string;
  description: string;
  rating: number;
  imageUrl: string;
  amenities: string[];
  priceRange: {
    min: number;
    max: number;
  };
}