import { Pipe, PipeTransform } from '@angular/core';
import { Hotel } from '../models/hotel.model';

@Pipe({
  name: 'ratingFilter',
  standalone: false
})
export class RatingFilterPipe implements PipeTransform {
  transform(hotels: Hotel[], minRating?: number): Hotel[] {
    if (!hotels) {
      return [];
    }
    if (minRating == null) {
      return hotels;
    }
    return hotels.filter(h => h.rating >= minRating);
  }
}
