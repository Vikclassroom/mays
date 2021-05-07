import { Component, OnInit } from '@angular/core';
import {IPop} from '../../model-interface/pop';
import {PopService} from './pop.service';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss']
})
export class PopComponent implements OnInit {
  pops: IPop;

  constructor(private popService: PopService) { }

  ngOnInit(): void {
    // this.Pops();
  }

  // tslint:disable-next-line:typedef
  Pops() {
    this.popService.getAllPop().subscribe((pop: IPop) => {
      this.pops = pop;
      console.log(this.pops);
    });
  }
}
