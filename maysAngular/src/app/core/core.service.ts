import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {IPop} from '../model-interface/pop';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllPop(): Observable<IPop> {
    return this.http.get<IPop>(this.baseUrl + 'posts');
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
    return this.http.delete<IPop>(this.baseUrl + 'api/posts', values);
  }
}
