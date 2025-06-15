import { Component, inject } from '@angular/core';
import { DataService, Product } from '../../services';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  products: Product[] = [];
  private readonly dataService = inject(DataService);

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.dataService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log('Products => ', this.products);
      },
      error: (error) => {
        console.error('Ürünler yüklenirken hata oluştu:', error);
      }
    });
  }
}
