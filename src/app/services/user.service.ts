import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserData
  constructor(private http: HttpClient) {}

  getUser(jwt) {
    // @TODO: Use env var for base URL
    return this.http.get<UserData>(`http://localhost:3001/api/users/${jwt}`);

  }

  register(user, password) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    const body = {firstName: user.firstName, lastName: user.lastName, password, token: user.token};

    return this.http.put<UserData>(`http://localhost:3001/api/users`, body, httpOptions);    
  }
}
