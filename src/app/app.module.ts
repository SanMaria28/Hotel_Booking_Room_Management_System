import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { BookingConfirmationDialogComponent } from './booking-form/booking-confirmation-dialog.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { HighlightDiscountDirective } from './directives/highlight-discount.directive';
import { HighlightFullyBookedDirective } from './directives/highlight-fully-booked.directive';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { LocationFilterPipe } from './pipes/location-filter.pipe';
import { PriceFilterPipe } from './pipes/price-filter.pipe';
import { RatingFilterPipe } from './pipes/rating-filter.pipe';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HotelListComponent,
    HotelDetailComponent,
    BookingFormComponent,
    BookingConfirmationDialogComponent,
    UserDashboardComponent,
    AdminPanelComponent,
    LoginComponent,
    SignupComponent,
    PriceFilterPipe,
    RatingFilterPipe,
    LocationFilterPipe,
    HighlightFullyBookedDirective,
    HighlightDiscountDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
