import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private data = new Map<string, any>();

  get(key: string) {
    return this.data.get(key);
  }

  set(key: string, value: any) {
    this.data.set(key, value);
  }
}
