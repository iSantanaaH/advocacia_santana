import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
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
export class RegisterComponent {
  constructor(private _fb: FormBuilder) {}

  fullNameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (typeof value === 'string' && value.trim().split(' ').length >= 2) {
      return null;
    }

    return { fullName: 'o nome precisa ser completo' };
  }

  public registerForm = this._fb.group({
    name: ['', [Validators.required, this.fullNameValidator]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repeatPassword: ['', Validators.required],
    birthdate: ['', [Validators.required, Validators.maxLength(8)]],
    phone: ['', [Validators.required, Validators.maxLength(11)]],
  });
}
