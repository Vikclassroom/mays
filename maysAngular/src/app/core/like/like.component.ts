import { Component, OnInit } from '@angular/core';
import {LikeService} from './like.service';
import {AuthService} from '../../guard/auth-service/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopService} from '../pop/pop.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
  eventBox: boolean;
  likeForm: FormGroup;

  constructor(private likeService: LikeService, private auth: AuthService, private fb: FormBuilder, private popService: PopService) {
    this.likeForm = this.fb.group({
      postId: ['']
    });
  }


  ngOnInit(): void {
    // this.likeService.getAllLike().subscribe();
  }

  onChangeLike(): void  {
    if (this.auth.isAuthenticated) {
      this.eventBox = this.likeForm.value.postId;
      if (this.eventBox === true) {
        // post
        console.log(this.eventBox);
      } else {
        // delete
        console.log(this.eventBox);
      }
    }
  }
}
