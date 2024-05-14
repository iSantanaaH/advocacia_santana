import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/api/auth/register';

  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string, birthdate: Date, phone: string) {
    return this.http.post(this.apiUrl, {name, email, password, birthdate, phone})
  }
}
