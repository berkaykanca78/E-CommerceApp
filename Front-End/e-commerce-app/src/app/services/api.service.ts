import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly baseUrl = environment.apiUrl;

  private readonly defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  /**
   * Sadece browser ortamında ve development mode'da log
   */
  private log(message: string, data?: any): void {
    if (this.isBrowser() && typeof window !== 'undefined' && environment.enableLogging) {
      if (data) {
        console.log(message, data);
      } else {
        console.log(message);
      }
    }
  }

  /**
   * Sadece browser ortamında hata log'la
   */
  private logError(message: string, error?: any): void {
    if (this.isBrowser() && typeof window !== 'undefined' && environment.enableLogging) {
      console.error(message, error);
    }
  }

  /**
   * Platform kontrolü - sadece browser'da HTTP istekleri at
   */
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * SSR sırasında dummy data döndür, browser'da gerçek istek at
   */
  private executeRequest<T>(requestFn: () => Observable<T>): Observable<T> {
    if (!this.isBrowser()) {
      // SSR sırasında sessizce boş array/object dön
      return of([] as unknown as T);
    }
    
    return requestFn();
  }

  /**
   * GET request
   */
  get<T>(endpoint: string, params?: HttpParams | { [key: string]: any }): Observable<T> {
    return this.executeRequest(() => {
      const httpParams = params instanceof HttpParams ? params : this.createHttpParams(params);
      
      return this.http.get<any>(`${this.baseUrl}${endpoint}`, {
        headers: this.defaultHeaders,
        params: httpParams
      }).pipe(
        map(response => this.extractData<T>(response)),
        catchError(this.handleError)
      );
    });
  }

  /**
   * POST request
   */
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.executeRequest(() => {
      return this.http.post<any>(`${this.baseUrl}${endpoint}`, body, {
        headers: this.defaultHeaders
      }).pipe(
        map(response => this.extractData<T>(response)),
        catchError(this.handleError)
      );
    });
  }

  /**
   * PUT request
   */
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.executeRequest(() => {
      return this.http.put<any>(`${this.baseUrl}${endpoint}`, body, {
        headers: this.defaultHeaders
      }).pipe(
        map(response => this.extractData<T>(response)),
        catchError(this.handleError)
      );
    });
  }

  /**
   * DELETE request
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.executeRequest(() => {
      return this.http.delete<any>(`${this.baseUrl}${endpoint}`, {
        headers: this.defaultHeaders
      }).pipe(
        map(response => this.extractData<T>(response)),
        catchError(this.handleError)
      );
    });
  }

  /**
   * PATCH request
   */
  patch<T>(endpoint: string, body: any): Observable<T> {
    return this.executeRequest(() => {
      return this.http.patch<any>(`${this.baseUrl}${endpoint}`, body, {
        headers: this.defaultHeaders
      }).pipe(
        map(response => this.extractData<T>(response)),
        catchError(this.handleError)
      );
    });
  }

  /**
   * File upload
   */
  uploadFile<T>(endpoint: string, file: File, additionalData?: { [key: string]: any }): Observable<T> {
    return this.executeRequest(() => {
      const formData = new FormData();
      formData.append('file', file);
      
      if (additionalData) {
        Object.keys(additionalData).forEach(key => {
          formData.append(key, additionalData[key]);
        });
      }

      const headers = new HttpHeaders({
        'Accept': 'application/json'
        // Content-Type'ı FormData için otomatik set edilmesine izin veriyoruz
      });

      return this.http.post<any>(`${this.baseUrl}${endpoint}`, formData, {
        headers
      }).pipe(
        map(response => this.extractData<T>(response)),
        catchError(this.handleError)
      );
    });
  }

  /**
   * Set authorization token
   */
  setAuthToken(token: string): void {
    this.defaultHeaders.set('Authorization', `Bearer ${token}`);
  }

  /**
   * Remove authorization token
   */
  removeAuthToken(): void {
    this.defaultHeaders.delete('Authorization');
  }

  /**
   * Extract data from response - handles both wrapped and direct responses
   */
  private extractData<T>(response: any): T {
    // Eğer response null veya undefined ise
    if (!response) {
      return response;
    }

    // Eğer response'da 'data' property'si varsa (wrapped response)
    if (response.hasOwnProperty('data')) {
      //this.log('Wrapped response detected, extracting data:', response.data);
      return response.data;
    }

    // Eğer response direkt data ise (direct response)
    this.log('Direct response detected:', response);
    return response;
  }

  /**
   * Create HTTP params from object
   */
  private createHttpParams(params?: { [key: string]: any }): HttpParams {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    
    return httpParams;
  }

  /**
   * Error handler - SSR compatible
   */
  private handleError = (error: any): Observable<never> => {
    let errorMessage = 'Bir hata oluştu';
    
    // SSR compatible error checking
    if (error.error && typeof error.error === 'object' && error.error.message) {
      // Client-side error (only if ErrorEvent exists)
      if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
        errorMessage = `Hata: ${error.error.message}`;
      } else {
        // Generic error object
        errorMessage = `Hata: ${error.error.message}`;
      }
    } else {
      // Server-side error
      errorMessage = error.error?.message || error.message || `Sunucu hatası: ${error.status || 'Bilinmeyen'}`;
    }
    
    this.logError('API Hatası:', error);
    return throwError(() => new Error(errorMessage));
  };
} 