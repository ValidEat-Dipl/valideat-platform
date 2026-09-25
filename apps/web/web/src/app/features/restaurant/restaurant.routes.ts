import { Routes } from '@angular/router';

export const RESTAURANT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/restaurant-layout/restaurant-layout').then(
        (module) => module.RestaurantLayout,
      ),
    children: [
      { path: '', redirectTo: 'user/login', pathMatch: 'full' },
      {
        path: 'user/login',
        title: 'Restaurant Login | ValidEat',
        loadComponent: () =>
          import('./user/pages/login-page/restaurant-user-login-page').then(
            (module) => module.RestaurantUserLoginPage,
          ),
      },
      {
        path: 'user/select',
        redirectTo: 'user/overview',
        pathMatch: 'full',
      },
      {
        path: 'user/overview',
        title: 'Restaurant Übersicht | ValidEat',
        loadComponent: () =>
          import('./user/pages/overview-page/restaurant-user-overview-page').then(
            (module) => module.RestaurantUserOverviewPage,
          ),
      },
      {
        path: 'user/scan',
        title: 'QR-Code scannen | ValidEat',
        loadComponent: () =>
          import('./user/pages/scan-page/scan-page').then((module) => module.ScanPage),
      },
      {
        path: 'user/history',
        title: 'Einlösungsverlauf | ValidEat',
        loadComponent: () =>
          import('./user/pages/history-page/history-page').then((module) => module.HistoryPage),
      },
      {
        path: 'user/history/detail/:id',
        title: 'Einlösungsdetail | ValidEat',
        loadComponent: () =>
          import('./user/pages/detail-page/detail-page').then((module) => module.DetailPage),
      },
      {
        path: 'admin/overview',
        title: 'Restaurant Admin Übersicht | ValidEat',
        loadComponent: () =>
          import('./admin/pages/overview-page/restaurant-admin-overview-page').then(
            (module) => module.RestaurantAdminOverviewPage,
          ),
      },
      {
        path: 'admin/tickets',
        title: 'Restaurant Einlösungen | ValidEat',
        loadComponent: () =>
          import('./admin/pages/tickets-page/restaurant-admin-tickets-page').then(
            (module) => module.RestaurantAdminTicketsPage,
          ),
      },
      {
        path: 'admin/billing',
        title: 'Restaurant Abrechnung | ValidEat',
        loadComponent: () =>
          import('./admin/pages/billing-page/restaurant-admin-billing-page').then(
            (module) => module.RestaurantAdminBillingPage,
          ),
      },
      {
        path: 'admin/settings',
        title: 'Restaurant Einstellungen | ValidEat',
        loadComponent: () =>
          import('./admin/pages/settings-page/restaurant-admin-settings-page').then(
            (module) => module.RestaurantAdminSettingsPage,
          ),
      },
    ],
  },
];
