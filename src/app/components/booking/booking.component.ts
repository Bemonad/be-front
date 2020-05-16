import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RoomService } from '../../services/room.service';
import { BookingService, BookingData } from '../../services/booking.service';
import * as moment from 'moment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  public preselectedRoomId: string;
  public rooms: any;
  public currentBooking: BookingData;
  public selectedDate: any;
  public arrayHours: Array<{
    time: string;
    canSelectHalf: boolean;
    canSelectHour: boolean;
  }>;
  public startHour: string;
  public half: string;
  public listHalf: Array<{
    value: boolean;
    label: string;
  }>;
  public duration: string;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private userService: UserService,
    private bookingService: BookingService,
  ) {
  }

  ngOnInit(): void {
    this.arrayHours = [
      {
        time: '8',
        canSelectHalf: true,
        canSelectHour: true
      },
      {
        time: '9',
        canSelectHalf: true,
        canSelectHour: true
      },
      {
        time: '10',
        canSelectHalf: true,
        canSelectHour: true
      },
      {
        time: '11',
        canSelectHalf: true,
        canSelectHour: true
      },
      {
        time: '12',
        canSelectHalf: true,
        canSelectHour: true
      },
      {
        time: '13',
        canSelectHalf: true,
        canSelectHour: true
      },
      {
        time: '14',
        canSelectHalf: true,
        canSelectHour: true
      },
      {
        time: '15',
        canSelectHalf: true,
        canSelectHour: true
      },
      {
        time: '16',
        canSelectHalf: true,
        canSelectHour: true
      },
      {
        time: '17',
        canSelectHalf: true,
        canSelectHour: true
      },
      {
        time: '18',
        canSelectHalf: true,
        canSelectHour: true
      },
      {
        time: '19',
        canSelectHalf: true,
        canSelectHour: true
      },
      {
        time: '20',
        canSelectHalf: true,
        canSelectHour: true
      },
    ];
    this.selectedDate = moment().startOf('day').valueOf();

    this.preselectedRoomId = this.route.snapshot.queryParamMap.get('roomFrom') ?
      this.route.snapshot.queryParamMap.get('roomFrom') : '';

    this.roomService.getAllRooms().subscribe( rooms => {
      Object.keys(rooms).map( (key, index) => {
        if (rooms[key]._id === this.preselectedRoomId) {
          rooms[key].selected = true;
        }
      });
      this.rooms = rooms;
    });

    this.userService.getCurrentUser().subscribe( user => {
      if (user) {
        this.currentBooking = {
          user_id: user._id,
          room: '',
          start: null,
          end: null,
          sit: true,
          video: false,
          number_people: null,
          status: true,
          weekNumber: moment().week()
        };
      }
    });
  }

  filterHalf(value) {
    this.listHalf = [];
    const hourSelected = this.arrayHours.filter(item => item.time === value);
    if (hourSelected[0].canSelectHalf) {
      this.listHalf.push({value: false, label: '0'});
    }
    if (hourSelected[0].canSelectHour) {
      this.listHalf.push({value: true, label: '30'});
    }
  }

  parseHour(begin, hourSelected, half = 'false') {
    let timestamp = moment(begin).add(hourSelected, 'h');
    if (half === 'true') {
      timestamp = timestamp.add(30, 'm');
    }
    return timestamp.millisecond(0).valueOf();
  }

  book() {
    this.currentBooking.start = this.parseHour(this.selectedDate, this.startHour, this.half);
    this.currentBooking.end = this.parseHour(this.currentBooking.start, this.duration);
    // console.log(this.currentBooking);

    this.bookingService.registerBook(this.currentBooking);
  }
}
