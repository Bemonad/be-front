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

  loading: Boolean;

  errors: {
    badCredentials: Boolean,
    email: Boolean,
    password: Boolean,
    other: Boolean,
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.login = {
      email: '',
      password: '',
    };
    this.errors = {
      badCredentials: false,
      email: false,
      password: false,
      other: false,
    };
  }

  resetErrors() {
    this.errors = {
      badCredentials: false,
      email: false,
      password: false,
      other: false,
    };
  }

  logIn() {
    if (this.loading === true) return;

    this.resetErrors();

    if (!this.login.email) {
      this.errors.email = true
      return
    }

    if (!this.login.password) {
      this.errors.password = true
      return
    }

    this.loading = true;
    this.userService.checkCredentials(this.login).subscribe((user) => {
      this.loading = false;
      this.userService.finalCheckIn(user);
    }, (error) => {
      this.loading = false;
      if (error.status === 400) {
        this.errors.badCredentials = true;
      }
    });
  }
}
