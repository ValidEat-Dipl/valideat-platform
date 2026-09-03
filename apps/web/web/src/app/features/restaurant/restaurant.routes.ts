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
        path: 'user/result/success',
        title: 'Einlösung erfolgreich | ValidEat',
        data: { result: 'success' },
        loadComponent: () =>
          import('./user/pages/scan-result-page/scan-result-page').then(
            (module) => module.ScanResultPage,
          ),
      },
      {
        path: 'user/result/already-used',
        title: 'Bereits eingelöst | ValidEat',
        data: { result: 'already-used' },
        loadComponent: () =>
          import('./user/pages/scan-result-page/scan-result-page').then(
            (module) => module.ScanResultPage,
          ),
      },
      {
        path: 'user/result/invalid',
        title: 'Ungültiges Markerl | ValidEat',
        data: { result: 'invalid' },
        loadComponent: () =>
          import('./user/pages/scan-result-page/scan-result-page').then(
            (module) => module.ScanResultPage,
          ),
      },
      {
        path: 'user/result/wrong-location',
        title: 'Falscher Standort | ValidEat',
        data: { result: 'wrong-location' },
        loadComponent: () =>
          import('./user/pages/scan-result-page/scan-result-page').then(
            (module) => module.ScanResultPage,
          ),
      },
      {
        path: 'user/result/offline',
        title: 'Prüfung nicht möglich | ValidEat',
        data: { result: 'offline' },
        loadComponent: () =>
          import('./user/pages/scan-result-page/scan-result-page').then(
            (module) => module.ScanResultPage,
          ),
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
      
    ],
  },
];
