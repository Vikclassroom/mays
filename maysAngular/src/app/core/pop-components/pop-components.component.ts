import {Component, OnInit} from '@angular/core';
import {IPop} from '../../model-interface/pop';
import {PopService} from './pop.service';
import {AuthService} from '../../guard/auth-service/auth.service';
import jwt_decode from 'jwt-decode';
import {IToken} from '../../model-interface/token';

@Component({
  selector: 'app-pop-components',
  templateUrl: './pop-components.component.html',
  styleUrls: ['./pop-components.component.scss']
})
export class PopComponentsComponent implements OnInit {
  pops: Array<IPop>;
  isAuth: boolean = this.auth.isAuthenticated();
  public contentType: string;
  userName: string;
  userRole: string;

  constructor(private popService: PopService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.Pops();
    this.auth.isAuth$.subscribe(isAuth => {
      this.isAuth = isAuth;
    });
    this.getRight();
  }

  Pops(): void {
    this.popService.getAllPop().subscribe((pop: Array<IPop>) => {
      this.pops = pop;
    });
  }

  getRight(): void {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode<IToken>(token);
    this.userName = decoded.Username;
    this.userRole = decoded.role;
  }
}
