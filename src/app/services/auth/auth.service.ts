import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap } from 'rxjs';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment';

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

  apiUrl: string = `${environment.apiUrl}/auth`

  login(loginData: loginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData)
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
      `${this.apiUrl}/refresh-token`,
      { refresh_token }
    )
  }

  me(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/me`)
  }
}
