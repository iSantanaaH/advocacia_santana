import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/user/auth/register/register.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastComponent } from '../../components/toast/toast/toast.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    HttpClientModule,
    ToastComponent,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export default class RegisterComponent implements OnInit {
  public registerForm = this._fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repeatPassword: ['', Validators.required],
    birthdate: ['', [Validators.required, Validators.maxLength(10)]],
    phone: [
      '',
      [Validators.required, Validators.minLength(15), Validators.maxLength(15)],
    ],
  });

  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('repeatPasswordInput') repeatPasswordInput!: ElementRef;
  @ViewChild('birthdateInput') birthdateInput!: ElementRef;
  @ViewChild('phoneInput') phoneInput!: ElementRef;
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  public SHOW_PASSWORD: boolean = false;
  public SHOW_REPEAT_PASSWORD: boolean = false;
  public TOAST_MESSAGE: string = '';

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

  blurNameField() {
    const name = this.registerForm.get('name');
    const nameValue = this.nameInput.nativeElement.value.trim();

    if (nameValue.length === 0) {
      name?.setErrors({ nameFieldError: 'campo obrigatório' });
      this.nameInput.nativeElement.classList.remove('AcceptInput');
      this.nameInput.nativeElement.classList.add('ErrorInput');
    } else {
      const words = nameValue.split(' ');

      if (words.length >= 2 && words[1].length > 0) {
        this.nameInput.nativeElement.classList.remove('ErrorInput');
        this.nameInput.nativeElement.classList.add('AcceptInput');
        name?.setErrors(null);
      } else {
        this.nameInput.nativeElement.classList.remove('AcceptInput');
        this.nameInput.nativeElement.classList.add('ErrorInput');
        name?.setErrors({ nameFieldError: 'nome incompleto' });
      }
    }
  }

  checkIdenticalPasswords(): void {
    const password = this.registerForm.get('password');
    const repeatPassword = this.registerForm.get('repeatPassword');

    if (repeatPassword?.value?.length === 0) {
      this.repeatPasswordInput.nativeElement.classList.remove('AcceptInput');
      this.repeatPasswordInput.nativeElement.classList.add('ErrorInput');
      repeatPassword.setErrors({
        repeatPasswordFieldError: 'campo obrigatório',
      });
    }

    if (password && repeatPassword) {
      if (repeatPassword.value) {
        if (password.value !== repeatPassword.value) {
          this.repeatPasswordInput.nativeElement.classList.remove(
            'AcceptInput'
          );
          this.repeatPasswordInput.nativeElement.classList.add('ErrorInput');
          repeatPassword.setErrors({
            repeatPasswordFieldError: 'as senhas não coincidem',
          });
        } else {
          this.repeatPasswordInput.nativeElement.classList.remove('ErrorInput');
          this.repeatPasswordInput.nativeElement.classList.add(
            'AcceptInput',
            'InputPassword'
          );
        }
      }
    }
  }

  blurEmailField() {
    const email = this.registerForm.get('email');

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

  blurPasswordField() {
    const password = this.registerForm.get('password');

    if (this.passwordInput.nativeElement.value.length >= 8) {
      this.passwordInput.nativeElement.classList.remove('ErrorInput');
      this.passwordInput.nativeElement.classList.add(
        'AcceptInput',
        'InputPassword'
      );
    } else if (this.passwordInput.nativeElement.value.length > 0) {
      this.passwordInput.nativeElement.classList.remove('AcceptInput');
      this.passwordInput.nativeElement.classList.add(
        'ErrorInput',
        'InputPassword'
      );
      password?.setErrors({
        errorPasswordField: 'a senha deve conter no mínimo 8 dígitos',
      });
    } else if (this.passwordInput.nativeElement.value.length === 0) {
      this.passwordInput.nativeElement.classList.remove('AcceptInput');
      this.passwordInput.nativeElement.classList.add(
        'ErrorInput',
        'InputPassword'
      );
      password?.setErrors({
        errorPasswordField: 'campo obrigatório',
      });
    }
  }

  blurBirthdateField() {
    const birthdate = this.registerForm.get('birthdate');

    if (this.birthdateInput.nativeElement.value.length > 0) {
      if (birthdate?.valid) {
        this.birthdateInput.nativeElement.classList.remove('ErrorInput');
        this.birthdateInput.nativeElement.classList.add(
          'AcceptInput',
          'InputDate'
        );
        birthdate.setErrors(null);
      }
    } else {
      this.birthdateInput.nativeElement.classList.remove('AcceptInput');
      this.birthdateInput.nativeElement.classList.add(
        'ErrorInput',
        'InputDate'
      );
      birthdate?.setErrors({ birthdateFieldError: 'campo obrigatório' });
    }
  }

  focusNameField() {
    const name = this.registerForm.get('name');
    this.nameInput.nativeElement.classList.remove('ErrorInput');
    name?.setErrors(null);
  }
  focusEmailField() {
    const email = this.registerForm.get('email');
    this.emailInput.nativeElement.classList.remove('ErrorInput');
    email?.setErrors(null);
  }
  focusPasswordField() {
    const password = this.registerForm.get('password');
    this.passwordInput.nativeElement.classList.remove('ErrorInput');
    password?.setErrors(null);
  }
  focusRepeatPasswordField() {
    const repeatPassword = this.registerForm.get('repeatPassword');
    this.repeatPasswordInput.nativeElement.classList.remove('ErrorInput');
    repeatPassword?.setErrors(null);
  }
  focusBirthdateField() {
    const birthdate = this.registerForm.get('birthdate');
    this.birthdateInput.nativeElement.classList.remove('ErrorInput');
    birthdate?.setErrors(null);
  }
  focusPhoneField() {
    const phone = this.registerForm.get('phone');
    this.phoneInput.nativeElement.classList.remove('ErrorInput');
    phone?.setErrors(null);
  }

  blurPhoneField() {
    const phone = this.registerForm.get('phone');

    if (this.phoneInput.nativeElement.value.length === 15) {
      this.phoneInput.nativeElement.classList.remove('ErrorInput');
      this.phoneInput.nativeElement.classList.add('AcceptInput', 'InputPhone');
    } else if (this.phoneInput.nativeElement.value.length > 0) {
      this.phoneInput.nativeElement.classList.remove('AcceptInput');
      this.phoneInput.nativeElement.classList.add('ErrorInput', 'InputPhone');
      phone?.setErrors({ phoneFieldError: 'formato inválido' });
    } else if (this.phoneInput.nativeElement.value.length === 0) {
      this.phoneInput.nativeElement.classList.remove('AcceptInput');
      this.phoneInput.nativeElement.classList.add('ErrorInput', 'InputPhone');
      phone?.setErrors({ phoneFieldError: 'campo obrigatório' });
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
    this.blurNameField();
    this.blurEmailField();
    this.blurPasswordField();
    this.checkIdenticalPasswords();
    this.blurBirthdateField();
    this.blurPhoneField();

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
            this.toastComponent.message = this.TOAST_MESSAGE;
            this.toastComponent.showToast();
          },
          error: (error) => {
            console.error(error.message);
            this.TOAST_MESSAGE = 'Falha no registro. Tente novamente.';
            this.toastComponent.message = this.TOAST_MESSAGE;
            this.toastComponent.showToast();
          },
          complete: () => {
            this.registerForm.reset();

            setTimeout(() => {
              this.router.navigate(['/auth-user/login']);
            }, 2000);
          },
        });
    } else {
      this.TOAST_MESSAGE = 'Preencha todos os campos';
      this.toastComponent.message = this.TOAST_MESSAGE;
      this.toastComponent.showToast();
      return;
    }
  }
}
