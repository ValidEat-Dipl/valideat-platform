import { Injectable } from '@angular/core';
import { CurrentUser } from '../models/current-user.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private readonly storageKey = 'currentUser';

  setUser(user: CurrentUser) {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  getUser(): CurrentUser | null {
    if (typeof localStorage === 'undefined') {
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
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.removeItem(this.storageKey);
  }
}
