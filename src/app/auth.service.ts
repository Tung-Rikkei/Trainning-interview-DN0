import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

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
  ) { }

  login(loginData: loginData): Observable<any> {
    return this.http.post('https://api.quangmv-dn0.workers.dev/api/v2/auth/login', loginData)
      .pipe(
        map((response: any) => {
          localStorage.setItem('access_token', response.access_token)
          localStorage.setItem('refresh_token', response.refresh_token)
          return response
        }),
        catchError(error => {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          throw error
        }),
      )
  }
}
