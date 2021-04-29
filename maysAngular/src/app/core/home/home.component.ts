import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../guard/auth-service/auth.service';
import {CoreService} from '../core.service';
import {IPop} from '../../model-interface/pop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  pops: [];

  constructor(private service: AuthService, private coreService: CoreService) { }

  ngOnInit(): void {
    this.Pops();
  }

  // tslint:disable-next-line:typedef
  isLogged() {
    if (this.service.isAuthenticated === true){
      console.log(this.isAuthenticated);
      return this.isAuthenticated === true;
    }
  }

  // tslint:disable-next-line:typedef
  Pops() {
    this.coreService.getAllPop().subscribe((pop: IPop) => {
      console.log(pop);
      console.log(this.pops);
    });
  }
}
