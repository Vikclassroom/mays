import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IUserAdmin} from '../../../model-interface/user-admin';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<Array<IUserAdmin>> {
    return this.http.get<Array<IUserAdmin>>(this.baseUrl + 'admin/users');
  }

  addPremium(id: any): Observable<IUserAdmin> {
    return this.http.post<IUserAdmin>(this.baseUrl + 'admin/enable/' + id, null);
  }

  removePremium(id: any): Observable<IUserAdmin> {
    return this.http.post<IUserAdmin>(this.baseUrl + 'admin/disable/' + id, null);
  }
}
