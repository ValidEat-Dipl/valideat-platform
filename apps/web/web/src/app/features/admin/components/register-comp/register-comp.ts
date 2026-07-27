import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { AdminRegister } from '../../models/admin-register.model';
import { Router } from '@angular/router';
import { ButtonComp } from '../button-comp/button-comp';

@Component({
  selector: 'app-register-comp',
  imports: [ReactiveFormsModule, ButtonComp],
  templateUrl: './register-comp.html',
  styleUrl: './register-comp.css',
})
export class RegisterComp {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  isLoading = signal(false);
  registerError = signal(false);
  passwordsDifferent = signal(false);
  showSuccessToast = signal(false);

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: [''],
    department: ['', Validators.required],
    phoneNumber: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    passwordConfirmation: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.value.password !== this.form.value.passwordConfirmation) {
      this.passwordsDifferent.set(true);
      return;
    }

    this.passwordsDifferent.set(false);
    this.registerError.set(false);

    const values = this.form.getRawValue();

    const admin: AdminRegister = {
      firstName: values.firstName,
      lastName: values.lastName,
      address: values.address,
      department: values.department,
      phoneNumber: values.phoneNumber,
      email: values.email,
      passwordHash: values.password,
      role: 'ADMIN',
    };
    console.log(admin);

    this.isLoading.set(true);

    this.authService.register(admin).subscribe({
      next: (response) => {
        this.isLoading.set(false);

        if (response === 'New Employee Registered') {
          this.showSuccessToast.set(true);

          setTimeout(() => {
            this.router.navigate(['/employee/login']);
          }, 1500);
        } else {
          this.registerError.set(true);
        }
      },

      error: () => {
        this.isLoading.set(false);
        this.registerError.set(true);
      },
    });
  }
}
