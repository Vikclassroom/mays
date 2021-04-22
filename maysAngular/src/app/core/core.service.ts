import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  // @ts-ignore
  public baseUrl: environment.apiUrl;
  currentUser$: any;
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  public Login(values: any) {
    this.http.post(this.baseUrl + 'login', values).pipe(
      map(() => {})
    );
  }
}
