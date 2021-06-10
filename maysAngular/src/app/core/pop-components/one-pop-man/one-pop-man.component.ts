import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentsService} from '../comments.service';
import {PopService} from '../pop.service';
import {IPop} from '../../../model-interface/pop';
import * as moment from 'moment';

@Component({
  selector: 'app-one-pop-man',
  templateUrl: './one-pop-man.component.html',
  styleUrls: ['./one-pop-man.component.scss']
})
export class OnePopManComponent implements OnInit {
  public id: string;
  public onePopArray: IPop;
  blur = true;
  title: string;
  time: string;

  constructor(private route: ActivatedRoute, private coms: CommentsService, private pops: PopService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOnePop(this.id);
    this.getOnePopComs(this.id);
    this.datePosted();
  }

  getOnePop(id: string): void {
    this.pops.getPopById(id).subscribe((data) => {
      this.onePopArray = data;
      console.log(data);
    });
  }

  getOnePopComs(id: string): void {
    this.coms.getPerIdComments(id).subscribe((data) => {
      console.log(data);
    });
  }

  onShow(): void {
    this.blur = false;
  }

  datePosted(): void {
    moment.locale('fr');
    const time = moment(this.onePopArray.date);
    console.log(time);
    this.time = time.fromNow();
    this.title = time.format('DD.MM.YYYY HH:mm:ss');
  }
}
