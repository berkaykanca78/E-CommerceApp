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
  
  // Test data
  private testProducts: Product[] = [
    {
      id: 1,
      name: 'Test Product 1',
      description: 'Test Description',
      price: 99.99,
      stock: 10,
      imageUrl: 'https://via.placeholder.com/300x200',
      isActive: true,
      createdDate: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Test Product 2', 
      description: 'Test Description 2',
      price: 149.99,
      stock: 5,
      imageUrl: 'https://via.placeholder.com/300x200',
      isActive: true,
      createdDate: new Date().toISOString()
    }
  ];

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.dataService.getProducts().subscribe({
      next: (products) => {
        if (products && products.length > 0) {
          this.products.set(products);
        } else {
          this.products.set(this.testProducts);
        }
      },
      error: (error) => {
        this.products.set(this.testProducts);
      }
    });
  }

  trackByProductId = (index: number, product: Product): number => {
    return product.id;
  }
}
