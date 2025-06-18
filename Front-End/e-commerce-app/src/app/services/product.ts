import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product as ProductModel } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Product {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getProducts(page: number, pageSize: number, searchTerm: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get(`${this.apiUrl}/Product`, { params })
      .pipe(catchError(this.handleError));
  }

  getProductsByCategory(categoryId: number, page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Product/category/${categoryId}`, {
      params: new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(catchError(this.handleError));
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Category`)
      .pipe(catchError(this.handleError));
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Product/search`, {
      params: new HttpParams().set('query', query)
    }).pipe(catchError(this.handleError));
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.apiUrl}/Product/${id}`)
      .pipe(catchError(this.handleError));
  }
} 