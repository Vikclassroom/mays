import {Component, OnInit} from '@angular/core';
import {IUserAdmin} from '../../../model-interface/user-admin';
import {UserService} from './user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  users: Array<IUserAdmin>;
  isPremium = false;

  constructor(private us: UserService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getEveryUser();
  }

  getEveryUser(): void {
    this.us.getAllUser().subscribe((data) => {
      this.users = data;
    });
  }

  addPremium(id: any): void {
    this.us.addPremium(id).subscribe(() => {
        console.log('premium ok');
        this.reload();
      },
      () => {
        this.toastr.error('déjà premium');
      });
  }

  removePremium(id: any): void {
    this.us.removePremium(id).subscribe(() => {
        this.toastr.success('unpremium ok');
        this.reload();
      },
      () => {
       this.toastr.error('déjà unpremium');
      });
  }

  reload(): void {
    this.getEveryUser();
  }
}
