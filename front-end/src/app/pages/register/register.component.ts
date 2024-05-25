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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public SHOW_PASSWORD: boolean = false;
  public SHOW_REPEAT_PASSWORD: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private registerService: RegisterService
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
            console.log('Registro bem-sucedido', response);
          },
          error: (error) => {
            console.error('Erro no registro', error.message);
          },
          complete: () => {
            console.log('Processo de registro completo');
          },
        });
    } else {
      console.log('Formulário inválido');
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
