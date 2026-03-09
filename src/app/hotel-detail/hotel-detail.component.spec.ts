import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppModule } from '../app.module';
import { HotelService } from '../services/hotel.service';
import { HotelDetailComponent } from './hotel-detail.component';

describe('HotelDetailComponent', () => {
  let component: HotelDetailComponent;
  let fixture: ComponentFixture<HotelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 1 }) }
        },
        {
          provide: HotelService,
          useValue: {
            getHotelById: () =>
              of({
                id: 1,
                name: 'Test Hotel',
                location: 'Test City',
                description: 'Test',
                rating: 4.5,
                imageUrl: '',
                amenities: [],
                priceRange: { min: 1000, max: 2000 }
              }),
            getRooms: () => of([])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HotelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
