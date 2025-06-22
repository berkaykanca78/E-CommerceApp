import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  tab: string = 'home';
  datasOpen = false;
  componentsOpen = false;

  setTab(tab: string, event?: Event) {
    if (event) event.stopPropagation();
    this.tab = tab;
  }

  toggleDropdown(which: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (which === 'datas') {
      this.datasOpen = !this.datasOpen;
      this.componentsOpen = false;
    } else if (which === 'components') {
      this.componentsOpen = !this.componentsOpen;
      this.datasOpen = false;
    }
  }

  stats = [
    { icon: 'fas fa-shopping-basket text-primary', value: 23, label: 'Orders', color: 'text-primary' },
    { icon: 'fas fa-wallet text-success', value: '$1,250', label: 'Total Spent', color: 'text-success' },
    { icon: 'fas fa-heart text-danger', value: 8, label: 'Favorites', color: 'text-danger' },
    { icon: 'fas fa-clock text-warning', value: 'Today', label: 'Last Login', color: 'text-warning' }
  ];
  demoProducts = [
    { name: 'Headphones', price: 199.99, category: 'Electronics' },
    { name: 'Fitness Watch', price: 299.99, category: 'Electronics' },
    { name: 'T-shirt', price: 29.99, category: 'Fashion' }
  ];
  demoCategories = [
    { name: 'Electronics', description: 'Devices and gadgets' },
    { name: 'Fashion', description: 'Clothing and accessories' }
  ];
  sidebarCollapsed = false;
  toggleSidebar() { this.sidebarCollapsed = !this.sidebarCollapsed; }
} 