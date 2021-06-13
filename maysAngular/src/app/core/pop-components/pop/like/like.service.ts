import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {ILike} from '../../../../model-interface/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLikeByPost(idPost: any): Observable<ILike> {
    return this.http.get<ILike>(this.baseUrl + 'likes/post/' + idPost);
  }

  getLikeByUser(idUser: any): Observable<ILike> {
    return this.http.get<ILike>(this.baseUrl + 'likes/user/' + idUser);
  }

  postLike(values: any): Observable<ILike> {
    return this.http.post<ILike>(this.baseUrl + 'likes', values);
  }

  deleteLike(id: any): Observable<ILike> {
    return this.http.delete<ILike>(this.baseUrl + 'likes/' + id);
  }
}
