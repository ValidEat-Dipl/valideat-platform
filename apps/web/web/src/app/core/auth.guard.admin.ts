import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (state.url.startsWith('/employee') || state.url.startsWith('/restaurant')) {
    return true;
  }

  const currentUser = localStorage.getItem('currentUser');

  if (currentUser) {
    return true;
  }

  return router.parseUrl('/login');
};

