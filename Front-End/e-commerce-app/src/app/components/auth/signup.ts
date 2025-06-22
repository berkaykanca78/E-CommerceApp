import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container animate-fade-in-up">
      <h2 class="mb-4">Sign Up</h2>
      <form (ngSubmit)="onSignup()" #signupForm="ngForm" autocomplete="off">
        <div class="mb-3">
          <label>Email</label>
          <input type="email" class="form-control" [(ngModel)]="email" name="email" required />
        </div>
        <div class="mb-3">
          <label>Password</label>
          <input type="password" class="form-control" [(ngModel)]="password" name="password" required />
        </div>
        <div *ngIf="error" class="alert alert-danger py-2">{{error}}</div>
        <button class="btn btn-primary w-100 mt-2" [disabled]="loading">{{ loading ? 'Signing up...' : 'Sign Up' }}</button>
      </form>
      <div class="mt-3 text-center">
        <a routerLink="/login">Already have an account? Login</a>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      max-width: 400px;
      margin: 60px auto;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.08);
      padding: 2.5rem 2rem 2rem 2rem;
      animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1);
    }
    .auth-container h2 {
      font-weight: 700;
      text-align: center;
    }
    .form-control:focus {
      box-shadow: 0 0 0 2px #007bff33;
      border-color: #007bff;
    }
    .btn-primary {
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    a { text-decoration: none; }
    a:hover { text-decoration: underline; }
  `]
})
export class Signup {
  email = '';
  password = '';
  error = '';
  loading = false;
  constructor(private auth: AuthService, private router: Router) {}
  onSignup() {
    this.error = '';
    this.loading = true;
    setTimeout(() => {
      if (this.auth.signup(this.email, this.password)) {
        this.router.navigate(['/profile']);
      } else {
        this.error = 'Signup failed. Try again.';
      }
      this.loading = false;
    }, 700);
  }
} 