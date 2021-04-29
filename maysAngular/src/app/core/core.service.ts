import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IUser} from '../model-interface/user';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  // @ts-ignore
  public baseUrl: environment.apiUrl;
  private currentUserSource: ReplaySubject<IUser> = new ReplaySubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  public Login(values: any) {
    this.http.post<IUser>(this.baseUrl + 'login', values).pipe(
      map(() => {})
    );
  }
}
