import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product, Category } from './models';
import { signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { Product as ProductService } from './services/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'e-commerce-app';
  private readonly titleService = inject(Title);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  searchQuery: string = '';
  public products = signal<Product[]>([]);
  public categories = signal<Category[]>([]);
  currentYear = new Date().getFullYear();

  ngOnInit() {
    this.setupTitleChange();
  }

  private setupTitleChange() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const title = this.getPageTitle();
      this.titleService.setTitle(title);
    });
  }

  private getPageTitle(): string {
    const path = this.router.url.split('/')[1];
    return path ? `${path.charAt(0).toUpperCase() + path.slice(1)} - E-Commerce Store` : 'E-Commerce Store';
  }

  searchProducts(): void {
    const query = this.searchQuery.trim();
    if (query) {
      this.productService.searchProducts(query).subscribe({
        next: (products) => {
          if (products && products["$values"].length > 0) {
            console.log('Search Products:', products["$values"]);
            this.products.set(products["$values"]);
            this.router.navigate(['/products'], { queryParams: { search: query } });
          }
        },
        error: (error) => {
          console.error('Error searching products:', error);
        }
      });
    } else {
      this.router.navigate(['/products']);
    }
  }
}
