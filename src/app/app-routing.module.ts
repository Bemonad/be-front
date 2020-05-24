import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RoomComponent } from './components/room/room.component';
import { BookingComponent } from './components/booking/booking.component';
import { UsersComponent } from './components/admin/users/users.component';
import { BookingsComponent } from './components/admin/bookings/bookings.component';
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
    canActivate: [AuthGardService]
  },
  {
    path: 'admin',
    canActivate: [AuthGardService],
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'bookings',
        component: BookingsComponent
      }
    ]
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
