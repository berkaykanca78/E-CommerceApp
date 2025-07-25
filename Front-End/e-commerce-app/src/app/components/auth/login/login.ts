import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
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