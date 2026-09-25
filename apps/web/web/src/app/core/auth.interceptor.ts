import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof localStorage === 'undefined') {
    return next(req);
  }

  const user = localStorage.getItem('currentUser');

  try {
    if (user) {
      const currentUser = JSON.parse(user);

      if (currentUser.token) {

        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });

      }
    }
  } catch {
    localStorage.removeItem('currentUser');
  }

  return next(req);
};
/*
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // Auf dem SSR-Server gibt es kein Browser-localStorage
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const user = localStorage.getItem('currentUser');

  try {
    if (user) {
      const currentUser = JSON.parse(user);

      if (currentUser.token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      }
    }
  } catch {
    localStorage.removeItem('currentUser');
  }

  return next(req);
};
*/
