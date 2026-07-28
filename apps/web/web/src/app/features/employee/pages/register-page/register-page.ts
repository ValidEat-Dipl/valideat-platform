import { Component, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeRegisterRequest } from '../../models/employee-register-request.model';
import { EmployeeAuthService } from '../../services/employee-auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  isLoading = signal(false);

  registerError = signal('');
  passwordsDifferent = signal(false);


  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),

    email: new FormControl('', [Validators.required, Validators.email]),
    department: new FormControl('', Validators.required),

    address: new FormControl(''),
    phoneNumber: new FormControl(''),

    password: new FormControl('', Validators.required),
    passwordConfirmation: new FormControl('', Validators.required),

    consent: new FormControl(false, Validators.requiredTrue)
  });


  constructor(
    private employeeAuthService: EmployeeAuthService,
    private router: Router
  ){}



  register(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;

    }



    const formValues = this.registerForm.value;

    if (formValues.password != formValues.passwordConfirmation) {
      this.passwordsDifferent.set(true);

      return;
    }


      const employee: EmployeeRegisterRequest = {

        firstName: formValues.firstName!,
        lastName: formValues.lastName!,
        email: formValues.email!,
        department: formValues.department!,
        address: formValues.address!,
        phoneNumber: formValues.phoneNumber!,
        passwordHash: formValues.password!,
        // TODO rolle sollte später iwan mal von server gesetzt werdn nd von client wegen json manipulation
        role: 'EMPLOYEE',

      };


    this.isLoading.set(true);
    this.registerError.set('');
    this.passwordsDifferent.set(false);


    this.employeeAuthService.register(employee).subscribe({

      next: (response) => {

        if (response.trim() == 'New Employee Registered') {
          this.router.navigate(['/employee/login']);
          return;
        }

        this.isLoading.set(false);
        this.registerError.set(`Backend-Antwort: ${response}`);

      },

      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);

        let message = `HTTP ${error.status}: ${error.statusText}`;

        if (typeof error.error === 'string' && error.error) {
          message += ` – ${error.error}`;
        }

        this.registerError.set(message);

      },


    });
  }
}
