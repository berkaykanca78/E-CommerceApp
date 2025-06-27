import { Component, Input, effect } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Cart } from '../../../services/cart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  searchQuery: string = '';
  cartCount: number = 0;

  constructor(private router: Router, private cart: Cart) {
    this.cart.cartCount$.subscribe(count => this.cartCount = count);
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery = value;
    if (value.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: value } });
    } else {
      this.router.navigate(['/products']);
    }
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }

  closeNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }
}
