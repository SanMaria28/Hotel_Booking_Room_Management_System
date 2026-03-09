import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'hotels', pathMatch: 'full' },
  { path: 'hotels', component: HotelListComponent },
  {
    path: 'hotel/:id',
    children: [
      { path: '', component: HotelDetailComponent },
      { path: 'standard', component: HotelDetailComponent, data: { category: 'standard' } },
      { path: 'deluxe', component: HotelDetailComponent, data: { category: 'deluxe' } },
      { path: 'suite', component: HotelDetailComponent, data: { category: 'suite' } }
    ]
  },
  { path: 'book/:id', component: BookingFormComponent, canActivate: [UserGuard] },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [UserGuard] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'hotels' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
