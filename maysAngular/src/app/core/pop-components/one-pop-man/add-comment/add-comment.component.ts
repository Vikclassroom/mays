import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommentsService} from '../../comments.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  uploadCom: FormGroup;
  @Input() id: string;
  isSpoiler = false;
  @Output() comEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private coms: CommentsService) {
    this.uploadCom = this.fb.group({
      content: ['', Validators.required],
      isSpoiler: [false, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  postCommentary(): void {
    const val = {
      content: undefined,
      date: undefined,
      isSpoiler: undefined,
      postId: undefined
    };

    val.content = this.uploadCom.value.content;
    val.date = this.getDateTime();
    val.isSpoiler = this.uploadCom.value.isSpoiler;
    val.postId = this.id;

    this.coms.postComments(val).subscribe(() => {
      this.comEvent.emit();
    });
  }

  getDateTime(): string {
    return moment().format();
  }

}
