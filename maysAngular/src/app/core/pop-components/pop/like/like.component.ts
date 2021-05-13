import {Component, Input, OnInit} from '@angular/core';
import {LikeService} from './like.service';
import {AuthService} from '../../../../guard/auth-service/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopService} from '../../pop.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
  eventBox: boolean;
  likeForm: FormGroup;
  @Input() postId: string;
  id: string;

  constructor(private likeService: LikeService, private auth: AuthService, private fb: FormBuilder, private popService: PopService) {
    this.likeForm = this.fb.group({
      id: ['']
    });
  }

  ngOnInit(): void {
    this.likeForm.controls.id.setValue(this.postId);
  }

  onChangeLike(): void  {
    if (this.auth.isAuthenticated) {
      console.log('ok');
    }
  }
}
