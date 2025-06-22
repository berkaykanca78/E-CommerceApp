import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    // Demo: Accept any email/password
    if (email && password) {
      localStorage.setItem(this.TOKEN_KEY, 'demo-token');
      localStorage.setItem(this.USER_KEY, JSON.stringify({ email }));
      return true;
    }
    return false;
  }

  signup(email: string, password: string): boolean {
    // Demo: Accept any signup
    if (email && password) {
      localStorage.setItem(this.TOKEN_KEY, 'demo-token');
      localStorage.setItem(this.USER_KEY, JSON.stringify({ email }));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
} 