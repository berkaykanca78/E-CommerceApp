import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiService = inject(ApiService);

  // User endpoints
  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('/user/getall');
  }

  getUser(id: number): Observable<User> {
    return this.apiService.get<User>(`/users/${id}`);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.apiService.post<User>('/users', user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.apiService.put<User>(`/users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.apiService.delete<void>(`/users/${id}`);
  }

  // Product endpoints
  getProducts(params?: { category?: string; search?: string; page?: number; limit?: number }): Observable<Product[]> {
    return this.apiService.get<Product[]>('/products', params);
  }

  getProduct(id: number): Observable<Product> {
    return this.apiService.get<Product>(`/products/${id}`);
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.apiService.post<Product>('/products', product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.apiService.put<Product>(`/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.apiService.delete<void>(`/products/${id}`);
  }

  // Auth endpoints
  login(credentials: { email: string; password: string }): Observable<{ token: string; user: User }> {
    return this.apiService.post('/auth/login', credentials);
  }

  register(userData: { name: string; email: string; password: string }): Observable<User> {
    return this.apiService.post('/auth/register', userData);
  }

  logout(): Observable<void> {
    return this.apiService.post('/auth/logout', {});
  }

  // File upload
  uploadProductImage(productId: number, file: File): Observable<{ imageUrl: string }> {
    return this.apiService.uploadFile(`/products/${productId}/image`, file);
  }
} 