import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/login') || req.url.includes('/register')) {
    return next(req);
  }

  const platformId = inject(PLATFORM_ID);

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
