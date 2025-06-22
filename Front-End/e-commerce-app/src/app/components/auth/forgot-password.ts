import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container animate-fade-in-up">
      <h2 class="mb-4">Forgot Password</h2>
      <form (ngSubmit)="onSubmit()" #forgotForm="ngForm" autocomplete="off">
        <div class="mb-3">
          <label>Email</label>
          <input type="email" class="form-control" [(ngModel)]="email" name="email" required />
        </div>
        <div *ngIf="success" class="alert alert-success py-2">{{success}}</div>
        <div *ngIf="error" class="alert alert-danger py-2">{{error}}</div>
        <button class="btn btn-primary w-100 mt-2" [disabled]="loading">{{ loading ? 'Sending...' : 'Send Reset Link' }}</button>
      </form>
      <div class="mt-3 text-center">
        <a routerLink="/login">Back to Login</a>
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
export class ForgotPassword {
  email = '';
  error = '';
  success = '';
  loading = false;
  constructor(private router: Router) {}
  onSubmit() {
    this.error = '';
    this.success = '';
    this.loading = true;
    setTimeout(() => {
      if (this.email) {
        this.success = 'If this email exists, a reset link has been sent.';
      } else {
        this.error = 'Please enter your email.';
      }
      this.loading = false;
    }, 900);
  }
} 