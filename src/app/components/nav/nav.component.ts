import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'benomad-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public mobileNav: { isOpen: boolean };
  public rooms: any;
  public currentUser: any;

  constructor(private roomService: RoomService, private userService: UserService) {
    this.mobileNav = {
      isOpen: false,
    };
  }

  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe(rooms => {
      this.rooms = rooms;
    });

    this.userService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  toggleMobileMenu = () => {
    this.mobileNav.isOpen = !this.mobileNav.isOpen;
  }

}
