import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { publicApiUrl } from '../../../../shared/utils/url-builder.util';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(
    name: string,
    email: string,
    password: string,
    birthdate: string,
    phone: string
  ) {
    return this.http.post(publicApiUrl('user/register'), {
      name,
      email,
      password,
      birthdate,
      phone,
    });
  }
}
