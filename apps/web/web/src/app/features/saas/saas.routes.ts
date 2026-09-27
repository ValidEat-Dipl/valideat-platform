import { Routes } from '@angular/router';
import { saasGuard } from './saas.guard';

export const SAAS_ROUTES: Routes = [
  {
    path: 'login',
    title: 'SaaS Anmeldung | ValidEat',
    loadComponent: () =>
      import('./pages/login-page/login-page').then((module) => module.SaasLoginPage),
  },
  {
    path: 'register',
    title: 'Organisation registrieren | ValidEat',
    loadComponent: () =>
      import('./pages/register-page/register-page').then((module) => module.SaasRegisterPage),
  },
  {
    path: '',
    canActivate: [saasGuard],
    canActivateChild: [saasGuard],
    loadComponent: () =>
      import('./layout/saas-layout/saas-layout').then((module) => module.SaasLayout),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'setup',
        title: 'Setup | ValidEat',
        loadComponent: () =>
          import('./pages/setup-page/setup-page').then((module) => module.SaasSetupPage),
      },
      {
        path: 'dashboard',
        title: 'SaaS Dashboard | ValidEat',
        loadComponent: () =>
          import('./pages/dashboard-page/dashboard-page').then(
            (module) => module.SaasDashboardPage,
          ),
      },
      {
        path: 'modules',
        title: 'Module | ValidEat',
        loadComponent: () =>
          import('./pages/modules-page/modules-page').then((module) => module.SaasModulesPage),
      },
      {
        path: 'organization',
        title: 'Organisation und Regeln | ValidEat',
        loadComponent: () =>
          import('./pages/organization-page/organization-page').then(
            (module) => module.SaasOrganizationPage,
          ),
      },
      {
        path: 'branding',
        title: 'Branding | ValidEat',
        loadComponent: () =>
          import('./pages/branding-page/branding-page').then((module) => module.SaasBrandingPage),
      },
      {
        path: 'branding-preview',
        title: 'Branding Vorschau | ValidEat',
        loadComponent: () =>
          import('./pages/branding-preview-page/branding-preview-page').then(
            (module) => module.SaasBrandingPreviewPage,
          ),
      },
      {
        path: 'customers',
        title: 'Kundenübersicht | ValidEat',
        loadComponent: () =>
          import('./pages/customers-page/customers-page').then(
            (module) => module.SaasCustomersPage,
          ),
      },
      {
        path: 'user-assignment',
        title: 'Nutzer zuweisen | ValidEat',
        loadComponent: () =>
          import('./pages/user-assignment-page/user-assignment-page').then(
            (module) => module.SaasUserAssignmentPage,
          ),
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
