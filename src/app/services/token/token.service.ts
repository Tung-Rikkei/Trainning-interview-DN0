import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
  }

  removeToken(): void {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token')
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token')
  }
}
