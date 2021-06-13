import {Component, OnInit} from '@angular/core';
import {IUserAdmin} from '../../../model-interface/user-admin';
import {UserService} from './user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  users: Array<IUserAdmin>;
  isPremium = false;

  constructor(private us: UserService) {
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
        console.log('déjà premium');
      });
  }

  removePremium(id: any): void {
    this.us.removePremium(id).subscribe(() => {
        console.log('unpremium ok');
        this.reload();
      },
      () => {
        console.log('déjà unpremium');
      });
  }

  reload(): void {
    this.getEveryUser();
  }
}
