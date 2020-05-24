import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService, UserData } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGardAdminService implements CanActivate {
  private currentUser: UserData;

  constructor(protected router: Router, protected userService: UserService, public jwtHelper: JwtHelperService) { }

  canActivate(): boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    const token = localStorage.getItem('access_token');
    if (this.jwtHelper.decodeToken(token).role === 'admin') {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
