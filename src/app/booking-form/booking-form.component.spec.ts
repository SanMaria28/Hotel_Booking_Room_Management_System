import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { convertToParamMap } from '@angular/router';

import { AppModule } from '../app.module';
import { BookingService } from '../services/booking.service';
import { HotelService } from '../services/hotel.service';
import { UserService } from '../services/user.service';
import { BookingFormComponent } from './booking-form.component';

describe('BookingFormComponent', () => {
  let component: BookingFormComponent;
  let fixture: ComponentFixture<BookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: 1 })) }
        },
        {
          provide: BookingService,
          useValue: {
            createBooking: () => of({})
          }
        },
        {
          provide: HotelService,
          useValue: {
            getHotelById: () => of({ id: 1, name: 'Test Hotel' }),
            getRooms: () => of([])
          }
        },
        {
          provide: UserService,
          useValue: {
            currentUser: { id: 1, fullName: 'Test User', username: 'tester', email: 'test@test.com', password: 'secret', role: 'guest' }
          }
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: jasmine.createSpy('open')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
