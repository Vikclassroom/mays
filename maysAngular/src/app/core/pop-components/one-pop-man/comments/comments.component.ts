import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RightService} from '../../right.service';
import {CommentsService} from '../../comments.service';
import {IGetComment} from '../../../../model-interface/get-comment';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() allComments: IGetComment;
  @Output() updateForm: FormGroup;
  userName: string;
  isAdmin: boolean;
  bIsUpdating = false;
  @Output() comEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fb: FormBuilder,
              private r: RightService,
              private coms: CommentsService,
              private toastr: ToastrService) {
    this.updateForm = this.fb.group({
      content: ['', Validators.required],
      isSpoiler: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.userName = this.r.getRight().userName;
    this.isAdmin = this.r.isAdmin();

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
        this.toastr.success('Modification du commentaire effectué');
        this.comEvent.emit();
      },
      () => {
        this.toastr.error('Erreur lors de la mise à jour du commentaire');
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
      this.toastr.success('Suppression effectué');
      this.comEvent.emit();
    }, () => {
      this.toastr.error('Erreur lors de la suppression du commentaire');
    });
  }
}
