import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TenantBranding } from '../../models/saas-settings.model';
import { SaasService } from '../../services/saas.service';
import { SaasState } from '../../services/saas-state.service';
import { contrastWithWhite } from '../../services/branding-colors';

@Component({
  selector: 'app-saas-branding-preview-page',
  imports: [RouterLink],
  templateUrl: './branding-preview-page.html',
  styleUrl: './branding-preview-page.scss'
})
export class SaasBrandingPreviewPage implements OnInit, OnDestroy {

  branding = signal<TenantBranding | null>(null);
  showPublished = signal(false);
  loading = signal(false);
  publishing = signal(false);
  published = signal(false);
  error = signal('');
  publishError = signal('');
  logoFailed = signal(false);

  private loadRequest = new Subscription();
  private subscriptions = new Subscription();


  constructor(public state: SaasState, private saasService: SaasService) {
  }

  ngOnInit(): void {
    this.load();
    this.subscriptions.add(this.state.tenantChanged.subscribe(() => {
      this.load();
    }));
  }

  load(clearSuccess = true): void {
    this.loadRequest.unsubscribe();
    this.branding.set(null);
    this.loading.set(false);
    this.error.set('');
    this.publishError.set('');
    this.logoFailed.set(false);
    if (clearSuccess) {
      this.published.set(false);
      this.showPublished.set(false);
    }

    const id = this.state.selectedId();
    if (id === null || !this.state.isBrowser()) {
      return;
    }
    this.loading.set(true);
    this.loadRequest = this.saasService.getBranding(id).subscribe({
      next: (data) => {
        this.branding.set(data);
        this.loading.set(false);
      },
      error: (response) => {
        this.loading.set(false);
        if (response.status === 404) {
          this.error.set('Die Organisation wurde nicht gefunden. Bitte die Kundenübersicht neu laden.');
        } else if (response.status === 500) {
          this.error.set('Branding konnte nicht geladen werden. Bei neuen Organisationen muss die Konfiguration derzeit durch die Plattformverwaltung eingerichtet werden.');
        } else {
          this.error.set('Branding konnte nicht geladen werden. Bitte erneut versuchen.');
        }
      }
    });
  }

  get brand() {
    const data = this.branding();
    if (!data) return null;
    if (this.showPublished()) return data.published;
    return data.draft;
  }

  get readable(): boolean {
    const brand = this.brand;
    if (!brand || !brand.primaryColor) return false;
    return contrastWithWhite(brand.primaryColor) >= 4.5;
  }

  changeView(published: boolean): void {
    this.showPublished.set(published);
    this.logoFailed.set(false);
  }


  publish(): void {
    const id = this.state.selectedId();
    const data = this.branding();
    if (id === null || !data || this.loading() || this.publishing() || this.error()) {
      return;
    }
    const draft = data.draft;
    if (!draft || !draft.appName || !draft.shortName || !draft.primaryColor || !draft.accentColor) {
      this.publishError.set('Bitte zuerst einen vollständigen Brandingentwurf speichern.');
      return;
    }

    this.publishing.set(true);
    this.published.set(false);
    this.publishError.set('');
    this.subscriptions.add(this.saasService.publishBranding(id).subscribe({
      next: () => {
        this.publishing.set(false);
        if (id === this.state.selectedId()) {
          this.published.set(true);
          this.showPublished.set(true);
          this.load(false);
        }
      },
      error: () => {
        this.publishing.set(false);
        if (id === this.state.selectedId()) {
          this.publishError.set('Branding konnte nicht veröffentlicht werden.');
        }
      }
    }));
  }


  ngOnDestroy(): void {
    this.loadRequest.unsubscribe();
    this.subscriptions.unsubscribe();
  }
}
