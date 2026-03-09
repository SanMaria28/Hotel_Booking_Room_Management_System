import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppModule } from '../app.module';
import { BookingService } from '../services/booking.service';
import { HotelService } from '../services/hotel.service';
import { AdminPanelComponent } from './admin-panel.component';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: BookingService,
          useValue: {
            getAllBookings: () => of([])
          }
        },
        {
          provide: HotelService,
          useValue: {
            getHotels: () => of([]),
            getAllRooms: () => of([]),
            createRoom: () => of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
