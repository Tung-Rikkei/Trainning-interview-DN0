import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { setAuthLoading, setUserInfo } from 'src/app/store/actions/auth-action';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.store.dispatch(setAuthLoading({ isAuthLoading: true }))
    return this.authService.me().pipe(
      tap((response: any) => {
        console.log('is logged in')
        this.store.dispatch(setAuthLoading({ isAuthLoading: false }))
        this.store.dispatch(setUserInfo(response))
        return true
      })
    )
  }
}
