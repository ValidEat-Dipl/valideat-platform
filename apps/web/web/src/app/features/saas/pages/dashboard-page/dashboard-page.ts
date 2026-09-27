import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TenantModule } from '../../models/saas-settings.model';
import { SaasService } from '../../services/saas.service';
import { SaasState } from '../../services/saas-state.service';

@Component({
  selector: 'app-saas-dashboard-page',
  imports: [RouterLink],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class SaasDashboardPage implements OnInit, OnDestroy {

  modules = signal<TenantModule[]>([]);
  loading = signal(false);
  error = signal('');

  private loadRequest = new Subscription();
  private tenantSubscription = new Subscription();


  constructor(public state: SaasState, private saasService: SaasService) {
  }

  ngOnInit(): void {
    this.loadModules();
    this.tenantSubscription = this.state.tenantChanged.subscribe(() => {
      this.loadModules();
    });
  }


  loadModules(): void {
    this.loadRequest.unsubscribe();
    this.modules.set([]);
    this.error.set('');
    this.loading.set(false);
    const id = this.state.selectedId();
    if (id === null || !this.state.isBrowser()) {
      return;
    }

    this.loading.set(true);
    this.loadRequest = this.saasService.getModules(id).subscribe({
      next: (data) => {
        this.modules.set(data.filter((module) => module.enabled));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Modulauswahl konnte nicht geladen werden.');
      }
    });
  }

  moduleName(name: string): string {
    if (name === 'EMPLOYEE_APP') return 'Mitarbeiter-App';
    if (name === 'HR_ADMIN') return 'HR / Admin';
    if (name === 'CLEARING') return 'Clearing';
    if (name === 'RESTAURANT') return 'Restaurant';
    if (name === 'BRANDING') return 'Branding';
    if (name === 'REPORTING_EXPORT') return 'Reporting & Export';
    return name;
  }


  ngOnDestroy(): void {
    this.loadRequest.unsubscribe();
    this.tenantSubscription.unsubscribe();
  }
}
