import { Component, inject, signal, OnInit } from '@angular/core';
import { Category, Product } from '../../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product as ProductService } from '../../services/product';
import { Category as CategoryService } from '../../services/category';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  currentPage = 1;
  pageSize = 4;
  totalPages = 1;
  hasNextPage = false;
  hasPreviousPage = false;
  searchTerm = '';
  private searchSubject = new Subject<string>();
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);

  ngOnInit() {
    this.setupSearch();
    this.loadProducts();
    this.loadCategories();
  }

  private setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.currentPage = 1; 
      this.loadProducts();
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getProducts(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe(response => {
        if (response && response.items["$values"]) {
          this.products.set(response.items["$values"]);
          this.totalPages = response.totalPages;
          this.hasNextPage = response.hasNextPage;
          this.hasPreviousPage = response.hasPreviousPage;
        }
      });
  }

  private loadCategories() {
    this.categoryService.getCategories(this.currentPage, this.pageSize)
      .subscribe(response => {
        if (response && response["$values"]) {
          this.categories.set(response["$values"].slice(0, 4));
        }
      });
  }

  trackByProductId(index: number, product: any): number {
    return product.id;
  }

  trackByCategoryId(index: number, category: any): number {
    return category.id;
  }
}
