import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IPop} from '../../model-interface/pop';
import {HttpClient} from '@angular/common/http';
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

  getPopById(id: any): Observable<IPop> {
    return this.http.get<IPop>(this.baseUrl + 'posts/' + id);
  }

  updatePop(id: any, values: any): Observable<IPop> {
    return this.http.put<IPop>(this.baseUrl + 'posts/' + id, values);
  }

  deletePop(id: any): Observable<IPop> {
    return this.http.delete<IPop>(this.baseUrl + 'posts/' + id);
  }
}
