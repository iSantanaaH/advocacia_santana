import { Injectable } from '@angular/core';
import { CookieService } from '../cookie/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly COOKIE_NAME = 'a7fK9Lz0jH';
  private userName: string | null = null;

  constructor(private cookieService: CookieService) {}

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  private getToken(): string | null {
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

  login(token: string, userName: string): void {
    this.cookieService.setCookie(this.COOKIE_NAME, token, 1);
    this.userName = userName;
  }

  logout(): void {
    this.cookieService.deleteCookie(this.COOKIE_NAME);
    this.userName = null;
  }

  getUserName(): string | null {
    return this.userName;
  }
}
