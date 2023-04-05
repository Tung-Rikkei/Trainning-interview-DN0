import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap } from 'rxjs';
import { TokenService } from '../token/token.service';

interface loginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  login(loginData: loginData): Observable<any> {
    return this.http.post('https://api.quangmv-dn0.workers.dev/api/v2/auth/login', loginData)
      .pipe(
        tap((response: any) => {
          this.tokenService.saveToken(response.access_token, response.refresh_token)
          return response
        }),
        catchError(error => {
          this.tokenService.removeToken()
          throw error
        }),
      )
  }

  logout(): void {
    this.tokenService.removeToken()
    this.router.navigateByUrl('/login')
  }

  refreshToken(): Observable<any> {
    const refresh_token = this.tokenService.getRefreshToken()
    return this.http.post(
      'https://api.quangmv-dn0.workers.dev/api/v2/auth/refresh-token',
      { refresh_token }
    )
  }

  me(): Observable<any> {
    return this.http.get('https://api.quangmv-dn0.workers.dev/api/v2/me')
  }
}
