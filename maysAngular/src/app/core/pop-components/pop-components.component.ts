import {Component, OnInit} from '@angular/core';
import {IPop} from '../../model-interface/pop';
import {PopService} from './pop.service';
import {AuthService} from '../../guard/auth-service/auth.service';

@Component({
  selector: 'app-pop-components',
  templateUrl: './pop-components.component.html',
  styleUrls: ['./pop-components.component.scss']
})
export class PopComponentsComponent implements OnInit {
  pops: Array<IPop>;
  isAuth: boolean = this.auth.isAuthenticated;

  constructor(private popService: PopService,  private auth: AuthService) { }

  ngOnInit(): void {
    this.Pops();
    this.auth.isAuth$.subscribe(isAuth => this.isAuth = isAuth);
  }

  Pops(): void {
    this.popService.getAllPop().subscribe((pop: Array<IPop>) => {
      this.pops = pop;
    });
  }
}
