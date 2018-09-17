import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '@services'
import { AuthGuard } from '@guards';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(
    private authenticationService: AuthenticationService,
    public authGuard: AuthGuard
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout()
    location.reload(true);
  }

}
