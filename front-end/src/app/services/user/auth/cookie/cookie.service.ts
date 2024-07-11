import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  setCookie(
    name: string,
    value: string,
    days?: number,
    path: string = '/',
    secure: boolean = true,
    sameSite: string = 'Strict'
  ): void {
    if (!this.isBrowser()) {
      return;
    }

    let cookieString = `${name}=${value}; path=${path};`;

    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      cookieString += `expires=${date.toUTCString()};`;
    }

    if (secure) {
      cookieString += ' Secure;';
    }

    if (sameSite) {
      cookieString += ` SameSite=${sameSite};`;
    }

    console.log(`Setting cookie: ${cookieString}`);
    document.cookie = cookieString;
  }

  deleteCookie(name: string, path: string = '/'): void {
    if (!this.isBrowser()) {
      return;
    }

    let cookieString = `${name}=; Max-Age=-99999999; path=${path}; Secure; SameSite=Strict;`;
    console.log(`Deleting cookie: ${cookieString}`);
    document.cookie = cookieString;
  }
}
