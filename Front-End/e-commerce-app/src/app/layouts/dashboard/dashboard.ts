import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { Alerts } from '../../components/shared/alerts/alerts';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, RouterLink, Alerts],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  tab: string = 'home';
  datasOpen = false;
  componentsOpen = false;
  sidebarCollapsed = false;
  mobileMenuOpen = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  setTab(tab: string, event?: Event) {
    if (event) event.stopPropagation();
    this.tab = tab;
    // Close mobile menu when navigating on mobile
    if (this.isMobile) {
      this.closeMobileMenu();
    }
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

  toggleSidebar() { 
    if (this.isMobile) {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    } else {
      this.sidebarCollapsed = !this.sidebarCollapsed; 
    }
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  get isMobile() {
    return window.innerWidth <= 768;
  }

  // E-commerce Dashboard Stats
  stats = [
    { icon: 'fas fa-shopping-cart', value: 156, label: 'Total Orders', color: '#3b82f6' },
    { icon: 'fas fa-box', value: 89, label: 'Products', color: '#10b981' },
    { icon: 'fas fa-users', value: 1247, label: 'Customers', color: '#f59e0b' },
    { icon: 'fas fa-chart-line', value: '$12,450', label: 'Revenue', color: '#ef4444' }
  ];

  // Component Categories for Tools section
  componentCategories = [
    {
      name: 'UI Components',
      items: [
        { name: 'Alerts', icon: 'fas fa-bell', route: '/dashboard/alert-demo' },
        { name: 'Modals', icon: 'fas fa-window-restore', route: '/dashboard/modal-demo' },
        { name: 'Cards', icon: 'fas fa-credit-card', route: '/dashboard/cards-demo' }
      ]
    },
    {
      name: 'Data Components',
      items: [
        { name: 'Tables', icon: 'fas fa-table', route: '/dashboard/tables-demo' },
        { name: 'Charts', icon: 'fas fa-chart-line', route: '/dashboard/charts-demo' },
        { name: 'Data Grid', icon: 'fas fa-ellipsis-h', route: '/dashboard/data-grid-demo' }
      ]
    },
    {
      name: 'Form Components',
      items: [
        { name: 'Forms', icon: 'fas fa-edit', route: '/dashboard/forms-demo' },
        { name: 'File Upload', icon: 'fas fa-upload', route: '/dashboard/upload-demo' }
      ]
    },
    {
      name: 'Media Components',
      items: [
        { name: 'Gallery', icon: 'fas fa-images', route: '/dashboard/gallery-demo' }
      ]
    }
  ];

  // Sample demo data for components
  demoProducts = [
    { id: 1, name: 'Wireless Headphones', price: 199.99, category: 'Electronics', stock: 45 },
    { id: 2, name: 'Smart Watch', price: 299.99, category: 'Electronics', stock: 23 },
    { id: 3, name: 'Cotton T-Shirt', price: 29.99, category: 'Fashion', stock: 156 },
    { id: 4, name: 'Running Shoes', price: 89.99, category: 'Sports', stock: 67 }
  ];

  demoCategories = [
    { id: 1, name: 'Electronics', description: 'Digital devices and gadgets', productCount: 45 },
    { id: 2, name: 'Fashion', description: 'Clothing and accessories', productCount: 123 },
    { id: 3, name: 'Sports', description: 'Sports and fitness equipment', productCount: 78 },
    { id: 4, name: 'Home & Garden', description: 'Home improvement and garden supplies', productCount: 92 }
  ];
} 