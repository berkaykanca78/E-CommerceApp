import { Component, inject, OnInit, signal, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../shared/pagination/pagination';
import { Product, Category } from '../../models';
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
  categories = signal<Category[]>([]);
  selectedCategory: number | null = null;
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
    this.loadProducts();
    this.loadCategories();
    this.setupRatingRange();
    // Check if there's a search query parameter
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['search'];
      const categoryId = params['category'];
      
      if (categoryId) {
        this.selectedCategory = Number(categoryId);
        this.loadProductsByCategory(this.selectedCategory);
      } else if (searchQuery) {
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

  private loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (response) => {
        if (response && response["$values"]) {
          this.categories.set(response["$values"]);
        }
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  private loadProducts(): void {
    this.productService.getProducts(this.currentPage, this.pageSize, this.searchTerm).subscribe({
      next: (response) => {
        if (response && response.items["$values"]) {
          this.products.set(response.items["$values"]);
          this.totalItems = response.totalItems;
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

  private loadProductsByCategory(categoryId: number): void {
    this.productService.getProductsByCategory(categoryId, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        if (response && response.items["$values"]) {
          this.products.set(response.items["$values"]);
          this.totalPages = response.totalPages;
          this.hasNextPage = response.hasNextPage;
          this.hasPreviousPage = response.hasPreviousPage;
        }
      },
      error: (error) => {
        console.error('Error loading products by category:', error);
      }
    });
  }

  private searchProducts(query: string): void {
    this.productService.searchProducts(query).subscribe({
      next: (response) => {
        if (response && response["$values"]) {
          this.products.set(response["$values"]);
          this.totalItems = response["$values"].length;
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

  onCategorySelect(categoryId: number | null): void {
    this.selectedCategory = categoryId;
    if (categoryId) {
      this.loadProductsByCategory(categoryId);
    } else {
      this.loadProducts();
    }
  }

  trackByProductId = (index: number, product: Product): number => {
    return product.id;
  }

  trackByCategoryId = (index: number, category: Category): number => {
    return category.id;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    if (this.selectedCategory) {
      this.loadProductsByCategory(this.selectedCategory);
    } else if (this.searchTerm) {
      this.searchProducts(this.searchTerm);
    } else {
      this.loadProducts();
    }
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.currentPage = 1; 
    if (this.selectedCategory) {
      this.loadProductsByCategory(this.selectedCategory);
    } else if (this.searchTerm) {
      this.searchProducts(this.searchTerm);
    } else {
      this.loadProducts();
    }  }

  private setupRatingRange() {
    const minRatingRange = document.getElementById('minRatingRange') as HTMLInputElement;
    const maxRatingRange = document.getElementById('maxRatingRange') as HTMLInputElement;
    const minRatingValue = document.getElementById('minRatingValue');
    const maxRatingValue = document.getElementById('maxRatingValue');
    const minStars = document.querySelector('.min-stars');
    const maxStars = document.querySelector('.max-stars');

    if (minRatingRange && maxRatingRange && minRatingValue && maxRatingValue && minStars && maxStars) {
      const updateStars = (value: number, starsContainer: Element) => {
        const stars = starsContainer.querySelectorAll('i');
        stars.forEach((star, index) => {
          if (index < value) {
            star.classList.remove('far');
            star.classList.add('fas');
          } else {
            star.classList.remove('fas');
            star.classList.add('far');
          }
        });
      };

      const updateRanges = () => {
        const minValue = parseInt(minRatingRange.value);
        const maxValue = parseInt(maxRatingRange.value);

        // Ensure min doesn't exceed max
        if (minValue > maxValue) {
          minRatingRange.value = maxValue.toString();
          minRatingValue.textContent = maxValue.toString();
          updateStars(maxValue, minStars);
        }

        // Ensure max doesn't go below min
        if (maxValue < minValue) {
          maxRatingRange.value = minValue.toString();
          maxRatingValue.textContent = minValue.toString();
          updateStars(minValue, maxStars);
        }

        // Filter products by rating range
        this.filterProductsByRatingRange(
          parseInt(minRatingRange.value),
          parseInt(maxRatingRange.value)
        );
      };

      minRatingRange.addEventListener('input', () => {
        const value = parseInt(minRatingRange.value);
        minRatingValue.textContent = value.toString();
        updateStars(value, minStars);
        updateRanges();
      });

      maxRatingRange.addEventListener('input', () => {
        const value = parseInt(maxRatingRange.value);
        maxRatingValue.textContent = value.toString();
        updateStars(value, maxStars);
        updateRanges();
      });

      // Initial update
      updateStars(parseInt(minRatingRange.value), minStars);
      updateStars(parseInt(maxRatingRange.value), maxStars);
    }
  }

  private filterProductsByRatingRange(minRating: number, maxRating: number) {
    // Implement your rating range filter logic here
    // For example:
    // this.products = this.allProducts.filter(p => p.rating >= minRating && p.rating <= maxRating);
  }
}
