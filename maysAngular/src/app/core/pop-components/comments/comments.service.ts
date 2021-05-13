import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {IComments} from '../../../model-interface/comments';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllComments(): Observable<IComments> {
    return this.http.get<IComments>(this.baseUrl + 'comments');
  }

  getCommentsById(values: any): Observable<HttpEvent<IComments>> {
    return this.http.get<IComments>(this.baseUrl + 'comments', values);
  }

  postComments(values: any): Observable<IComments> {
    return this.http.post<IComments>(this.baseUrl + 'comments', values);
  }

  updateComments(values: any): Observable<IComments> {
    return this.http.put<IComments>(this.baseUrl + 'comments', values);
  }

  deleteComments(values: any): Observable<HttpEvent<IComments>> {
    return this.http.delete<IComments>(this.baseUrl + 'comments', values);
  }
}
