import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Tenant, TenantOverview } from '../models/tenant.model';
import { BrandingDraft, RulesDraft } from '../models/saas-draft.model';
import { SaasService } from './saas.service';

// Die ausgewählte Organisation und Entwürfe bleiben beim Seitenwechsel erhalten.
@Injectable()
export class SaasState implements OnDestroy {

  tenants = signal<TenantOverview[]>([]);
  selectedId = signal<number | null>(null);
  loading = signal(false);
  error = signal('');

  details = signal<Tenant | null>(null);
  detailLoading = signal(false);
  detailError = signal('');
  tenantChanged = new Subject<void>();

  branding: { [tenantId: number]: BrandingDraft } = {};
  rules: { [tenantId: number]: RulesDraft } = {};
  modules: { [tenantId: number]: string[] } = {};

  private tenantRequest?: Subscription;
  private listRequest?: Subscription;


  constructor(
    private saasService: SaasService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  get selected() {
    return this.tenants().find((tenant) => tenant.tenantId === this.selectedId());
  }

  loadTenants(): void {
    if (!isPlatformBrowser(this.platformId) || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.listRequest = this.saasService.getTenants().subscribe({

      next: (tenants) => {
        this.tenants.set(tenants);
        this.loading.set(false);

        if (!this.selected) {
          this.selectTenant(tenants[0]?.tenantId ?? null);
        }
      },

      error: () => {
        this.loading.set(false);
        this.error.set(
          'Organisationen konnten nicht geladen werden. Bitte Anmeldung und Verbindung prüfen.',
        );
      },
    });
  }

  selectTenant(tenantId: number | null): void {
    // Ein langsamer Request darf nicht die Daten des nächsten Tenants überschreiben.
    this.tenantRequest?.unsubscribe();
    this.selectedId.set(tenantId);
    this.details.set(null);
    this.detailError.set('');
    this.detailLoading.set(false);
    this.tenantChanged.next();

    if (tenantId === null || !isPlatformBrowser(this.platformId)) {
      return;
    }

    this.detailLoading.set(true);
    this.tenantRequest = this.saasService.getTenant(tenantId).subscribe({

      next: (tenant) => {
        this.details.set(tenant);
        this.detailLoading.set(false);
        this.tenantChanged.next();
      },

      error: () => {
        this.detailLoading.set(false);
        this.detailError.set(
          'Tenant-Details konnten nicht geladen werden. Bitte Organisation neu auswählen oder die Seite neu laden.',
        );
      },
    });
  }


  ngOnDestroy(): void {
    this.tenantRequest?.unsubscribe();
    this.listRequest?.unsubscribe();
    this.tenantChanged.complete();
  }
}
