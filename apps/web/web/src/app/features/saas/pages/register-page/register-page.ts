import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrentUserService } from '../../../admin/services/current-user-service';
import { CreateTenantRequest, Tenant } from '../../models/tenant.model';
import { SaasService } from '../../services/saas.service';

@Component({
  selector: 'app-saas-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class SaasRegisterPage implements OnInit {

  allowed = false;
  isLoading = signal(false);
  registerError = signal('');
  createdTenant = signal<Tenant | null>(null);

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    manager: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('Österreich', Validators.required),
    companySize: new FormControl('', Validators.required),
    authorized: new FormControl(false, Validators.requiredTrue),
  });


  constructor(
    private saasService: SaasService,
    private currentUserService: CurrentUserService,
  ) {

  }


  ngOnInit(): void {

    const currentUser = this.currentUserService.getUser();

    if (!currentUser) {
      this.allowed = false;
      return;
    }

    if (currentUser.role !== 'SAAS_ADMIN') {
      this.allowed = false;
      return;
    }

    if (!currentUser.token) {
      this.allowed = false;
      return;
    }

    this.allowed = true;
  }


  register(): void {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;
    }


    if (!this.allowed) {
      return;
    }

    if (this.isLoading()) {
      return;
    }

    if (this.createdTenant()) {
      return;
    }


    const formValues = this.registerForm.value;

    const name = formValues.name;
    const manager = formValues.manager;
    const email = formValues.email;
    const country = formValues.country;
    const companySize = formValues.companySize;


    if (!name || !manager || !email || !country || !companySize) {
      return;
    }


    const tenant: CreateTenantRequest = {
      name: name.trim(),
      manager: manager.trim(),
      email: email.trim(),
      country: country,
      companySize: companySize,
      primaryColor: '#0d6efd',
      accentColor: '#20c997',
    };


    if (!tenant.name || !tenant.manager) {

      this.registerError.set(
        'Bitte Organisationsname und Kontaktperson ausfüllen.'
      );

      return;
    }


    this.isLoading.set(true);
    this.registerError.set('');


    this.saasService.createTenant(tenant).subscribe({

      next: (data) => {

        this.isLoading.set(false);

        this.createdTenant.set(data);

      },

      error: () => {

        this.isLoading.set(false);

        this.registerError.set(
          'Organisation konnte nicht angelegt werden. Bitte Verbindung, Berechtigung und eindeutigen Organisationsnamen prüfen.'
        );

      }

    });

  }

}