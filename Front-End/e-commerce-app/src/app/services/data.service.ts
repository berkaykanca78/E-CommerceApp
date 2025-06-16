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
  stock: number;
  category?: string;
  imageUrl?: string;
  isActive: boolean;
  createdDate: string;  // ISO date string
  updatedDate?: string; // ISO date string, optional
}

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  isActive: boolean;
  createdDate: string;
  updatedDate?: string;
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
    return this.apiService.get<Product[]>('/Product', params);
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

  // Category endpoints
  getCategories(): Observable<Category[]> {
    return this.apiService.get<Category[]>('/Category');
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