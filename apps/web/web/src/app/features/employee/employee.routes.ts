import { Routes } from '@angular/router';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/employee-layout/employee-layout').then((module) => module.EmployeeLayout),
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      {
        path: 'welcome',
        title: 'Willkommen | ValidEat',
        loadComponent: () =>
          import('./pages/welcome-page/welcome-page').then((module) => module.WelcomePage),
      },
      {
        path: 'login',
        title: 'Anmelden | ValidEat',
        loadComponent: () =>
          import('./pages/login-page/login-page').then((module) => module.LoginPage),
      },
      {
        path: 'register',
        title: 'Registrieren | ValidEat',
        loadComponent: () =>
          import('./pages/register-page/register-page').then((module) => module.RegisterPage),
      },
      {
        path: 'start',
        title: 'Start | ValidEat',
        loadComponent: () =>
          import('./pages/start-page/start-page').then((module) => module.StartPage),
      },
      {
        path: 'create',
        title: 'Verwendung erfassen | ValidEat',
        loadComponent: () =>
          import('./pages/create-entry-page/create-entry-page').then(
            (module) => module.CreateEntryPage,
          ),
      },
      {
        path: 'review',
        title: 'Angaben prüfen | ValidEat',
        loadComponent: () =>
          import('./pages/review-entry-page/review-entry-page').then(
            (module) => module.ReviewEntryPage,
          ),
      },
      {
        path: 'success',
        title: 'Erfasst | ValidEat',
        loadComponent: () =>
          import('./pages/entry-success-page/entry-success-page').then(
            (module) => module.EntrySuccessPage,
          ),
      },
      {
        path: 'entries',
        title: 'Meine Erfassungen | ValidEat',
        loadComponent: () =>
          import('./pages/entries-page/entries-page').then((module) => module.EntriesPage),
      },
      {
        path: 'entries/:id/edit',
        title: 'Erfassung bearbeiten | ValidEat',
        loadComponent: () =>
          import('./pages/edit-entry-page/edit-entry-page').then((module) => module.EditEntryPage),
      },
      {
        path: 'entries/:id',
        title: 'Erfassungsdetails | ValidEat',
        loadComponent: () =>
          import('./pages/entry-detail-page/entry-detail-page').then(
            (module) => module.EntryDetailPage,
          ),
      },
    ],
  },
];
