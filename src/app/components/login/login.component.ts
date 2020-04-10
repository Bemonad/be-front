import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: {
    email: string;
    password: string;
  };

  constructor(private userService: UserService) {
    this.login = {
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
  }

  logIn() {
    console.log(this.login);
    this.userService.checkCredentials(this.login).subscribe((user) => {
      this.userService.finalCheckIn(user);
    });
  }

}
