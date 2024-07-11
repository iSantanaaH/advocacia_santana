import { Injectable } from '@angular/core';
import { CookieService } from '../cookie/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly COOKIE_NAME = 'a7fK9Lz0jH';

  constructor(private cookieService: CookieService) {}

  isLoggedIn(): boolean {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];

      if (cookie.startsWith(this.COOKIE_NAME)) {
        const token = cookie;
        return token !== null;
      }
    }
    return false;
  }

  login(token: string): void {
    this.cookieService.setCookie(this.COOKIE_NAME, token, 1);
  }

  logout(): void {
    this.cookieService.deleteCookie(this.COOKIE_NAME);
  }
}
