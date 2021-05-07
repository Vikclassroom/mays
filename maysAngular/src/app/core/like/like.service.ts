import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ILike} from '../../model-interface/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllLike(): Observable<ILike> {
    return this.http.get<ILike>(this.baseUrl + 'like');
  }

  getLikeById(values: any): Observable<HttpEvent<ILike>> {
    return this.http.get<ILike>(this.baseUrl + 'like', values);
  }

  postLike(values: any): Observable<ILike> {
    return this.http.post<ILike>(this.baseUrl + 'like', values);
  }

  deleteLike(values: any): Observable<HttpEvent<ILike>> {
    return this.http.delete<ILike>(this.baseUrl + 'like', values);
  }
}
