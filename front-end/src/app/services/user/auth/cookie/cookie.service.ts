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

  getCookie(name: string): string | null {
    if (!this.isBrowser()) {
      return null;
    }

    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
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
