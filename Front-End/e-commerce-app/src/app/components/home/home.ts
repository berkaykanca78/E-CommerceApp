import { ChangeDetectorRef, Component, inject, signal, OnInit } from '@angular/core';
import { Category, Product } from '../../services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { PaginationComponent } from '../shared/pagination/pagination.';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, PaginationComponent],
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
  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.loadProducts();
    });
  }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
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
        if (response && response.items.length > 0) {
          this.products.set(response.items);
        }
        this.totalPages = response.totalPages;
        this.hasNextPage = response.hasNextPage;
        this.hasPreviousPage = response.hasPreviousPage;
      });
  }

  private loadCategories() {
    this.categoryService.getCategories(this.currentPage, this.pageSize)
      .subscribe(response => {
        if (response && response.items.length > 0) {
          this.categories.set(response.items);
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
