import { Injectable } from '@angular/core';
import { CookieService } from '../cookie/cookie.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly COOKIE_NAME = 'a7fK9Lz0jH';
  private userName: string | null = null;

  constructor(private cookieService: CookieService) {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodedToken(token);
      if (decoded && decoded.user) {
        this.userName = decoded.user.name;
      }
    }
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  public login(token: string, userName: string): void {
    this.cookieService.setCookie(this.COOKIE_NAME, token);
    this.userName = userName;
  }

  public decodedToken(token: string): any {
    return jwtDecode(token);
  }

  public logout(): void {
    this.cookieService.deleteCookie(this.COOKIE_NAME);
    this.userName = null;
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }

  public getUserName(): string | null {
    return this.userName;
  }

  public getToken(): string | null {
    if (typeof window !== 'undefined') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${this.COOKIE_NAME}`)) {
          return cookie.split('=')[1];
        }
      }
    }
    return null;
  }
}
