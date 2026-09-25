import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CurrentUser } from '../models/current-user.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private readonly storageKey = 'currentUser';
  private platformId = inject(PLATFORM_ID);

  private isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  setUser(user: CurrentUser) {
    if (!this.isBrowser()) {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  getUser(): CurrentUser | null {
    if (!this.isBrowser()) {
      return null;
    }

    const user = localStorage.getItem(this.storageKey);
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }

  getFullName(): string {
    const user = this.getUser();
    if (!user) {
      return '';
    }
    return `${user.firstName} ${user.lastName}`;
  }

  clearUser() {
    if (!this.isBrowser()) {
      return;
    }

    localStorage.removeItem(this.storageKey);
  }
}
