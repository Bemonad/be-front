import { Component, OnInit } from "@angular/core";
import { BookingService } from "../../services/booking.service";
import { UserService } from "../../services/user.service";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
moment.locale('fr');

const filtersMap = {
  ALL: {
    label: "Toutes",
    id: "ALL",
    class: "all",
  },
  PASSED: {
    label: "Passées",
    id: "PASSED",
    class: "passed",
  },
  TO_COME: {
    label: "À venir",
    id: "TO_COME",
    class: "to-come",
  },
  CANCELED: {
    label: "Annulées",
    id: "CANCELED",
    class: "canceled",
  },
};

@Component({
  selector: "app-my-bookings",
  templateUrl: "./my-bookings.component.html",
  styleUrls: ["./my-bookings.component.scss"],
  providers: [NgbDropdownConfig],
})
export class MyBookingsComponent implements OnInit {
  public bookings: Object[] = [];
  public filteredBookings: Object[] = this.bookings;
  public selectedFilter: {
    label: string;
    id: string;
    class: string;
  } = filtersMap.ALL;

  filtersMap = filtersMap;
  moment = moment;
  objectKeys = Object.keys;

  constructor(
    private bookingService: BookingService,
    private userService: UserService,
    config: NgbDropdownConfig
  ) {
    config.placement = "bottom-right";
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.bookingService.getMyBookings(user).subscribe((books: Object[]) => {
          this.bookings = [...books];
          this.applyFilter();
        });
      }
    });
  }

  applyFilter() {
    switch (this.selectedFilter.id) {
      case filtersMap.ALL.id:
        this.filteredBookings = this.bookings;
        break;
      case filtersMap.PASSED.id:
        this.filteredBookings = this.bookings.filter((booking:any) => {
          return moment(booking.end).isBefore() === true
        });
        break;
      case filtersMap.TO_COME.id:
        this.filteredBookings = this.bookings.filter((booking:any) => {
          return moment(booking.end).isBefore() === false
        });
        break;
      case filtersMap.CANCELED.id:
        this.filteredBookings = this.bookings.filter((booking:any) => {
          return booking.status === false
        });
        break;
      default:
        break;
    }
  }

  changeFilter(filter) {
    this.selectedFilter = filter;
    this.applyFilter()
  }
}
