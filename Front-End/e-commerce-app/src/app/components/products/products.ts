import { Component, inject, OnInit, signal, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../shared/pagination/pagination.';
import { Product } from '../../services/data.service';
import { Product as ProductService } from '../../services/product';
import { ActivatedRoute } from '@angular/router';
import { App } from '../../app';

@Component({
  selector: 'app-products',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit, OnChanges {
  searchTerm: string = '';
  products = signal<Product[]>([]);
  currentPage = 1;
  pageSize = 4;
  totalItems = 0;
  totalPages = 0;
  hasNextPage = false;
  hasPreviousPage = false;
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly app = inject(App);

  ngOnInit() {
    console.log(this.route.queryParams);
    // Check if there's a search query parameter
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['search'];
      if (searchQuery) {
        this.searchTerm = searchQuery;
        this.searchProducts(searchQuery);
      } else {
        this.loadProducts();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm']) {
      console.log('Search Term:', this.searchTerm);
      if (this.searchTerm) {
        this.products.set(this.app.products());
      } else {
        this.loadProducts();
      }
    }
  }

  private loadProducts(): void {
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        if (response && response.items["$values"]) {
          this.products.set(response.items["$values"]);
          this.totalPages = response.totalPages;
          this.hasNextPage = response.hasNextPage;
          this.hasPreviousPage = response.hasPreviousPage;
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  private searchProducts(query: string): void {
    this.productService.searchProducts(query).subscribe({
      next: (response) => {
        if (response && response.data["$values"]) {
          this.products.set(response.data["$values"]);
          this.totalItems = response.data["$values"].length;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          this.hasNextPage = this.currentPage < this.totalPages;
          this.hasPreviousPage = this.currentPage > 1;
        }
      },
      error: (error) => {
        console.error('Error searching products:', error);
      }
    });
  }

  trackByProductId = (index: number, product: Product): number => {
    return product.id;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    if (this.searchTerm) {
      this.searchProducts(this.searchTerm);
    } else {
      this.loadProducts();
    }
  }
}
