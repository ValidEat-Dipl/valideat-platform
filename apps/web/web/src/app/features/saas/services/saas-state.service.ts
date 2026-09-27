import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { TenantOverview } from '../models/tenant.model';
import { SaasService } from './saas.service';

// Die ausgewählte Organisation bleibt beim Seitenwechsel erhalten.
@Injectable()
export class SaasState implements OnDestroy {

  tenants = signal<TenantOverview[]>([]);
  selectedId = signal<number | null>(null);
  loading = signal(false);
  error = signal('');
  tenantChanged = new Subject<void>();

  private listRequest = new Subscription();


  constructor(
    private saasService: SaasService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get selected() {
    return this.tenants().find((tenant) => tenant.tenantId === this.selectedId());
  }


  loadTenants(): void {
    if (!this.isBrowser() || this.loading()) {
      return;
    }
    this.loading.set(true);
    this.error.set('');

    this.listRequest = this.saasService.getTenants().subscribe({
      next: (tenants) => {
        this.tenants.set(tenants);
        this.loading.set(false);
        if (!this.selected) {
          if (tenants.length > 0) {
            this.selectTenant(tenants[0].tenantId);
          } else {
            this.selectTenant(null);
          }
        }
      },
      error: (response) => {
        this.loading.set(false);
        if (response.status === 401) {
          this.error.set('Ihre Anmeldung ist abgelaufen oder ungültig. Bitte erneut als SaaS-Admin anmelden.');
        } else if (response.status === 403) {
          this.error.set('Für diesen Bereich fehlt die SaaS-Admin-Berechtigung.');
        } else {
          this.error.set('Organisationen konnten nicht geladen werden. Bitte Verbindung prüfen.');
        }
      }
    });
  }

  selectTenant(tenantId: number | null): void {
    this.selectedId.set(tenantId);
    this.tenantChanged.next();
  }


  ngOnDestroy(): void {
    this.listRequest.unsubscribe();
    this.tenantChanged.complete();
  }
}
