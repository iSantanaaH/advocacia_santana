import { Injectable } from '@angular/core';
import { CookieService } from '../cookie/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly COOKIE_NAME = 'a7fK9Lz0jH';

  constructor(private cookieService: CookieService) {}

  isLoggedIn(): boolean {
    const token = this.cookieService.getCookie(this.COOKIE_NAME);
    console.log(token);
    return token !== null && token !== '';
  }

  login(token: string): void {
    this.cookieService.setCookie(this.COOKIE_NAME, token, 1);
  }

  logout(): void {
    this.cookieService.deleteCookie(this.COOKIE_NAME);
  }
}
