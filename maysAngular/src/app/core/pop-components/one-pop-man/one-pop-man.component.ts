import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentsService} from '../comments.service';
import {PopService} from '../pop.service';
import {IPop} from '../../../model-interface/pop';
import * as moment from 'moment';
import {IGetComment} from '../../../model-interface/get-comment';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-one-pop-man',
  templateUrl: './one-pop-man.component.html',
  styleUrls: ['./one-pop-man.component.scss']
})
export class OnePopManComponent implements OnInit {
  public id: string;
  public onePop: IPop;
  public loaded = false;
  public allThisPopComments: Array<IGetComment>;
  blur = true;
  title: string;
  time: string;
  isPremium: boolean;

  constructor(private route: ActivatedRoute,
              private coms: CommentsService,
              private pops: PopService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOnePop(this.id);
    this.getOnePopComs(this.id);
  }

  getOnePop(id: string): void {
    this.pops.getPopById(id).subscribe((data) => {
      this.onePop = data;
      this.isPremium = this.onePop.author.isPremium;
      this.loaded = true;
      this.datePosted();
    });
  }

  getOnePopComs(id: string): void {
    this.coms.getPerIdComments(id).subscribe((data) => {
      this.toastr.success('Succès du chargement');
      this.allThisPopComments = data;
    },
      () => {
      this.toastr.error('Erreur lors du chargement');
      });
  }

  onShow(): void {
    this.blur = false;
  }

  datePosted(): void {
    moment.locale('fr');
    const time = moment(this.onePop.date);
    this.time = time.fromNow();
    this.title = time.format('DD.MM.YYYY HH:mm:ss');
  }
}
