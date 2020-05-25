import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { RoomService } from "../../services/room.service";
import { BookingService, BookingData } from "../../services/booking.service";
import * as moment from "moment";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.scss"],
})
export class BookingComponent implements OnInit {
  public preselectedRoomId: string;
  public rooms: any;
  public currentBooking: BookingData = {
    user: null,
    room: this.route.snapshot.queryParamMap.get("roomFrom")
      ? this.route.snapshot.queryParamMap.get("roomFrom")
      : "",
    start: null,
    end: null,
    sit: true,
    video: false,
    number_people: 0,
    status: true,
    weekNumber: moment().week(),
  };
  public selectedDate: any = moment().startOf("day").valueOf();
  public arrayHours: Array<{
    time: string;
    canSelectHalf: boolean;
    canSelectHour: boolean;
  }> = [
    {
      time: "08",
      canSelectHalf: true,
      canSelectHour: true,
    },
    {
      time: "09",
      canSelectHalf: true,
      canSelectHour: true,
    },
    {
      time: "10",
      canSelectHalf: true,
      canSelectHour: true,
    },
    {
      time: "11",
      canSelectHalf: true,
      canSelectHour: true,
    },
    {
      time: "12",
      canSelectHalf: true,
      canSelectHour: true,
    },
    {
      time: "13",
      canSelectHalf: true,
      canSelectHour: true,
    },
    {
      time: "14",
      canSelectHalf: true,
      canSelectHour: true,
    },
    {
      time: "15",
      canSelectHalf: true,
      canSelectHour: true,
    },
    {
      time: "16",
      canSelectHalf: true,
      canSelectHour: true,
    },
    {
      time: "17",
      canSelectHalf: true,
      canSelectHour: true,
    },
    {
      time: "18",
      canSelectHalf: true,
      canSelectHour: true,
    },
    {
      time: "19",
      canSelectHalf: true,
      canSelectHour: true,
    },
    {
      time: "20",
      canSelectHalf: true,
      canSelectHour: true,
    },
  ];
  public startHour: string = this.arrayHours[0].time;
  public half: string = "false"; // felix@NOTE: type string for a boolean is bad
  public listHalf: Array<{
    value: boolean;
    label: string;
  }>;
  public duration: string = "1";

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private userService: UserService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.filterHalf(this.startHour); // felix@FIXME: Quite dirty
    this.roomService.getAllRooms().subscribe((rooms) => {
      Object.keys(rooms).map((key, index) => {
        if (rooms[key]._id === this.preselectedRoomId) {
          rooms[key].selected = true;
        }
      });
      this.rooms = rooms;
    });
    this.userService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.currentBooking.user = user.id;
      }
    });
  }

  filterHalf(value) {
    this.listHalf = [];
    const hourSelected = this.arrayHours.filter((item) => item.time === value);
    if (hourSelected[0].canSelectHalf) {
      this.listHalf.push({ value: false, label: "00" });
    }
    if (hourSelected[0].canSelectHour) {
      this.listHalf.push({ value: true, label: "30" });
    }
  }

  parseHour(begin, hourSelected, half = "false") {
    // felix@FIXME: type string for a boolean is bad
    let timestamp = moment(begin).add(hourSelected, "h");
    if (half === "true") {
      // felix@FIXME: type string for a boolean is bad
      timestamp = timestamp.add(30, "m");
    }
    return timestamp.millisecond(0).valueOf();
  }

  book() {
    this.currentBooking.start = this.parseHour(
      this.selectedDate,
      this.startHour,
      this.half
    );
    this.currentBooking.end = this.parseHour(
      this.currentBooking.start,
      this.duration
    );

    this.bookingService.registerBook(this.currentBooking);
  }

  setSit() {
    this.currentBooking.sit = !this.currentBooking.sit;
  }

  setVideo() {
    this.currentBooking.video = !this.currentBooking.video;
  }
}
