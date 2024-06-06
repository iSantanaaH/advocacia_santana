import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/auth-user/login';

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, password });
  }
}
