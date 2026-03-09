import { Pipe, PipeTransform } from '@angular/core';
import { Hotel } from '../models/hotel.model';

@Pipe({
  name: 'locationFilter',
  standalone: false
})
export class LocationFilterPipe implements PipeTransform {
  transform(hotels: Hotel[], location?: string): Hotel[] {
    if (!hotels) {
      return [];
    }
    if (!location) {
      return hotels;
    }
    return hotels.filter(h => h.location.toLowerCase().includes(location.toLowerCase()));
  }
}
