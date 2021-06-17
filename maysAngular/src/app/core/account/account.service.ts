import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../service-shared/auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IUserAccount} from '../../model-interface/user-account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isAuth: boolean;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.isAuth = this.auth.isAuthenticated();
  }

  getUserInformation(): Observable<IUserAccount> {
    if (this.auth) {
      return this.http.get<IUserAccount>(this.baseUrl + 'user');
    }
  }

  updateUserInformation(values: any): Observable<IUserAccount> {
    if (this.auth) {
      return this.http.put<IUserAccount>(this.baseUrl + 'user', values);
    }
  }

  updateUserAvatar(values: any): Observable<IUserAccount> {
    if (this.auth) {
      return this.http.put<IUserAccount>(this.baseUrl + 'user/avatar', values);
    }
  }
}
