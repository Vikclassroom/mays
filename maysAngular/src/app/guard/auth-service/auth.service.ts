import { Injectable } from '@angular/core';
import {IUser} from '../../model-interface/user';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {IRegister} from '../../model-interface/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  public login(email: string, password: string ) {
    return this.http.post<IUser>(this.baseUrl + 'auth/login', {email, password}).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  // tslint:disable-next-line:typedef
  public register(name: string, email: string, password: string) {
    return this.http.post<IRegister>(this.baseUrl + 'auth/create' , {name, email, password}).pipe(
      map(() => {
        this.login(email, password);
      })
    );
  }

  /*login(values: any) {
    console.log(values);
    return this.http.post(this.baseUrl + 'api/account/login', values).pipe(
      map((user: IAccount) => {
        if (user) {
          console.log(user);
          this.isAuthenticated = true;
          localStorage.setItem('email', user.email);
          localStorage.setItem('urlPicture', user.urlPicture);
          localStorage.setItem('id', String(user.accountId));
          this.currentUser.next(user);
          console.log(user);
        } else {
          this.isAuthenticated = false;
        }
      })
    );
  }*/

}
