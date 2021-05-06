import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../guard/auth-service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;


  constructor(private service: AuthService) { }

  ngOnInit(): void {
  }

  isLogged(): boolean {
    if (this.service.isAuthenticated === true){
      console.log(this.isAuthenticated);
      return this.isAuthenticated === true;
    }
  }
}
