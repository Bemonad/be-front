import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { UserService, UserData } from '../../services/user.service';

@Component({
  selector: 'benomad-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public mobileNav: { isOpen: boolean };
  public rooms: any;
  public currentUser: UserData;

  constructor(
    private roomService: RoomService,
    private userService: UserService
  ) {
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

  toggleMobileMenu = (value?: boolean) => {
    this.mobileNav.isOpen = value ? value : !this.mobileNav.isOpen
  }

  logout() {
    this.userService.logout();
    this.toggleMobileMenu();
  }
}
