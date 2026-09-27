import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TenantModule } from '../../models/saas-settings.model';
import { SaasService } from '../../services/saas.service';
import { SaasState } from '../../services/saas-state.service';

@Component({
  selector: 'app-saas-modules-page',
  imports: [FormsModule],
  templateUrl: './modules-page.html',
  styleUrl: './modules-page.scss'
})
export class SaasModulesPage implements OnInit, OnDestroy {

  modules = signal<TenantModule[]>([]);
  loading = signal(false);
  saving = signal(false);
  loadError = signal('');
  saveError = signal('');
  saved = signal(false);

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

  load(): void {
    this.loadRequest.unsubscribe();
    this.modules.set([]);
    this.loadError.set('');
    this.saveError.set('');
    this.saved.set(false);
    this.loading.set(false);

    const id = this.state.selectedId();
    if (id === null || !this.state.isBrowser()) {
      return;
    }

    this.loading.set(true);
    this.loadRequest = this.saasService.getModules(id).subscribe({
      next: (data) => {
        this.modules.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.loadError.set('Module konnten nicht geladen werden.');
      }
    });
  }


  save(): void {
    const id = this.state.selectedId();
    if (id === null || this.loading() || this.saving() || this.loadError()) {
      return;
    }

    const moduleIds: number[] = [];
    for (const module of this.modules()) {
      if (module.enabled) {
        moduleIds.push(module.id);
      }
    }

    this.saving.set(true);
    this.saved.set(false);
    this.saveError.set('');
    this.subscriptions.add(this.saasService.updateModules(id, moduleIds).subscribe({
      next: () => {
        this.saving.set(false);
        if (id === this.state.selectedId()) {
          this.saved.set(true);
        }
      },
      error: () => {
        this.saving.set(false);
        if (id === this.state.selectedId()) {
          this.saveError.set('Module konnten nicht gespeichert werden. Bitte erneut versuchen.');
        }
      }
    }));
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
    this.subscriptions.unsubscribe();
  }
}
