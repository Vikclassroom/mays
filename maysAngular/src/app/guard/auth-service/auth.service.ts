import {Injectable} from '@angular/core';
import {IUser} from '../../model-interface/user';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {IRegister} from '../../model-interface/register';
import {ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = environment.apiUrl;
  private currentUserSource: ReplaySubject<IUser> = new ReplaySubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();
  isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    this.isAuthenticated = true;
  }

  // tslint:disable-next-line:typedef
  public login(email: string, password: string) {
    return this.http.post<IUser>(this.baseUrl + 'auth/login', {email, password}).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.router.navigateByUrl('');
        }
      })
    );
  }

  // tslint:disable-next-line:typedef
  public register(name: string, email: string, password: string) {
    return this.http.post<IRegister>(this.baseUrl + 'auth/create', {name, email, password}).pipe(
      map((user: IRegister) => {
        if (user) {
          this.login(email, password).subscribe();
        }
      })
    );
  }

  // tslint:disable-next-line:typedef
  public logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  // tslint:disable-next-line:typedef
  public delete() {

  }
}
