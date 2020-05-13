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
  public userToEdit: UserData;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.addUser = {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    };
    this.userToEdit = {
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      token: ''
    }
    this.action = 'show';
    this.userService.getAllUsers().subscribe( users => {
      this.allUsers = users;
    });
  }

  changeAction(action, data) {
    if (action === 'addUser') {
      this.action = 'addUser';
    }
    if (action === 'editUser') {
      this.userToEdit = data;
      this.action = 'editUser';
    }
  }

  addUserAction() {
    this.userService.createUser(this.addUser).subscribe(response => {
      console.log(response);
      this.userService.getAllUsers().subscribe( users => {
        this.allUsers = users;
      });
    });
    this.action = 'show';
  }

  editUserAction() {
    this.userService.updateUser(this.userToEdit).subscribe(response => {
      console.log(response);
      this.userService.getAllUsers().subscribe( users => {
        this.allUsers = users;
      });
    });
    this.action = 'show';
  }

}
