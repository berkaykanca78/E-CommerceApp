import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  category?: any;
  createdAt: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Product {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getProducts(pageNumber: number, pageSize: number, searchTerm: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get(`${this.apiUrl}/product`, { params });
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/search?query=${query}`);
  }
} 