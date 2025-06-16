import { Component, inject, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Product } from '../../services';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  products = signal<Product[]>([]);
  private readonly dataService = inject(DataService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.dataService.getProducts().subscribe({
      next: (products) => {
        if (products && products.length > 0) {
          this.products.set(products);
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  trackByProductId = (index: number, product: Product): number => {
    return product.id;
  }
}
