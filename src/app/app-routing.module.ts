import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RoomComponent } from './components/room/room.component';
import { BookingComponent } from './components/booking/booking.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { AuthGardService} from './services/auth-gard.service';

const routes: Routes = [
  {
    path: 'register/:id',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'rooms',
    component: RoomComponent,
  },
  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [AuthGardService]
  },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
  },
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGardService] : Example
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
