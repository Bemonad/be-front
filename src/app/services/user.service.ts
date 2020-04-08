import { Injectable } from "@angular/core";
import axios from 'axios';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor() {}

  getUser(id) {
    // @TODO: Make it async
    return {
      firstname: "Bonz",
      lastname: "Atron",
      email: "felix@beyowi.com",
      id: "5e8cee49afa6e54ff0a33c91"
    };
  }

  register(user, password) {
    console.log("registering", user, password);
    const body = {firstName: user.firstname, lastName: user.lastname, password}
    console.log(body)
    axios.put(`http://localhost:3001/api/users/${user.id}`, body).then(response => {
      console.log('Api response:', response)
    });
  }
}
