import {Component, Input, OnInit, Output} from '@angular/core';
import {IComments} from '../../../../model-interface/comments';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() allComments: IComments;
  @Output() updateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateForm.patchValue({
      content: this.allComments.content
    });
  }

  getTime(): string {
    moment.locale('fr');
    return moment(this.allComments.date).fromNow();
  }

  updateCom(event): void {
    if (event.key === 'enter'){
      console.log('tout bon pour l update');
    }
  }

  updateEnable(): void {
    const form = this.updateForm;
    form.controls.content.enable();
  }
}
