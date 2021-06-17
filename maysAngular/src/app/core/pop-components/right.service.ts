import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {IToken} from '../../model-interface/token';
import {IRight} from '../../model-interface/right';

@Injectable({
  providedIn: 'root'
})
export class RightService {

  constructor() {
  }

  getRight(): IRight {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode<IToken>(token);
    return {
      userName: decoded.Username,
      userRole: decoded.role,
      avatar: decoded.Avatar
    };
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
    return this.getRight().avatar;
  }
}
