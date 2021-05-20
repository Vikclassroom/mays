import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IPop} from '../../model-interface/pop';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PopService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllPop(): Observable<Array<IPop>> {
    return this.http.get<Array<IPop>>(this.baseUrl + 'posts');
  }

  postPop(values: any): Observable<IPop> {
    return this.http.post<IPop>(this.baseUrl + 'posts', values);
  }

  getPopById(values: any): Observable<HttpEvent<IPop>> {
    return this.http.get<IPop>(this.baseUrl + 'posts', values);
  }

  updatePop(values: any): Observable<IPop> {
    return this.http.put<IPop>(this.baseUrl + 'posts', values);
  }

  deletePop(values: any): Observable<HttpEvent<IPop>> {
    return this.http.delete<IPop>(this.baseUrl + 'posts', values);
  }
}
