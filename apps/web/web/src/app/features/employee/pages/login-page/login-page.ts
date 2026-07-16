import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeAuthService } from '../../services/employee-auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})


export class LoginPage {

  isLoading = signal(false);
  loginError = signal(false);


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });


  constructor(
    private employeeAuthService: EmployeeAuthService,
    private router: Router,
  ) {}


  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // set states
    this.isLoading.set(true);
    this.loginError.set(false);


    // set val
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;


    this.employeeAuthService.login(email, password).subscribe({

      next: (response) => {

        if (response.trim() == 'Login was Successful!') {
          this.router.navigate(['/employee/start']);
          return;
        }


        this.isLoading.set(false);
        this.loginError.set(true);

      },
      error: () => {
        this.isLoading.set(false);
        this.loginError.set(true);
      },
      
    });
  }
}
