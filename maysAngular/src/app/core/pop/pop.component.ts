import { Component, OnInit } from '@angular/core';
import {IPop} from '../../model-interface/pop';
import {CoreService} from '../core.service';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss']
})
export class PopComponent implements OnInit {
  pops: IPop;

  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    this.Pops();
  }

  // tslint:disable-next-line:typedef
  Pops() {
    this.coreService.getAllPop().subscribe((pop: IPop) => {
      this.pops = pop;
      console.log(this.pops);
    });
  }
}
