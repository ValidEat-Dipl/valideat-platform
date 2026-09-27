import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserService } from '../admin/services/current-user-service';

export const saasGuard: CanActivateFn = () => {

  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);


  if (!isPlatformBrowser(platformId)) {

    return false;
  }


  const currentUserService = inject(CurrentUserService);
  const user = currentUserService.getUser();


  if (user && user.role === 'SAAS_ADMIN' && user.token) {

    return true;
  }


  return router.createUrlTree(['/saas/login']);
};