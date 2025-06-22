import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AlertOptions {
  title?: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // milliseconds, 0 = auto-hide disabled
  dismissible?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  icon?: string;
  action?: {
    text: string;
    callback: () => void;
  };
}

export interface Alert {
  id: string;
  options: AlertOptions;
  timestamp: number;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly alerts = new BehaviorSubject<Alert[]>([]);
  private alertCounter = 0;

  /**
   * Alert'leri dinlemek için Observable
   */
  get alerts$(): Observable<Alert[]> {
    return this.alerts.asObservable();
  }

  /**
   * Mevcut alert'leri al
   */
  get currentAlerts(): Alert[] {
    return this.alerts.value;
  }

  /**
   * Platform kontrolü
   */
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * Benzersiz ID oluştur
   */
  private generateId(): string {
    return `alert-${++this.alertCounter}-${Date.now()}`;
  }

  /**
   * Alert ekle
   */
  private addAlert(options: AlertOptions): string {
    if (!this.isBrowser()) {
      return '';
    }

    const alert: Alert = {
      id: this.generateId(),
      options: {
        duration: 5000, // Default 5 saniye
        dismissible: true,
        position: 'top-right',
        ...options
      },
      timestamp: Date.now(),
      visible: true
    };

    const currentAlerts = this.alerts.value;
    this.alerts.next([...currentAlerts, alert]);

    // Auto-hide için timer
    if (alert.options.duration && alert.options.duration > 0) {
      setTimeout(() => {
        this.removeAlert(alert.id);
      }, alert.options.duration);
    }

    return alert.id;
  }

  /**
   * Alert kaldır
   */
  removeAlert(alertId: string): void {
    if (!this.isBrowser()) {
      return;
    }

    const currentAlerts = this.alerts.value;
    const updatedAlerts = currentAlerts.map(alert => 
      alert.id === alertId ? { ...alert, visible: false } : alert
    );
    
    this.alerts.next(updatedAlerts);

    // DOM'dan tamamen kaldırmak için kısa bir gecikme
    setTimeout(() => {
      const finalAlerts = this.alerts.value.filter(alert => alert.id !== alertId);
      this.alerts.next(finalAlerts);
    }, 300); // CSS transition süresi
  }

  /**
   * Tüm alert'leri temizle
   */
  clearAll(): void {
    if (!this.isBrowser()) {
      return;
    }

    const currentAlerts = this.alerts.value;
    const updatedAlerts = currentAlerts.map(alert => ({ ...alert, visible: false }));
    this.alerts.next(updatedAlerts);

    setTimeout(() => {
      this.alerts.next([]);
    }, 300);
  }

  /**
   * Belirli türdeki alert'leri temizle
   */
  clearByType(type: AlertOptions['type']): void {
    if (!this.isBrowser()) {
      return;
    }

    const currentAlerts = this.alerts.value;
    const alertsToRemove = currentAlerts.filter(alert => alert.options.type === type);
    
    alertsToRemove.forEach(alert => {
      this.removeAlert(alert.id);
    });
  }

  /**
   * Success alert
   */
  success(message: string, title?: string, options?: Partial<AlertOptions>): string {
    return this.addAlert({
      message,
      title,
      type: 'success',
      icon: 'check-circle',
      ...options
    });
  }

  /**
   * Error alert
   */
  error(message: string, title?: string, options?: Partial<AlertOptions>): string {
    return this.addAlert({
      message,
      title: title || 'Hata',
      type: 'error',
      icon: 'exclamation-triangle',
      duration: 8000, // Hatalar daha uzun süre gösterilsin
      ...options
    });
  }

  /**
   * Warning alert
   */
  warning(message: string, title?: string, options?: Partial<AlertOptions>): string {
    return this.addAlert({
      message,
      title: title || 'Uyarı',
      type: 'warning',
      icon: 'exclamation-circle',
      ...options
    });
  }

  /**
   * Info alert
   */
  info(message: string, title?: string, options?: Partial<AlertOptions>): string {
    return this.addAlert({
      message,
      title: title || 'Bilgi',
      type: 'info',
      icon: 'info-circle',
      ...options
    });
  }

  /**
   * Custom alert
   */
  show(options: AlertOptions): string {
    return this.addAlert(options);
  }

  /**
   * API hata mesajlarını otomatik olarak göster
   */
  showApiError(error: any, defaultMessage: string = 'Bir hata oluştu'): string {
    let message = defaultMessage;
    let title = 'Hata';

    if (error?.error?.message) {
      message = error.error.message;
    } else if (error?.message) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    if (error?.error?.title) {
      title = error.error.title;
    }

    return this.error(message, title);
  }

  /**
   * API başarı mesajlarını otomatik olarak göster
   */
  showApiSuccess(message: string, title?: string): string {
    return this.success(message, title || 'Başarılı');
  }

  /**
   * Konfirmasyon alert'i (action ile)
   */
  confirm(
    message: string, 
    confirmText: string = 'Evet', 
    cancelText: string = 'Hayır',
    title?: string
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const alertId = this.show({
        message,
        title: title || 'Onay',
        type: 'warning',
        icon: 'question-circle',
        duration: 0, // Manuel kapatılana kadar açık kalsın
        dismissible: false,
        action: {
          text: confirmText,
          callback: () => {
            this.removeAlert(alertId);
            resolve(true);
          }
        }
      });

      // Cancel butonu için ayrı bir action ekle
      setTimeout(() => {
        const currentAlerts = this.alerts.value;
        const alert = currentAlerts.find(a => a.id === alertId);
        if (alert) {
          const updatedAlert = {
            ...alert,
            options: {
              ...alert.options,
              action: {
                text: cancelText,
                callback: () => {
                  this.removeAlert(alertId);
                  resolve(false);
                }
              }
            }
          };
          
          const updatedAlerts = currentAlerts.map(a => a.id === alertId ? updatedAlert : a);
          this.alerts.next(updatedAlerts);
        }
      }, 100);
    });
  }

  /**
   * Loading alert'i
   */
  showLoading(message: string = 'Yükleniyor...', title?: string): string {
    return this.show({
      message,
      title: title || 'Lütfen bekleyin',
      type: 'info',
      icon: 'spinner',
      duration: 0, // Manuel kapatılana kadar açık kalsın
      dismissible: false
    });
  }

  /**
   * Loading alert'ini kapat
   */
  hideLoading(alertId: string): void {
    this.removeAlert(alertId);
  }
} 