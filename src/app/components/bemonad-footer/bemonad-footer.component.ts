import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'bemonad-footer',
  templateUrl: './bemonad-footer.component.html',
  styleUrls: ['./bemonad-footer.component.scss']
})
export class BemonadFooterComponent implements OnInit {
  public rooms: any;
  public currentUser: any;

  constructor(private roomService: RoomService, private userService: UserService) { }

  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe(rooms => {
      this.rooms = rooms;
    });

    this.userService.getCurrentUser().subscribe(currentUser => {      
      this.currentUser = currentUser;
    });
  }
}
