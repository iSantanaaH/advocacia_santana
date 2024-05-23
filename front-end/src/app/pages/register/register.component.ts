import { NgClass } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  public SHOW_PASSWORD: boolean = false;
  public SHOW_REPEAT_PASSWORD: boolean = false;

  constructor(private _fb: FormBuilder) {}

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
