import { Component, OnInit } from '@angular/core';
import { UserService, UserData } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public allUsers: Array<UserData>;
  public action: string;
  public addUser: { firstName: string; lastName: string; role: string; email: string };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.addUser = {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    };
    this.action = 'show';
    this.userService.getAllUsers().subscribe( users => {
      this.allUsers = users;
    });
  }

  changeAction(action) {
    if (action === 'addUser') {
      this.action = 'addUser';
    }
  }

  addUserAction() {
    this.userService.createUser(this.addUser).subscribe(response => {
      console.log(response);
    });
    this.action = 'addUser';
  }

}
