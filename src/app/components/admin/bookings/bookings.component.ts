import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import * as moment from 'moment';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  public allBookings: any;
  moment = moment;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe( bookings => {
      this.allBookings = bookings;
    });
  }

}
