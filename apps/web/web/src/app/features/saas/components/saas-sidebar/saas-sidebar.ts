import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CurrentUserService } from '../../../admin/services/current-user-service';

@Component({
  selector: 'app-saas-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './saas-sidebar.html',
  styleUrl: './saas-sidebar.scss',
})
export class SaasSidebar {

  currentUserService = inject(CurrentUserService);
  private router = inject(Router);

  links = [
    { path: 'setup', label: 'Setup', icon: 'check2' },
    { path: 'dashboard', label: 'Dashboard', icon: 'bar-chart' },
    { path: 'modules', label: 'Module', icon: 'stack' },
    { path: 'organization', label: 'Organisation & Regeln', icon: 'buildings' },
    { path: 'branding', label: 'Branding', icon: 'palette' },
    { path: 'customers', label: 'Kundenübersicht', icon: 'building' },
    { path: 'user-assignment', label: 'Nutzer zuweisen', icon: 'person-plus' }
  ];

  logout(): void {

    this.currentUserService.clearUser();

    this.router.navigate(['/saas/login']);

  }

}