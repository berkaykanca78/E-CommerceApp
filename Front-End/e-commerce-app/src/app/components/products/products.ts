import { Component, inject, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services';
import { ProductService } from '../../services/product.service';
import { PaginationComponent } from '../shared/pagination/pagination.';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  products = signal<Product[]>([]);
  currentPage = 1;
  pageSize = 4;
  totalPages = 1;
  hasNextPage = false;
  hasPreviousPage = false;
  searchTerm = '';
  private readonly productService = inject(ProductService);
  private readonly cdr = inject(ChangeDetectorRef);
  private searchSubject = new Subject<string>();


  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProducts(this.currentPage, this.pageSize, this.searchTerm)
    .subscribe(response => {
      if (response && response.items.length > 0) {
        this.products.set(response.items);
      }
      this.totalPages = response.totalPages;
      this.hasNextPage = response.hasNextPage;
      this.hasPreviousPage = response.hasPreviousPage;
    });
  }

  trackByProductId = (index: number, product: Product): number => {
    return product.id;
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }
}
