import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: UserData;
  apiUrl: string;
  httpOptionsJson: Object;
  currentUser: BehaviorSubject<any>;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router: Router) {
    this.apiUrl = environment.API_URL;
    this.httpOptionsJson = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.currentUser = new BehaviorSubject<any>(null);
  }

  getUser(jwt) {
    const observableUser = this.http.get<UserData>(`${this.apiUrl}/users/${jwt}`);
    observableUser.subscribe( user => {
      this.user = user;
      this.currentUser.next(user);
    });
    return observableUser;
  }

  register(user, password) {
    const body = {firstName: user.firstName, lastName: user.lastName, password, _id: user._id};

    return this.http.put<UserData>(`${this.apiUrl}/users`, body, this.httpOptionsJson);
  }

  checkCredentials(loginData) {
    return this.http.post(`${this.apiUrl}/users/login`, loginData, this.httpOptionsJson );
  }

  finalCheckIn(user) {
    this.user = user;
    this.currentUser.next(user);
    localStorage.setItem('access_token', this.user.token);

    switch (this.user.role) {
      case 'admin':
        this.router.navigate(['/admin/users']);
        break;
      case 'user':
      default:
        this.router.navigate(['/']);
        break;
    }

  }

  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  getAllUsers() {
    return this.http.get<Array<UserData>>(`${this.apiUrl}/users`);
  }

  createUser(body) {
    return this.http.post(`${this.apiUrl}/users`, body, this.httpOptionsJson);
  }

  updateUser(body) {
    return this.http.put(`${this.apiUrl}/users`, body, this.httpOptionsJson);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.currentUser.next(null);
    this.router.navigate(['']);
  }

}
