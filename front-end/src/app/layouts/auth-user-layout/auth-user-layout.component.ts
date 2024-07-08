import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-user-layout',
  standalone: true,
  imports: [RouterOutlet, NgClass, NgIf],
  templateUrl: './auth-user-layout.component.html',
  styleUrl: './auth-user-layout.component.css',
})
export default class AuthUserLayoutComponent {
  public routerLogin: boolean = this.router.url === '/auth-user/login';
  public routerRegister: boolean = this.router.url === '/auth-user/cadastro';

  constructor(private router: Router) {}

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
