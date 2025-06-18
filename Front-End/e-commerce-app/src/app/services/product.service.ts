import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Product } from '../models';
import { PaginatedResult } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiService = inject(ApiService);

  getProducts(page: number = 1, pageSize: number = 10, searchTerm: string = ''): Observable<PaginatedResult<Product>> {
    const params = {
      page,
      pageSize,
      searchTerm
    };
    return this.apiService.get<PaginatedResult<Product>>('/Product', params);
  }

  getProductsByCategory(categoryId: number, page: number = 1, pageSize: number = 10): Observable<PaginatedResult<Product>> {
    const params = {
      page,
      pageSize,
      categoryId
    };
    return this.apiService.get<PaginatedResult<Product>>('/Product/category', params);
  }

  getProduct(id: number): Observable<Product> {
    return this.apiService.get<Product>(`/Product/${id}`);
  }

  createProduct(product: Omit<Product, 'id' | 'createdDate' | 'updatedDate'>): Observable<Product> {
    return this.apiService.post<Product>('/Product', product);
  }

  updateProduct(id: number, product: Partial<Omit<Product, 'id' | 'createdDate'>>): Observable<Product> {
    return this.apiService.put<Product>(`/Product/${id}`, { ...product, id });
  }

  deleteProduct(id: number): Observable<void> {
    return this.apiService.delete<void>(`/Product/${id}`);
  }
} 