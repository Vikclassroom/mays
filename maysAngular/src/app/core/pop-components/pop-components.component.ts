import { Component, OnInit } from '@angular/core';
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
  connected: boolean;

  constructor(private popService: PopService,  private auth: AuthService) { }

  ngOnInit(): void {
    this.Pops();
    setInterval(this.isSleep, 1000);
  }

  isSleep(): void {
    this.connected = this.auth.currentUser$ != null;
  }

  Pops(): void {
    this.popService.getAllPop().subscribe((pop: Array<IPop>) => {
      this.pops = pop;
    });
  }

}
