import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../../../shared/utils/url-builder.util';

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(
    email: String,
    password: String
  ): Observable<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(
      buildApiUrl('public', 'user/authentication'),
      { email, password },
      { observe: 'response' }
    );
  }
}
