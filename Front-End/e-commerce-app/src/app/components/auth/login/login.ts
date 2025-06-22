import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
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
export class Login {
  email = '';
  password = '';
  error = '';
  loading = false;
  constructor(private auth: AuthService, private router: Router) {}
  onLogin() {
    this.error = '';
    this.loading = true;
    setTimeout(() => {
      if (this.auth.login(this.email, this.password)) {
        this.router.navigate(['/profile']);
      } else {
        this.error = 'Invalid email or password';
      }
      this.loading = false;
    }, 700);
  }
} 