import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
  };
  password: {
    reference: string;
    confirmation: string;
  };

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    this.password = {
      reference: '',
      confirmation: ''
    };
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.userService.getUser(this.id).subscribe( data => {
      this.user = data;
    });
  }

  checkPassword() {
    return this.password.reference === this.password.confirmation;
  }

  register() {
    if (!this.checkPassword()) {
      console.error('Passwords don\'t match');
    }

    this.userService.register(this.user, this.password.reference).subscribe((ntm) => {
      this.router.navigate(['/login']);
    });
  }
}
