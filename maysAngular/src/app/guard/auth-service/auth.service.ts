import {Injectable} from '@angular/core';
import {IUser} from '../../model-interface/user';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {IRegister} from '../../model-interface/register';
import {Observable, ReplaySubject} from 'rxjs';
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

  public login(input: string, password: string): Observable<void> {
    return this.http.post<IUser>(this.baseUrl + 'auth/login', {input, password}).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.router.navigateByUrl('');
          console.log(this.isAuthenticated);
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
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }
}
