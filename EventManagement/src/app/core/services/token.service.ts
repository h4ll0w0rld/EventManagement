import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private TOKEN_KEY = 'jwtToken';

  save(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  get(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  clear(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
