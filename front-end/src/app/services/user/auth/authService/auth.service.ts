import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Role, RoleName } from '../../../../shared/enums/role.enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly COOKIE_NAME = 'a7fK9Lz0jH';
  private userName: string | null = null;
  public userRoleName: string | null = null;

  constructor(private cookieService: CookieService) {
    this.initializeUser();
  }

  private initializeUser(): void {
    const token = this.getToken();
    const validToken = this.getValidDecodedToken();

    if (token && validToken) {
      const decoded = this.decodedToken(token);
      if (decoded && decoded.user) {
        this.userName = decoded.user.name;
      }
    }
  }

  public getUserIdToken(): number | null {
    const token = this.getToken();
    const validToken = this.getValidDecodedToken();

    if (token && validToken) {
      const decoded = this.decodedToken(token);
      const userId = decoded.user.id;
      return userId;
    }
    return null;
  }

  public getUserRole(): number | null {
    const token = this.getToken();
    const validToken = this.getValidDecodedToken();

    if (token && validToken) {
      const decoded = this.decodedToken(token);
      const userRoleId = decoded.user.roleId;

      switch (userRoleId) {
        case 1:
          this.userRoleName = RoleName[Role.ADMIN];
          break;
        case 2:
          this.userRoleName = RoleName[Role.USER];
          break;
        default:
          this.userRoleName = null;
      }
      return userRoleId;
    }
    return null;
  }

  public getUserName(): string | null {
    const fullName = this.userName;
    const nameParts = fullName?.split(' ');
    const firstName = nameParts![0];
    const lastName = nameParts![nameParts!.length - 1];
    return `${firstName} ${lastName}`;
  }

  private getToken(): string | null {
    const token = this.cookieService.get(this.COOKIE_NAME);
    return token;
  }

  public decodedToken<T = any>(token: string): T | null {
    try {
      return jwtDecode<T>(token);
    } catch (error) {
      return null;
    }
  }

  public getValidDecodedToken(): boolean | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodedToken(token);
    const currentTime = Math.floor(Date.now() / 1000);

    return decoded && decoded.exp > currentTime ? decoded : null;
  }

  public setAuthTokenInCookies(token: string): boolean {
    try {
      if (token) {
        const expires = new Date(Date.now() + 60 * 60 * 1000);
        this.cookieService.set(this.COOKIE_NAME, token, {
          expires,
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error(error.message);
      return false;
    }
  }

  public isUserAuthenticated(): boolean | null {
    const validToken = this.getValidDecodedToken();
    return validToken;
  }

  public saveUserCredentials(token: string, userName: string): boolean {
    try {
      const cookieSet = this.setAuthTokenInCookies(token);

      if (cookieSet) {
        this.userName = userName;
        return true;
      }
      return false;
    } catch (error: any) {
      console.error(error.message);
      return false;
    }
  }

  public logout(): void {
    this.cookieService.delete(this.COOKIE_NAME, '/');
    this.userName = null;
    this.userRoleName = null;
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }
}
