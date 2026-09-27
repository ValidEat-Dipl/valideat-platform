import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tenant } from '../../models/tenant.model';
import { EditTenant } from '../../models/saas-settings.model';
import { SaasService } from '../../services/saas.service';
import { SaasState } from '../../services/saas-state.service';

@Component({
  selector: 'app-saas-organization-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './organization-page.html',
  styleUrl: './organization-page.scss'
})
export class SaasOrganizationPage implements OnInit, OnDestroy {

  loading = signal(false);
  saving = signal(false);
  loadError = signal('');
  saveError = signal('');
  saved = signal(false);
  rulesLoading = signal(false);
  rulesSaving = signal(false);
  rulesError = signal('');
  rulesSaveError = signal('');
  rulesSaved = signal(false);

  private tenant: Tenant | null = null;
  private loadRequests = new Subscription();
  private subscriptions = new Subscription();

  organizationForm = new FormGroup({
    organisationName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(150)] }),
    contactPerson: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(150)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    country: new FormControl('', { nonNullable: true, validators: Validators.required }),
    companySize: new FormControl('', { nonNullable: true, validators: Validators.required })
  });

  rulesForm = new FormGroup({
    usageDays: new FormControl<string[]>([], { nonNullable: true }),
    restaurantRequired: new FormControl(false, { nonNullable: true }),
    correctionHints: new FormControl(false, { nonNullable: true })
  });

  days = [
    { value: 'MONDAY', label: 'Montag' }, { value: 'TUESDAY', label: 'Dienstag' },
    { value: 'WEDNESDAY', label: 'Mittwoch' }, { value: 'THURSDAY', label: 'Donnerstag' },
    { value: 'FRIDAY', label: 'Freitag' }, { value: 'SATURDAY', label: 'Samstag' },
    { value: 'SUNDAY', label: 'Sonntag' }
  ];


  constructor(public state: SaasState, private saasService: SaasService) {
  }

  ngOnInit(): void {
    this.load();
    this.subscriptions.add(this.state.tenantChanged.subscribe(() => {
      this.load();
    }));
  }


  load(): void {
    this.loadRequests.unsubscribe();
    this.loadRequests = new Subscription();
    this.tenant = null;
    this.organizationForm.reset();
    this.rulesForm.reset();
    this.saved.set(false);
    this.rulesSaved.set(false);
    this.loadError.set('');
    this.saveError.set('');
    this.rulesError.set('');
    this.rulesSaveError.set('');
    this.loading.set(false);
    this.rulesLoading.set(false);

    const id = this.state.selectedId();
    if (id === null || !this.state.isBrowser()) {
      return;
    }

    this.loading.set(true);
    this.rulesLoading.set(true);
    this.loadRequests.add(this.saasService.getTenant(id).subscribe({
      next: (tenant) => {
        this.tenant = tenant;
        this.organizationForm.reset({
          organisationName: tenant.name, contactPerson: tenant.manager,
          email: tenant.email, country: tenant.country, companySize: tenant.companySize
        });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.loadError.set('Organisationsdaten konnten nicht geladen werden.');
      }
    }));

    this.loadRequests.add(this.saasService.getRules(id).subscribe({
      next: (rules) => {
        let usageDays = rules.usageDays;
        if (usageDays === null) {
          usageDays = [];
        }

        this.rulesForm.reset({
          usageDays: usageDays,
          restaurantRequired: rules.restaurantRequired,
          correctionHints: rules.correctionHints
        });
        this.rulesLoading.set(false);
      },
      error: (response) => {
        this.rulesLoading.set(false);
        if (response.status === 404) {
          this.rulesError.set('Die Organisation wurde nicht gefunden. Bitte die Kundenübersicht neu laden.');
        } else if (response.status === 401) {
          this.rulesError.set('Bitte erneut als SaaS-Admin anmelden.');
        } else if (response.status === 403) {
          this.rulesError.set('Für diese Aktion fehlt die SaaS-Admin-Berechtigung.');
        } else {
          this.rulesError.set('Regeln konnten nicht geladen werden. Bitte erneut versuchen.');
        }
      }
    }));
  }


  saveOrganization(): void {
    const id = this.state.selectedId();
    const tenant = this.tenant;
    if (id === null || !tenant || this.saving() || this.loading() || this.loadError()) {
      return;
    }
    if (this.organizationForm.invalid) {
      this.organizationForm.markAllAsTouched();
      return;
    }

    const values = this.organizationForm.getRawValue();
    if (!values.organisationName.trim() || !values.contactPerson.trim()) {
      this.saveError.set('Bitte Organisationsname und Kontaktperson ausfüllen.');
      return;
    }
    const data: EditTenant = {
      organisationName: values.organisationName.trim(), contactPerson: values.contactPerson.trim(),
      email: values.email.trim(), country: values.country, companySize: values.companySize,
      primaryColor: tenant.primaryColor, accentColor: tenant.accentColor
    };

    this.saving.set(true);
    this.saved.set(false);
    this.saveError.set('');
    this.subscriptions.add(this.saasService.updateTenant(id, data).subscribe({
      next: () => {
        this.saving.set(false);
        this.state.loadTenants();
        if (id === this.state.selectedId()) {
          this.saved.set(true);
        }
      },
      error: () => {
        this.saving.set(false);
        if (id === this.state.selectedId()) {
          this.saveError.set('Organisation konnte nicht gespeichert werden. Bitte auch den eindeutigen Namen prüfen.');
        }
      }
    }));
  }


  toggleDay(day: string, checked: boolean): void {
    let days = this.rulesForm.controls.usageDays.value;
    if (checked) {
      days = [...days, day];
    } else {
      days = days.filter((value) => value !== day);
    }
    this.rulesForm.controls.usageDays.setValue(days);
    this.rulesSaved.set(false);
  }

  saveRules(): void {
    const id = this.state.selectedId();
    if (id === null || this.rulesLoading() || this.rulesSaving() || this.rulesError() || !this.tenant) {
      return;
    }
    const rules = this.rulesForm.getRawValue();
    this.rulesSaving.set(true);
    this.rulesSaved.set(false);
    this.rulesSaveError.set('');

    this.subscriptions.add(this.saasService.updateRules(id, rules).subscribe({
      next: () => {
        this.rulesSaving.set(false);
        if (id === this.state.selectedId()) {
          this.rulesSaved.set(true);
        }
      },
      error: () => {
        this.rulesSaving.set(false);
        if (id === this.state.selectedId()) {
          this.rulesSaveError.set('Regeln konnten nicht gespeichert werden.');
        }
      }
    }));
  }


  ngOnDestroy(): void {
    this.loadRequests.unsubscribe();
    this.subscriptions.unsubscribe();
  }
}
