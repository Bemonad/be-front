import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RoomService, RoomData } from '../../services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  private roomId: string;
  public room: RoomData;
  public currentUser: any;

  constructor(private route: ActivatedRoute, private roomService: RoomService, private userService: UserService) {
    this.room = {
      _id: '',
      name: '',
      description: '',
      capacity_sit: '',
      capacity_stand: '',
      image: ''
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {

      this.roomId = queryParams.id;
      this.roomService.getRoom(this.roomId).subscribe((data) => {
        this.room = data;
      });
    });

    this.userService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

}
