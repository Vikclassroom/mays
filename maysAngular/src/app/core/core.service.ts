import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IPop} from '../model-interface/pop';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getAllPop() {
    return this.http.get<IPop>(this.baseUrl + 'api/posts');
  }

  // tslint:disable-next-line:typedef
  postPop(values: any) {
    return this.http.post<IPop>(this.baseUrl + 'api/posts', values);
  }

  // tslint:disable-next-line:typedef
  getPopById(values: any) {
    return this.http.get<IPop>(this.baseUrl + 'api/posts', values);
  }

  // tslint:disable-next-line:typedef
  updatePop(values: any) {
    return this.http.put<IPop>(this.baseUrl + 'api/posts', values);
  }

  // tslint:disable-next-line:typedef
  deletePop(values: any) {
    return this.http.delete<IPop>(this.baseUrl + 'api/posts', values);
  }
}
