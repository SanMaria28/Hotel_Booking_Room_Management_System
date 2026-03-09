import { Component } from '@angular/core';
import { map } from 'rxjs';

import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hotel_booking_room_management';
  readonly loading$;

  constructor(private readonly loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$.pipe(map((count) => count > 0));
  }
}
