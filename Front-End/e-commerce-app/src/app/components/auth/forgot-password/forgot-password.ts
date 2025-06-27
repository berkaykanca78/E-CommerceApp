import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss']
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