import {Component, OnInit} from '@angular/core';
import {AuthService} from '../guard/auth-service/auth.service';
import {RightService} from '../core/pop-components/right.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userName: string;
  avatar: string;

  constructor(private auth: AuthService, private r: RightService) {
  }

  ngOnInit(): void {
    this.userInfoNavBar();
  }

  logout(): void {
    this.auth.logout();
  }

  isLogged(): boolean {
    return this.auth.isAuthenticated();
  }

  isLoggedUpdate(): boolean {
    this.userInfoNavBar();
    return this.auth.isAuthenticated();
  }

  userInfoNavBar(): void {
    if (this.isLogged()) {
      this.userName = this.r.getRight().userName;
      this.avatar = this.r.getAvatar();
    }
  }
}
