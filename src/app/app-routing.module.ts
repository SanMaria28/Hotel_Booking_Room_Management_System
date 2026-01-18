import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  { path: '', redirectTo: '/hotels', pathMatch: 'full' }, // Default route
  { path: 'hotels', component: HotelListComponent },
  { path: 'hotels/:id', component: HotelDetailComponent }, // Dynamic route for details
  { path: 'booking/:id', component: BookingFormComponent }, // Booking specific hotel
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'admin', component: AdminPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
