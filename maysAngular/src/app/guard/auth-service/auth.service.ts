import {Injectable} from '@angular/core';
import {IUser} from '../../model-interface/user';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {IRegister} from '../../model-interface/register';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = environment.apiUrl;
  private isAuthSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuth$: Observable<boolean> = this.isAuthSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public login(input: string, password: string): Observable<void> {
    return this.http.post<IUser>(this.baseUrl + 'auth/login', {input, password}).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.isAuthSubject.next(true);
          this.router.navigateByUrl('/');
        }
      })
    );
  }

  public register(name: string, email: string, password: string): Observable<void> {
    return this.http.post<IRegister>(this.baseUrl + 'auth/create', {name, email, password}).pipe(
      map((user: IRegister) => {
        if (user) {
          this.login(email, password).subscribe();
        }
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    this.isAuthSubject.next(false);
  }
}
