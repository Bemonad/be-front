import { Component, OnInit } from "@angular/core";
import { UserService, UserData } from "../../../services/user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  public allUsers: Array<UserData>;
  public filteredUsers: Array<UserData> = this.allUsers;
  public emailFilter: string = '';

  public action: string = "show";

  public addUser: {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
  } = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  };

  public userToEdit: UserData = {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    token: "",
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
      this.filteredUsers = this.allUsers;
    });
  }

  changeAction(action, data) {
    if (action === "show") {
      this.action = "show";
    }
    if (action === "addUser") {
      this.action = "addUser";
    }
    if (action === "editUser") {
      this.userToEdit = data;
      this.action = "editUser";
    }
  }

  addUserAction() {
    this.userService.createUser(this.addUser).subscribe((response) => {
      console.log(response);
      this.userService.getAllUsers().subscribe((users) => {
        this.allUsers = users;
        this.resetFilter();
      });
    });
    this.action = "show";
  }

  editUserAction() {
    this.userService.updateUser(this.userToEdit).subscribe((response) => {
      this.userService.getAllUsers().subscribe((users) => {
        this.allUsers = users;
        this.resetFilter();
      });
    });
    this.action = "show";
  }

  resetFilter() {
    this.emailFilter = '';
  }

  filterUsers() {
    if (this.emailFilter) {
      this.filteredUsers = this.allUsers.filter((user) => {
        return user.email.toLowerCase().startsWith(this.emailFilter.toLowerCase());
      })
    } else {
      this.filteredUsers = this.allUsers;
    }
  }
}
