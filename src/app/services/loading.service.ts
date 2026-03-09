import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly pendingRequestsSubject = new BehaviorSubject(0);
  readonly loading$ = this.pendingRequestsSubject.asObservable();

  start(): void {
    this.pendingRequestsSubject.next(this.pendingRequestsSubject.value + 1);
  }

  stop(): void {
    this.pendingRequestsSubject.next(Math.max(this.pendingRequestsSubject.value - 1, 0));
  }
}
