import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGardService implements CanActivate {

  constructor(protected router: Router, protected userService: UserService) { }

  canActivate(): boolean {
    if (this.userService.isAuthenticated()) {
      this.userService.getCurrentUser().subscribe( user => {
        if (user.role === 'admin') {
          return true;
        }
      });
    } else {
      this.router.navigate(['login']);
      return false;
    }
 }
}
