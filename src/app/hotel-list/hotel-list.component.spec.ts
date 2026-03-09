import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppModule } from '../app.module';
import { HotelService } from '../services/hotel.service';
import { HotelListComponent } from './hotel-list.component';

describe('HotelListComponent', () => {
  let component: HotelListComponent;
  let fixture: ComponentFixture<HotelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: HotelService,
          useValue: {
            getHotels: () => of([]),
            filterHotels: () => of([])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HotelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
