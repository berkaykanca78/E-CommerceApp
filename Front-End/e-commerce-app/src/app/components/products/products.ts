import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataGrid, TableColumn } from '../shared/data-grid/data-grid';
import { Product, Category } from '../../models';
import { Product as ProductService } from '../../services/product';
import { ActivatedRoute } from '@angular/router';
import { Cart as CartService } from '../../services/cart';
import { AlertService } from '../../services/alert';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, DataGrid],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  products = signal<Product[]>([]);
  productsArray: Product[] = [];
  categories = signal<Category[]>([]);
  selectedCategory: number | null = null;
  currentPage = 1;
  itemsPerPage = 6;
  totalItems = 0;
  totalPages = 0;
  hasNextPage = false;
  hasPreviousPage = false;
  searchQuery: string = '';
  loading = false;
  error = '';
  viewMode: 'grid' | 'table' = 'grid';
  
  // Data grid columns for table view
  tableColumns: TableColumn[] = [
    {
      key: 'imageUrl',
      label: 'Image',
      type: 'image',
      altKey: 'name',
      sortable: false
    },
    {
      key: 'name',
      label: 'Product Name',
      type: 'product-name',
      descriptionKey: 'description'
    },
    {
      key: 'price',
      label: 'Price',
      type: 'price'
    },
    {
      key: 'category',
      label: 'Category',
      type: 'badge',
      badgeConfig: {
        default: { class: 'bg-info', text: '' }
      }
    }
  ];

  // Data grid columns for grid view (minimal for card display)
  gridColumns: TableColumn[] = [
    {
      key: 'imageUrl',
      label: 'Image',
      type: 'image',
      altKey: 'name',
      sortable: false
    },
    {
      key: 'name',
      label: 'Product Name',
      type: 'text'
    },
    {
      key: 'price',
      label: 'Price',
      type: 'price'
    }
  ];

  
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly alertService = inject(AlertService);
  ngOnInit() {
    this.loadCategories();
    this.setupRatingRange();
    // Check if there's a search query parameter
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['search'];
      const categoryId = params['category'];
      this.searchQuery = searchQuery || '';
      if (categoryId) {
        this.selectedCategory = Number(categoryId);
        this.loadProductsByCategory(this.selectedCategory);
      } else if (searchQuery) {
        this.searchProducts(searchQuery);
      } else {
        this.loadProducts();
      }
    });
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
    this.loading = true;
    this.error = '';
    
    this.productService.getProducts(this.currentPage, this.itemsPerPage, this.searchQuery).subscribe({
      next: (response) => {
        if (response && response.items["$values"]) {
          const validProducts = response.items["$values"].filter((product: Product & { $ref?: string }) =>
            product && product.name && !product.$ref
          );
          this.products.set(validProducts);
          this.productsArray = validProducts;
          this.totalItems = response.totalItems || validProducts.length;
          this.totalPages = response.totalPages || Math.ceil(this.totalItems / this.itemsPerPage);
          this.hasNextPage = response.hasNextPage ?? (this.currentPage < this.totalPages);
          this.hasPreviousPage = response.hasPreviousPage ?? (this.currentPage > 1);
          this.loading = false;
        } else {
          this.products.set([]);
          this.productsArray = [];
          this.totalItems = 0;
          this.totalPages = 0;
          this.hasNextPage = false;
          this.hasPreviousPage = false;
          this.loading = false;
        }
      },
      error: (error) => {
        this.products.set([]);
        this.productsArray = [];
        this.totalItems = 0;
        this.totalPages = 0;
        this.hasNextPage = false;
        this.hasPreviousPage = false;
        this.loading = false;
        this.error = 'Failed to load products. Please try again.';
      }
    });
  }

  private loadProductsByCategory(categoryId: number): void {
    this.productService.getProductsByCategory(categoryId, this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        if (response && response.items["$values"]) {
          this.products.set(response.items["$values"]);
          this.productsArray = response.items["$values"];
          this.totalPages = response.totalPages;
          this.hasNextPage = response.hasNextPage;
          this.hasPreviousPage = response.hasPreviousPage;
        }
      },
      error: (error) => {
        console.error('Error loading products by category:', error);
        this.products.set([]);
        this.productsArray = [];
      }
    });
  }

  private searchProducts(query: string): void {
    this.productService.getProducts(this.currentPage, this.itemsPerPage, query).subscribe({
      next: (response) => {
        if (response && response.items["$values"]) {
          const validProducts = response.items["$values"].filter((product: Product & { $ref?: string }) =>
            product && product.name && !product.$ref
          );
          this.products.set(validProducts);
          this.productsArray = validProducts;
          this.totalItems = response.totalItems || validProducts.length;
          this.totalPages = response.totalPages || Math.ceil(this.totalItems / this.itemsPerPage);
          this.hasNextPage = response.hasNextPage ?? (this.currentPage < this.totalPages);
          this.hasPreviousPage = response.hasPreviousPage ?? (this.currentPage > 1);
        } else {
          this.products.set([]);
          this.productsArray = [];
          this.totalItems = 0;
          this.totalPages = 0;
          this.hasNextPage = false;
          this.hasPreviousPage = false;
        }
      },
      error: (error) => {
        console.error('Error searching products:', error);
        this.products.set([]);
        this.productsArray = [];
        this.totalItems = 0;
        this.totalPages = 0;
        this.hasNextPage = false;
        this.hasPreviousPage = false;
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

  onDataGridDataChange(dataGridData: Product[]) {
    //this.productsArray = dataGridData;
    this.products.set(dataGridData);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    // Make API call for the new page
    if (this.selectedCategory) {
      this.loadProductsByCategory(this.selectedCategory);
    } else if (this.searchQuery) {
      this.searchProducts(this.searchQuery);
    } else {
      this.loadProducts();
    }
  }

  onPageSizeChange(newPageSize: number): void {
    this.itemsPerPage = newPageSize;
    this.currentPage = 1;
    if (this.searchQuery) {
      this.searchProducts(this.searchQuery);
    } else {
      this.loadProducts();
    }
  }



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

  addToCart(product: { id: number; name: string; price: number }) {
    this.cartService.addToCart(product);
    this.alertService.success(`${product.name} has been added to your cart.`);
  }
}
