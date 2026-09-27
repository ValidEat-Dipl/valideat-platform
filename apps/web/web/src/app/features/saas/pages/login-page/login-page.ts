import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CurrentUserService } from '../../../admin/services/current-user-service';
import { SaasAuthService } from '../../services/saas-auth.service';

@Component({
  selector: 'app-saas-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class SaasLoginPage {

  isLoading = signal(false);
  loginError = signal('');

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });


  constructor(
    private saasAuthService: SaasAuthService,
    private currentUserService: CurrentUserService,
    private router: Router,
  ) {

  }


  login(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }


    if (this.isLoading()) {
      return;
    }


    const emailValue = this.loginForm.value.email;
    const passwordValue = this.loginForm.value.password;


    if (!emailValue || !passwordValue) {
      return;
    }


    const email = emailValue.trim();
    const password = passwordValue;


    this.isLoading.set(true);
    this.loginError.set('');


    this.saasAuthService.login(email, password).subscribe({

      next: (response) => {

        this.isLoading.set(false);


        if (!response) {
          this.loginError.set('Anmeldung fehlgeschlagen. Bitte Zugangsdaten prüfen.');
          return;
        }


        if (!response.token) {
          this.loginError.set('Anmeldung fehlgeschlagen. Bitte Zugangsdaten prüfen.');
          return;
        }


        if (response.role !== 'SAAS_ADMIN') {

          this.loginError.set(
            'Dieser Zugang hat keine SaaS-Admin-Rolle. Bitte den passenden Anmeldebereich verwenden.'
          );

          return;
        }


        this.currentUserService.setUser({
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          role: response.role,
          token: response.token,
        });


        this.loginForm.controls.password.reset();

        this.router.navigate(['/saas/dashboard']);

      },


      error: () => {

        this.isLoading.set(false);

        this.loginError.set(
          'Anmeldung nicht möglich. Bitte Zugangsdaten, Tenant-Zuordnung und Backend-Verbindung prüfen.'
        );

      }

    });

  }

}
