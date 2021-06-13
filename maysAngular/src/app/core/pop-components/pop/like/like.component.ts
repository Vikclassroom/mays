import {Component, Input, OnInit} from '@angular/core';
import {LikeService} from './like.service';
import {AuthService} from '../../../../guard/auth-service/auth.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
  eventBox: boolean;
  @Input() postId: string;
  @Input() isLiked: boolean;
  id: string;
  isAuth: boolean;
  @Input() numberLike: number;

  constructor(private likeService: LikeService, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.isAuth$.subscribe((data) => {
      this.isAuth = data;
    });
  }

  onChangeLike(): void {
    if (this.isAuth) {
      if (this.isLiked) {
        this.likeService.deleteLike(this.postId).subscribe(() => {
            console.log('unliked');
            this.isLiked = false;
          },
          () => {
            console.log('problème unlike');
          });
      } else {
        this.likeService.postLike(this.postId).subscribe(() => {
            console.log('liked');
            this.isLiked = true;
          },
          () => {
            console.log('problème like');
          });
      }
    }
  }
}
