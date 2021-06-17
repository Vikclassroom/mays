import {Component, Input, OnInit} from '@angular/core';
import {LikeService} from './like.service';
import {AuthService} from '../../../../service-shared/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
  @Input() postId: string;
  @Input() isLiked: boolean;
  isAuth: boolean;
  @Input() numberLike: number;

  constructor(private likeService: LikeService, private auth: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.auth.isAuth$.subscribe((data) => {
      this.isAuth = data;
    });
  }

  onChangeLike(): void {
    if (this.isAuth) {
      if (this.isLiked) {
        this.likeService.deleteLike(this.postId).subscribe(() => {
            this.toastr.success('unlike');
            this.isLiked = false;
            this.numberLike--;
          },
          () => {
            this.toastr.error('problème unlike');
          });
      } else {
        this.likeService.postLike(this.postId).subscribe(() => {
            this.toastr.success('like');
            this.isLiked = true;
            this.numberLike++;
          },
          () => {
            this.toastr.error('problème like');
          });
      }
    }
  }
}
