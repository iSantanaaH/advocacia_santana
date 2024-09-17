import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/auth/login';

  login(
    email: String,
    password: String
  ): Observable<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(
      this.apiUrl,
      { email, password },
      { observe: 'response' }
    );
  }
}
