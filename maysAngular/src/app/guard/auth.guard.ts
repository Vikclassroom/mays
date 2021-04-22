import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {CoreService} from '../core/core.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private coreService: CoreService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.coreService.currentUser$.pipe(
      map(auth => {
        if (auth) {
          return true;
        }
        this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      })
    );
  }
}
