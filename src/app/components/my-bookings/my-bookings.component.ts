import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {
  public bookings: object;

  constructor(private bookingService: BookingService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe( user => {
      if (user) {
        this.bookingService.getMyBookings(user).subscribe( books => {
          console.log(books);
          this.bookings = books;
        });
      }
    });
  }

}
