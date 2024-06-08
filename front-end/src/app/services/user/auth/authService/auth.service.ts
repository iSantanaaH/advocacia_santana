import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('advocacia_santana_token');
  }

  login(token: string): void {
    localStorage.setItem('advocacia_santana_token', token);
  }

  logout(): void {
    localStorage.removeItem('advocacia_santana_token');
  }
}
