import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { AdminLogin } from '../../models/admin-login.model';
import { ButtonComp } from '../button-comp/button-comp';
import { CurrentUserService } from '../../services/current-user-service';

@Component({
  selector: 'app-login-comp',
  imports: [ReactiveFormsModule, ButtonComp],
  templateUrl: './login-comp.html',
  styleUrl: './login-comp.css',
})
export class LoginComp {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  currentUserService = inject(CurrentUserService);

  isLoading = signal(false);
  loginError = signal(false);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loginError.set(false);
    this.isLoading.set(true);

    const values = this.form.getRawValue();

    const login: AdminLogin = {
      email: values.email,
      password: values.password,
    };

    this.authService.login(login).subscribe({
      next: (response) => {
        this.isLoading.set(false);

        this.currentUserService.setUser({
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          role: response.role,
          token: response.token,
        });

        console.log('Gespeicherter User:', this.currentUserService.getUser());

        this.router.navigate(['/']);
      },

      error: () => {
        this.isLoading.set(false);
        this.loginError.set(true);
      },
    });
  }
}
