import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    console.log('registering', user, password);
    const body = {firstName: user.firstname, lastName: user.lastname, password};
    console.log(body);
    axios.put(`http://localhost:3001/api/users/${user.id}`, body).then(response => {
      console.log('Api response:', response);
    });
  }
}
