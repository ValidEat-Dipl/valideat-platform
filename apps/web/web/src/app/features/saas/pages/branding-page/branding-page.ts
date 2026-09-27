import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Branding } from '../../models/saas-settings.model';
import { SaasService } from '../../services/saas.service';
import { SaasState } from '../../services/saas-state.service';
import { contrastWithWhite } from '../../services/branding-colors';

@Component({
  selector: 'app-saas-branding-page',
  imports: [ReactiveFormsModule],
  templateUrl: './branding-page.html',
  styleUrl: './branding-page.scss'
})
export class SaasBrandingPage implements OnInit, OnDestroy {

  loading = signal(false);
  saving = signal(false);
  saved = signal(false);
  loadError = signal('');
  saveError = signal('');

  private loadRequest = new Subscription();
  private subscriptions = new Subscription();

  brandingForm = new FormGroup({
    appName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(80)] }),
    shortName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(80)] }),
    primaryColor: new FormControl('#0d6efd', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^#[0-9a-f]{6}$/i)] }),
    accentColor: new FormControl('#20c997', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^#[0-9a-f]{6}$/i)] }),
    logo: new FormControl('', { nonNullable: true, validators: Validators.maxLength(255) })
  });


  constructor(public state: SaasState, private saasService: SaasService, private router: Router) {
  }

  ngOnInit(): void {
    this.load();
    this.subscriptions.add(this.state.tenantChanged.subscribe(() => {
      this.load();
    }));
  }


  load(): void {
    this.loadRequest.unsubscribe();
    this.saved.set(false);
    this.loadError.set('');
    this.saveError.set('');
    this.loading.set(false);
    this.brandingForm.reset();

    const tenant = this.state.selected;
    if (!tenant || !this.state.isBrowser()) {
      return;
    }
    this.brandingForm.patchValue({ appName: tenant.tenantName, shortName: 'VE' });
    this.loading.set(true);

    this.loadRequest = this.saasService.getBranding(tenant.tenantId).subscribe({
      next: (data) => {
        const draft = data.draft;
        if (draft) {
          this.fillForm(draft);
        }
        this.loading.set(false);
      },
      error: (response) => {
        this.loading.set(false);
        if (response.status === 404) {
          this.loadError.set('Die Organisation wurde nicht gefunden. Bitte die Kundenübersicht neu laden.');
        } else if (response.status === 500) {
          this.loadError.set('Branding konnte nicht geladen werden. Bei neuen Organisationen muss die Konfiguration derzeit durch die Plattformverwaltung eingerichtet werden.');
        } else {
          this.loadError.set('Branding konnte nicht geladen werden. Bitte erneut versuchen.');
        }
      }
    });
  }

  fillForm(brand: Branding): void {
    if (brand.appName) this.brandingForm.controls.appName.setValue(brand.appName);
    if (brand.shortName) this.brandingForm.controls.shortName.setValue(brand.shortName);
    if (brand.primaryColor) this.brandingForm.controls.primaryColor.setValue(brand.primaryColor);
    if (brand.accentColor) this.brandingForm.controls.accentColor.setValue(brand.accentColor);
    if (brand.logo) this.brandingForm.controls.logo.setValue(brand.logo);
  }

  getContrast(): string {
    return contrastWithWhite(this.brandingForm.controls.primaryColor.value).toFixed(2);
  }

  isReadable(): boolean {
    return contrastWithWhite(this.brandingForm.controls.primaryColor.value) >= 4.5;
  }


  save(openPreview = false): void {
    const id = this.state.selectedId();
    if (id === null || this.loading() || this.saving() || this.loadError()) {
      return;
    }
    if (this.brandingForm.invalid) {
      this.brandingForm.markAllAsTouched();
      return;
    }

    const values = this.brandingForm.getRawValue();
    if (!values.appName.trim() || !values.shortName.trim()) {
      this.saveError.set('Bitte App-Name und Kurzname ausfüllen.');
      return;
    }
    const logo = values.logo.trim();
    if (logo && !/^(https?:\/\/[^\s]+|\/(?!\/)[^\s]*)$/.test(logo)) {
      this.saveError.set('Bitte eine HTTP-/HTTPS-Logo-Adresse oder einen Pfad ab / eingeben.');
      return;
    }

    const data: Branding = {
      appName: values.appName.trim(), shortName: values.shortName.trim(),
      primaryColor: values.primaryColor, accentColor: values.accentColor, logo: logo
    };
    this.saving.set(true);
    this.saved.set(false);
    this.saveError.set('');

    this.subscriptions.add(this.saasService.updateBranding(id, data).subscribe({
      next: () => {
        this.saving.set(false);
        if (id === this.state.selectedId()) {
          this.saved.set(true);
          if (openPreview) {
            this.router.navigate(['/saas/branding-preview']);
          }
        }
      },
      error: () => {
        this.saving.set(false);
        if (id === this.state.selectedId()) {
          this.saveError.set('Brandingentwurf konnte nicht gespeichert werden.');
        }
      }
    }));
  }

  openPreview(): void {
    this.save(true);
  }


  ngOnDestroy(): void {
    this.loadRequest.unsubscribe();
    this.subscriptions.unsubscribe();
  }
}
