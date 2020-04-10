import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface UserData {
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
  user: UserData;
  apiUrl: string;
  httpOptionsJson: object;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL;
    this.httpOptionsJson = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  getUser(jwt) {
    // @TODO: Use env var for base URL
    return this.http.get<UserData>(`${this.apiUrl}/users/${jwt}`);

  }

  register(user, password) {
    const body = {firstName: user.firstName, lastName: user.lastName, password, token: user.token};

    return this.http.put<UserData>(`${this.apiUrl}/users`, body, this.httpOptionsJson);
  }

  checkCredentials(loginData) {
    console.log(loginData);
    return this.http.post(`${this.apiUrl}/users/login`, loginData, this.httpOptionsJson );
  }

  finalCheckIn(user) {
    this.user = user;
    localStorage.setItem('access_token', this.user.token);
  }
}
