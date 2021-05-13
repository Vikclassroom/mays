import { Component, OnInit } from '@angular/core';
import {IPop} from '../../model-interface/pop';
import {PopService} from './pop.service';

@Component({
  selector: 'app-pop-components',
  templateUrl: './pop-components.component.html',
  styleUrls: ['./pop-components.component.scss']
})
export class PopComponentsComponent implements OnInit {
  pops: Array<IPop>;

  constructor(private popService: PopService) { }

  ngOnInit(): void {
    this.Pops();
  }

  Pops(): void {
    this.popService.getAllPop().subscribe((pop: Array<IPop>) => {
      this.pops = pop;
    });
  }

}
