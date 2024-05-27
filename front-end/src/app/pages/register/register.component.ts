import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../../services/user/register/register.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastComponent } from '../../components/toast/toast/toast.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, HttpClientModule, ToastComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public SHOW_PASSWORD: boolean = false;
  public SHOW_REPEAT_PASSWORD: boolean = false;
  public SHOW_TOAST: boolean = true;
  public TOAST_MESSAGE: string = 'Mensagem Teste';

  constructor(
    private _fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm.get('phone')?.valueChanges.subscribe(() => {
      this.formatPhoneOnChange();
    });
  }

  fullNameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (typeof value === 'string' && value.trim().split(' ').length >= 2) {
      return null;
    }

    return { fullNameError: 'nome incompleto' };
  }

  checkIdenticalPasswords(): void {
    const password = this.registerForm.get('password');
    const repeatPassword = this.registerForm.get('repeatPassword');

    if (password && repeatPassword) {
      if (password.value !== repeatPassword.value) {
        repeatPassword.setErrors({
          identicalPasswordsError: 'as senhas não coincidem',
        });
      } else {
        repeatPassword.setErrors(null);
      }
    }
  }

  formatPhoneOnChange(): void {
    const phoneControl = this.registerForm.get('phone');

    if (phoneControl) {
      let phone = phoneControl.value;

      if (typeof phone === 'string') {
        phone = phone.replace(/\D/g, '');
        let formattedPhone = '';

        if (phone.length <= 2) {
          formattedPhone = phone;
        } else if (phone.length <= 7) {
          formattedPhone = `(${phone.substring(0, 2)}) ${phone.substring(2)}`;
        } else {
          formattedPhone = `(${phone.substring(0, 2)}) ${phone.substring(
            2,
            7
          )}-${phone.substring(7, 11)}`;
        }
        phoneControl.setValue(formattedPhone, { emitEvent: false });
      }
    }
  }

  toggleRepeatPasswordVisibility(event: MouseEvent): void {
    event.preventDefault();
    this.SHOW_REPEAT_PASSWORD = !this.SHOW_REPEAT_PASSWORD;
  }

  togglePasswordVisibility(event: MouseEvent): void {
    event.preventDefault();
    this.SHOW_PASSWORD = !this.SHOW_PASSWORD;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const name = this.registerForm.get('name')?.value ?? '';
      const email = this.registerForm.get('email')?.value ?? '';
      const password = this.registerForm.get('password')?.value ?? '';
      const birthdate = this.registerForm.get('birthdate')?.value ?? '';
      const phone = this.registerForm.get('phone')?.value ?? '';

      this.registerService
        .register(name, email, password, birthdate, phone)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.TOAST_MESSAGE = 'Registro realizado com sucesso!';
            this.SHOW_TOAST = true;
          },
          error: (error) => {
            console.error(error.message);
            this.TOAST_MESSAGE = 'Falha no registro. Tente novamnete.';
            this.SHOW_TOAST = true;

            setTimeout(() => {
              this.SHOW_TOAST = false;
            }, 2500);
          },
          complete: () => {
            this.registerForm.reset();

            setTimeout(() => {
              this.router.navigate(['/']);
            }, 2000);

            setTimeout(() => {
              this.SHOW_TOAST = false;
            }, 3000);
          },
        });
    } else {
      console.error('Formulário inválido');
    }
  }

  public registerForm = this._fb.group({
    name: ['', [Validators.required, this.fullNameValidator]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repeatPassword: ['', Validators.required],
    birthdate: ['', [Validators.required, Validators.maxLength(10)]],
    phone: [
      '',
      [Validators.required, Validators.minLength(15), Validators.maxLength(15)],
    ],
  });
}
