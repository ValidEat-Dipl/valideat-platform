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
    ],
  },
];
