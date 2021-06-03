import {Component, Input, OnInit} from '@angular/core';
import {IPop} from '../../../model-interface/pop';
import * as moment from 'moment';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss']
})
export class PopComponent implements OnInit {
  @Input() pop: IPop;
  blur = true;
  time: string;
  title: string;

  constructor() {
  }

  ngOnInit(): void {
    this.datePosted();
  }

  onShow(): void {
    this.blur = false;
  }

  datePosted(): void {
    moment.locale('fr');
    const time = moment(this.pop.date);
    this.time = time.fromNow();
    this.title = time.format('DD.MM.YYYY HH:mm:ss');
  }
}
