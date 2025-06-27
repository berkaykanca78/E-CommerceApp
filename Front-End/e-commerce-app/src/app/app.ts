import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product, Category } from './models';
import { signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { Product as ProductService } from './services/product';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CartItem, Cart as CartService } from './services/cart';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  protected title = 'e-commerce-app';
  private readonly titleService = inject(Title);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private searchSubject = new Subject<string>();
  searchQuery: string = '';
  public products = signal<Product[]>([]);
  public categories = signal<Category[]>([]);
  currentYear = new Date().getFullYear();
  cartCount: number = 0;
  cartItems: CartItem[] = [];
  showCartPopover: boolean = false;
  isAuthenticated = false;
  user: any = null;


  ngOnInit() {
    this.setupTitleChange();
    this.setupSearch();
    this.getCartInfo();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.user = this.authService.getUser();
  }

  private getCartInfo() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  toggleCartPopover() {
    this.showCartPopover = !this.showCartPopover;
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  private setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchQuery = query;
      if (query.trim()) {
        this.searchProducts();
      } else {
        this.products.set([]);
        this.router.navigate(['/products']);
      }
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
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
          if (products && products["$values"]) {
            const validProducts = products["$values"].filter((product: Product & { $ref?: string }) => 
              product && 
              product.name && 
              !product.$ref && 
              product.name.toLowerCase().includes(query.toLowerCase())
            );
            this.products.set(validProducts);
            this.router.navigate(['/products'], { queryParams: { search: query } });
          } else {
            this.products.set([]);
          }
        },
        error: (error) => {
          console.error('Error searching products:', error);
          this.products.set([]);
        }
      });
    } else {
      this.products.set([]);
      this.router.navigate(['/products']);
    }
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.user = null;
  }

  ngAfterViewInit() {}
}
