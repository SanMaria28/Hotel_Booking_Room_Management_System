import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: UserService,
          useValue: {
            isLoggedIn: () => false,
            isAdmin: () => false,
            logout: jasmine.createSpy('logout'),
            session$: of(null),
            currentUser: null
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(`should have as title 'hotel_booking_room_management'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.title).toBe('hotel_booking_room_management');
  });
});
