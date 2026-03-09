import { Pipe, PipeTransform } from '@angular/core';
import { Hotel } from '../models/hotel.model';

@Pipe({
  name: 'priceFilter',
  standalone: false
})
export class PriceFilterPipe implements PipeTransform {
  transform(hotels: Hotel[], min?: number, max?: number): Hotel[] {
    if (!hotels) {
      return [];
    }
    return hotels.filter(h => {
      if (min != null && h.priceRange.min < min) {
        return false;
      }
      if (max != null && h.priceRange.max > max) {
        return false;
      }
      return true;
    });
  }
}
