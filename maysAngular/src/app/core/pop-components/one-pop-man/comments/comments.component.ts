import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RightService} from '../../right.service';
import {CommentsService} from '../../comments.service';
import {IGetComment} from '../../../../model-interface/get-comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() allComments: IGetComment;
  @Output() updateForm: FormGroup;
  userName: string;
  userRole: string;
  bIsUpdating = false;
  @Output() comEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private r: RightService, private coms: CommentsService) {
    this.updateForm = this.fb.group({
      content: ['', Validators.required],
      isSpoiler: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.userName = this.r.getRight().userName;
    this.userRole = this.r.getRight().userRole;

    this.updateForm.patchValue({
      content: this.allComments.content
    });
  }

  getTime(): string {
    moment.locale('fr');
    return moment(this.allComments.date).fromNow();
  }

  updateCom(): void {
    const val = {
      content: undefined,
      date: undefined,
      isSpoiler: undefined,
      postId: undefined
    };

    val.content = this.updateForm.value.content;
    val.date = this.getDateTime();
    val.isSpoiler = this.updateForm.value.isSpoiler;
    val.postId = this.allComments.id;

    this.coms.putComments(this.allComments.id, val).subscribe(() => {
        this.comEvent.emit();
      },
      () => {
        console.log('Erreur lors de la mise à jour du commentaire');
      });
  }

  getDateTime(): string {
    return moment().format();
  }

  updateEnable(): void {
    this.bIsUpdating = !this.bIsUpdating;
  }

  deleteComments(): void {
    this.coms.deleteComments(this.allComments.id).subscribe(() => {
      this.comEvent.emit();
    }, () => {
      console.log('Erreur lors de la suppression du commentaire');
    });
  }
}
