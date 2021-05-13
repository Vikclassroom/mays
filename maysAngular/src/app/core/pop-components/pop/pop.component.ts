import {Component, Input, OnInit} from '@angular/core';
import {IPop} from '../../../model-interface/pop';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss']
})
export class PopComponent implements OnInit {
  @Input() pop: IPop;

  constructor() {
  }

  ngOnInit(): void {
  }
}
