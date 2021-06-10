import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ICreditCard} from '../../model-interface/credit-card';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PremiumService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  subscribe(creditCard: any): Observable<Array<ICreditCard>> {
    return this.http.post<Array<ICreditCard>>(this.baseUrl + 'premium/subscribe', creditCard);
  }

  unsubscribe(): Observable<ICreditCard> {
    return this.http.delete<ICreditCard>(this.baseUrl + 'premium/cancelSubscription');
  }
}
