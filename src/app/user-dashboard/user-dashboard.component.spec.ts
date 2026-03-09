import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppModule } from '../app.module';
import { BookingService } from '../services/booking.service';
import { HotelService } from '../services/hotel.service';
import { UserService } from '../services/user.service';
import { UserDashboardComponent } from './user-dashboard.component';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: BookingService,
          useValue: {
            getUserBookings: () => of([])
          }
        },
        {
          provide: HotelService,
          useValue: {
            getHotels: () => of([])
          }
        },
        {
          provide: UserService,
          useValue: {
            currentUser: { id: 1, username: 'tester', role: 'user' }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
