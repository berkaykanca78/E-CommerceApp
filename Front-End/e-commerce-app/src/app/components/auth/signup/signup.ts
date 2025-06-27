import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
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