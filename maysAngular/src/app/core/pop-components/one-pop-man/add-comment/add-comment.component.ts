import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommentsService} from '../../comments.service';
import * as moment from 'moment';
import {ToastrService} from "ngx-toastr";

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

  constructor(private fb: FormBuilder,
              private coms: CommentsService,
              private toastr: ToastrService) {
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
      this.toastr.success('Commentaire effectué');
      this.comEvent.emit();
    }, () => {
      this.toastr.error('Une erreur est survenu');
    });
  }

  getDateTime(): string {
    return moment().format();
  }

}
