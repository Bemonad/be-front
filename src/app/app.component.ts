import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "bemonad-client";
  mobileNav = {
    isOpen: false,
  };

  toggleMobileMenu = () => {
    this.mobileNav.isOpen = !this.mobileNav.isOpen;
    console.log(this.mobileNav.isOpen);
  }
}
