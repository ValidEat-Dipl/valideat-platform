import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UnassignedEmployee } from '../../models/saas-settings.model';
import { SaasService } from '../../services/saas.service';
import { SaasState } from '../../services/saas-state.service';

@Component({
  selector: 'app-saas-user-assignment-page',
  imports: [FormsModule],
  templateUrl: './user-assignment-page.html',
  styleUrl: './user-assignment-page.scss'
})
export class SaasUserAssignmentPage implements OnInit, OnDestroy {

  users = signal<UnassignedEmployee[]>([]);
  selectedUser: number | null = null;
  loading = signal(false);
  saving = signal(false);
  loadError = signal('');
  error = signal('');
  success = signal('');

  private loadRequest = new Subscription();
  private subscriptions = new Subscription();


  constructor(public state: SaasState, private saasService: SaasService) {
  }

  ngOnInit(): void {
    this.load();
    this.subscriptions.add(this.state.tenantChanged.subscribe(() => {
      this.success.set('');
      this.error.set('');
    }));
  }


  load(): void {
    if (!this.state.isBrowser() || this.saving()) {
      return;
    }
    this.loadRequest.unsubscribe();
    this.loading.set(true);
    this.loadError.set('');
    this.selectedUser = null;
    this.users.set([]);

    this.loadRequest = this.saasService.getUnassignedEmployees().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.loadError.set('Unzugewiesene Nutzer konnten nicht geladen werden.');
      }
    });
  }


  assign(): void {
    const tenant = this.state.selected;
    const userId = this.selectedUser;
    if (!tenant || userId === null || this.loading() || this.saving() || this.loadError()) {
      return;
    }
    const user = this.users().find((item) => item.id === userId);
    if (!user) {
      return;
    }

    this.saving.set(true);
    this.error.set('');
    this.success.set('');

    this.subscriptions.add(this.saasService.assignEmployee(tenant.tenantId, userId).subscribe({
      next: () => {
        this.saving.set(false);
        this.users.set(this.users().filter((item) => item.id !== userId));
        this.selectedUser = null;
        this.success.set(user.firstname + ' ' + user.lastname + ' wurde ' + tenant.tenantName + ' zugewiesen.');
        this.state.loadTenants();
      },
      error: (response) => {
        this.saving.set(false);
        if (response.status === 409) {
          this.error.set('Der Nutzer wurde bereits zugeordnet. Die Liste wird neu geladen.');
          this.load();
        } else if (response.status === 404) {
          this.error.set('Nutzer oder Organisation nicht mehr vorhanden. Bitte die Listen aktualisieren.');
          this.load();
          this.state.loadTenants();
        } else if (response.status === 401) {
          this.error.set('Bitte erneut als SaaS-Admin anmelden.');
        } else if (response.status === 403) {
          this.error.set('Für die Zuweisung fehlt die SaaS-Admin-Berechtigung.');
        } else {
          this.error.set('Zuweisung fehlgeschlagen. Bitte die Liste neu laden und erneut versuchen.');
        }
      }
    }));
  }


  ngOnDestroy(): void {
    this.loadRequest.unsubscribe();
    this.subscriptions.unsubscribe();
  }
}
