import { Routes } from '@angular/router';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/employee-layout/employee-layout').then((module) => module.EmployeeLayout),
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      { path: 'welcome', title: 'Willkommen | ValidEat',
        loadComponent: () =>
          import('./pages/welcome-page/welcome-page').then((module) => module.WelcomePage),
      },
    ],
  },
];
