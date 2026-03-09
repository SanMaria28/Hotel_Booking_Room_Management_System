import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { Hotel } from '../models/hotel.model';
import { HotelService } from '../services/hotel.service';

interface HotelSearchCriteria {
  location: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

@Component({
  selector: 'app-hotel-list',
  standalone: false,
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit, OnDestroy {
  hotels: Hotel[] = [];
  filterLocation = '';
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;

  private readonly searchSubject = new Subject<HotelSearchCriteria>();
  private searchSubscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(250),
        distinctUntilChanged((previous, current) => JSON.stringify(previous) === JSON.stringify(current)),
        switchMap((criteria) =>
          this.hotelService.filterHotels(
            criteria.minPrice,
            criteria.maxPrice,
            criteria.minRating,
            criteria.location
          )
        )
      )
      .subscribe((hotels) => (this.hotels = hotels));

    this.loadHotels();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  loadHotels(): void {
    this.searchSubject.next({
      location: this.filterLocation,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      minRating: this.minRating
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/hotel', id]);
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src =
      'https://via.placeholder.com/1200x800/0f766e/f8fafc?text=Hotel+Preview';
  }
}
