import { Service, inject } from '@angular/core';
import { WINDOW } from './tokens/window.token';

@Service()
export class StorageService {
  private readonly window = inject(WINDOW);

  get(key: string): any {
    if (this.window?.localStorage) {
      const data = this.window?.localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
  }

  set(key: string, value: any): void {
    if (this.window?.localStorage) {
      this.window?.localStorage.setItem(key, JSON.stringify(value));
    }
  }
}
