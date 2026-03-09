import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-confirmation-dialog',
  standalone: false,
  template: `
    <div class="dialog-shell">
      <h2 mat-dialog-title>Confirm Booking</h2>
      <mat-dialog-content>
        <p>You are about to reserve <strong>{{ data.hotelName }}</strong>.</p>
        <p>{{ data.checkIn | date }} to {{ data.checkOut | date }} for {{ data.guests }} guest(s).</p>
        <p class="dialog-total">{{ data.totalAmount | currency:'INR':'symbol' }}</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-stroked-button (click)="dialogRef.close(false)">Back</button>
        <button mat-flat-button color="primary" (click)="dialogRef.close(true)">Confirm</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-shell { min-width: 320px; }
    .dialog-total { font-size: 1.35rem; font-weight: 700; color: #0f766e; margin-top: 1rem; }
  `]
})
export class BookingConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BookingConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      hotelName: string;
      guests: number;
      checkIn: string;
      checkOut: string;
      totalAmount: number;
    }
  ) {}
}
