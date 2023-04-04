import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';
import { Store } from '@ngrx/store';
import { setAuthLoading } from 'src/app/store/actions/auth-action';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private store: Store,
  ) { }

  private isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private addTokenToHeader(req: HttpRequest<any>): HttpRequest<any> {
    const accessToken = this.tokenService.getAccessToken();
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + accessToken)
    })
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      console.log('calling refresh token')
      this.isRefreshing = true
      this.refreshTokenSubject.next(null)
      return this.authService.refreshToken().pipe(
        switchMap((res) => {
          console.log('refresh token successed')
          this.isRefreshing = false
          this.tokenService.saveToken(res.access_token, res.refresh_token)
          this.refreshTokenSubject.next(true)
          req = this.addTokenToHeader(req)
          return next.handle(req)
        }),
        catchError((err) => {
          console.log('refresh token failed')
          this.isRefreshing = false
          this.authService.logout()
          return throwError(() => err)
        })
      )
    } else {
      console.log('wating till refresh token finishes')
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap(() => {
          console.log('calling after refresh token succeeded')
          req = this.addTokenToHeader(req)
          return next.handle(req)
        })
      );
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('calling auth interceptor')
    req = this.addTokenToHeader(req)
    return next.handle(req).pipe(
      catchError((err) => {
        if (
          err instanceof HttpErrorResponse &&
          !req.url.includes('auth/refresh-token') &&
          err.status === 401
        ) {
          return this.handle401Error(req, next)
        }
        console.log('Error that isn\'t Unauthorize or refresh token failed')
        this.store.dispatch(setAuthLoading({ isAuthLoading: false }))
        return throwError(() => err)
      })
    )
  }
}
