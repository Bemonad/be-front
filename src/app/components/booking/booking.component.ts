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
  public half: boolean;
  public listHalf: Array<{
    value: boolean;
    label: string;
  }>;
  public endHour: string;

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
        }
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
          id_room: '',
          start: null,
          end: '',
          sit: true,
          video: false,
          number_people: null,
          status: true,
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

  parseHour(hourSelected, half) {
    let getHour = moment(this.selectedDate).add(hourSelected, 'h');
    if (half === 'true') {
      getHour = getHour.add(30, 'm');
    }
    return getHour.millisecond(0).valueOf();
  }

  book() {
    this.currentBooking.start = this.parseHour(this.startHour, this.half);
    console.log(this.currentBooking);
    console.log(this.currentBooking.sit);

    // this.bookingService.registerBook(this.currentBooking);
  }
}
