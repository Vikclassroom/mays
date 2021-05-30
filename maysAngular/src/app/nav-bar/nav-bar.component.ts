import { Component, OnInit } from '@angular/core';
import {AuthService} from '../guard/auth-service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.isLogged();
  }

  logout(): void {
    this.auth.logout();
  }

  isLogged(): boolean {
    return this.auth.isAuthenticated();
  }
}
