import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {IToken} from '../model-interface/token';
import {IRight} from '../model-interface/right';

@Injectable({
  providedIn: 'root'
})
export class RightService {

  private avatar: string;
  private timestamp: string = Date.now().toString();

  constructor() {
    if (localStorage.hasOwnProperty('token')){
      const token = localStorage.getItem('token');
      const decoded = jwt_decode<IToken>(token);
      this.avatar = decoded.Avatar;
    }
  }

  getRight(): IRight {
    if (localStorage.hasOwnProperty('token')){
      const token = localStorage.getItem('token');
      const decoded = jwt_decode<IToken>(token);
      return {
        userName: decoded.Username,
        userRole: decoded.role,
        avatar: decoded.Avatar + '?t=' + this.timestamp
      };
    } else {
      return {
        userName: '',
        userRole: '',
        avatar: ''
      };
    }
  }

  isAdmin(): boolean {
    for (const right of this.getRight().userRole){
      if (right === 'admin'){
        return true;
      }
    }
    return false;
  }

  isPremium(): boolean {
    for (const right of this.getRight().userRole){
      if (right === 'admin' || right === 'premium'){
        return true;
      }
    }
    return false;
  }

  getAvatar(): string {
    return this.avatar + '?t=' + this.timestamp;
  }

  setAvatar(extension: string): void {
    let array = this.avatar.split('.');
    array[array.length-1] = extension;
    this.avatar = array.join('.');
    this.timestamp = Date.now().toString();
  }
}
