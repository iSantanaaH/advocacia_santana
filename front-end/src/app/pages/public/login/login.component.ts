import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastComponent } from '../../../components/toast/toast.component';
import { NgIf } from '@angular/common';
import {
  LoginResponse,
  LoginService,
} from '../../../services/user/auth/login/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/user/auth/authService/auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ToastComponent, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './login-responsive.css'],
})
export default class LoginComponent implements OnDestroy {
  constructor(
    private _fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {}

  private subscription: Subscription = new Subscription();
  public loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  public SHOW_PASSWORD: boolean = false;
  public TOAST_MESSAGE: string = '';

  togglePasswordVisibility(event: MouseEvent): void {
    event.preventDefault();
    this.SHOW_PASSWORD = !this.SHOW_PASSWORD;
  }

  focusEmailField() {
    const email = this.loginForm.get('email');
    this.emailInput.nativeElement.classList.remove('ErrorInput');
    email?.setErrors(null);
  }
  focusPasswordField() {
    const password = this.loginForm.get('password');
    this.passwordInput.nativeElement.classList.remove('ErrorInput');
    password?.setErrors(null);
  }

  blurEmailField() {
    const email = this.loginForm.get('email');

    if (this.emailInput.nativeElement.value.length > 0) {
      if (email?.valid) {
        this.emailInput.nativeElement.classList.remove('ErrorInput');
        this.emailInput.nativeElement.classList.add('AcceptInput');
        email?.setErrors(null);
      } else {
        this.emailInput.nativeElement.classList.remove('AcceptInput');
        this.emailInput.nativeElement.classList.add('ErrorInput');
        email?.setErrors({ emailFieldError: 'formato inválido' });
      }
    } else {
      this.emailInput.nativeElement.classList.remove('AcceptInput');
      this.emailInput.nativeElement.classList.add('ErrorInput');
      email?.setErrors({ emailFieldError: 'campo obrigatório' });
    }
  }

  changePasswordField() {
    if (this.passwordInput.nativeElement.value.length > 0) {
      this.passwordInput.nativeElement.classList.add('AcceptInput');
      this.passwordInput.nativeElement.classList.remove('ErrorInput');
    } else {
      this.passwordInput.nativeElement.classList.remove('AcceptInput');
    }
  }

  changeEmailField() {
    if (this.emailInput.nativeElement.value.length > 0) {
      this.emailInput.nativeElement.classList.add('AcceptInput');
      this.emailInput.nativeElement.classList.remove('ErrorInput');
    } else {
      this.emailInput.nativeElement.classList.remove('AcceptInput');
    }
  }

  blurPasswordField() {
    const password = this.loginForm.get('password');

    if (this.passwordInput.nativeElement.value.length === 0) {
      this.passwordInput.nativeElement.classList.remove('AcceptInput');
      this.passwordInput.nativeElement.classList.add('ErrorInput');
      password?.setErrors({ passwordFieldError: 'campo obrigatório' });
    } else {
      this.passwordInput.nativeElement.classList.add('AcceptInput');
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';

      const loginSub = this.loginService.login(email, password).subscribe({
        next: (response: HttpResponse<LoginResponse>) => {
          if (response.status === 200) {
            const responseBody = response.body;
            const token = responseBody!.token;
            const decodedToken = this.authService.decodedToken(token);
            const userName = decodedToken.user.name;
            this.authService.authUser(token, userName);

            this.TOAST_MESSAGE = `Bem vindo, ${userName}`;
            this.toastComponent.message = this.TOAST_MESSAGE;
            this.toastComponent.showToast();
            this.loginForm.reset();
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 2000);
          }
        },
        error: (error) => {
          if (error.status === 400) {
            const errorMessage =
              error.error.message ||
              'Erro desconhecido. Por favor, tente novamente';
            this.TOAST_MESSAGE = errorMessage;
            this.toastComponent.message = this.TOAST_MESSAGE;
            this.toastComponent.showToast();
          }
        },
      });
      this.subscription.add(loginSub);
    } else {
      this.TOAST_MESSAGE = `Preencha todos os campos`;
      this.toastComponent.message = this.TOAST_MESSAGE;
      this.toastComponent.showToast();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
