import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../services/alert';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-4">Alert Service Demo</h2>
          <p class="text-muted mb-4">Bu sayfa alert service'inin farklı özelliklerini test etmek için oluşturulmuştur.</p>
        </div>
      </div>

      <div class="row g-3">
        <!-- Basic Alerts -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Temel Alert'ler</h5>
            </div>
            <div class="card-body">
              <div class="d-grid gap-2">
                <button class="btn btn-success" (click)="showSuccess()">
                  <i class="fas fa-check me-2"></i>Success Alert
                </button>
                <button class="btn btn-danger" (click)="showError()">
                  <i class="fas fa-exclamation-triangle me-2"></i>Error Alert
                </button>
                <button class="btn btn-warning" (click)="showWarning()">
                  <i class="fas fa-exclamation-circle me-2"></i>Warning Alert
                </button>
                <button class="btn btn-info" (click)="showInfo()">
                  <i class="fas fa-info-circle me-2"></i>Info Alert
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Advanced Alerts -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Gelişmiş Alert'ler</h5>
            </div>
            <div class="card-body">
              <div class="d-grid gap-2">
                <button class="btn btn-primary" (click)="showCustomAlert()">
                  <i class="fas fa-cog me-2"></i>Custom Alert
                </button>
                <button class="btn btn-secondary" (click)="showLoading()">
                  <i class="fas fa-spinner me-2"></i>Loading Alert
                </button>
                <button class="btn btn-dark" (click)="showConfirm()">
                  <i class="fas fa-question-circle me-2"></i>Confirmation
                </button>
                <button class="btn btn-outline-danger" (click)="showApiError()">
                  <i class="fas fa-bug me-2"></i>API Error
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Alert Management -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Alert Yönetimi</h5>
            </div>
            <div class="card-body">
              <div class="d-grid gap-2">
                <button class="btn btn-outline-warning" (click)="clearByType('warning')">
                  <i class="fas fa-trash me-2"></i>Clear Warnings
                </button>
                <button class="btn btn-outline-danger" (click)="clearByType('error')">
                  <i class="fas fa-trash me-2"></i>Clear Errors
                </button>
                <button class="btn btn-outline-secondary" (click)="clearAll()">
                  <i class="fas fa-trash-alt me-2"></i>Clear All
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Multiple Alerts -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Çoklu Alert'ler</h5>
            </div>
            <div class="card-body">
              <div class="d-grid gap-2">
                <button class="btn btn-outline-primary" (click)="showMultipleAlerts()">
                  <i class="fas fa-layer-group me-2"></i>Show Multiple
                </button>
                <button class="btn btn-outline-success" (click)="showDifferentPositions()">
                  <i class="fas fa-arrows-alt me-2"></i>Different Positions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Current Alerts Info -->
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Mevcut Alert'ler</h5>
            </div>
            <div class="card-body">
              <p class="text-muted">Aktif alert sayısı: {{ currentAlertCount }}</p>
              <div class="alert alert-info">
                <strong>Not:</strong> Alert'ler sağ üst köşede görünecektir. 
                Her alert 5 saniye sonra otomatik olarak kapanır (hata alert'leri 8 saniye).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: none;
    }
    
    .card-header {
      background-color: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }
    
    .btn {
      transition: all 0.2s ease;
    }
    
    .btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class AlertDemo {
  private alertService = inject(AlertService);
  currentAlertCount = 0;

  constructor() {
    this.alertService.alerts$.subscribe(alerts => {
      this.currentAlertCount = alerts.length;
    });
  }

  showSuccess(): void {
    this.alertService.success('İşlem başarıyla tamamlandı!', 'Başarılı');
  }

  showError(): void {
    this.alertService.error('Bir hata oluştu. Lütfen tekrar deneyin.', 'Hata');
  }

  showWarning(): void {
    this.alertService.warning('Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?', 'Uyarı');
  }

  showInfo(): void {
    this.alertService.info('Yeni özellikler eklendi. Detayları görmek için tıklayın.', 'Bilgi');
  }

  showCustomAlert(): void {
    this.alertService.show({
      title: 'Özel Alert',
      message: 'Bu özel bir alert örneğidir. Farklı özelliklerle yapılandırılabilir.',
      type: 'info',
      duration: 10000, // 10 saniye
      position: 'bottom-right',
      icon: 'star',
      action: {
        text: 'Detaylar',
        callback: () => {
          console.log('Detaylar butonuna tıklandı');
          this.alertService.info('Detaylar sayfasına yönlendiriliyorsunuz...');
        }
      }
    });
  }

  showLoading(): void {
    const loadingId = this.alertService.showLoading('Veriler yükleniyor...', 'Lütfen bekleyin');
    
    // 3 saniye sonra loading'i kapat
    setTimeout(() => {
      this.alertService.hideLoading(loadingId);
      this.alertService.success('Veriler başarıyla yüklendi!');
    }, 3000);
  }

  async showConfirm(): Promise<void> {
    const confirmed = await this.alertService.confirm(
      'Bu işlemi gerçekleştirmek istediğinizden emin misiniz?',
      'Evet, Devam Et',
      'İptal'
    );

    if (confirmed) {
      this.alertService.success('İşlem onaylandı ve gerçekleştirildi!');
    } else {
      this.alertService.info('İşlem iptal edildi.');
    }
  }

  showApiError(): void {
    // Simüle edilmiş API hatası
    const mockError = {
      error: {
        message: 'Sunucu bağlantısı kurulamadı',
        title: 'Bağlantı Hatası'
      }
    };

    this.alertService.showApiError(mockError, 'Bilinmeyen bir hata oluştu');
  }

  clearByType(type: 'warning' | 'error'): void {
    this.alertService.clearByType(type);
    this.alertService.info(`${type === 'warning' ? 'Uyarı' : 'Hata'} alert'leri temizlendi.`);
  }

  clearAll(): void {
    this.alertService.clearAll();
    this.alertService.info('Tüm alert\'ler temizlendi.');
  }

  showMultipleAlerts(): void {
    this.alertService.success('İlk başarı mesajı');
    setTimeout(() => this.alertService.info('İkinci bilgi mesajı'), 500);
    setTimeout(() => this.alertService.warning('Üçüncü uyarı mesajı'), 1000);
    setTimeout(() => this.alertService.error('Dördüncü hata mesajı'), 1500);
  }

  showDifferentPositions(): void {
    this.alertService.show({
      message: 'Sağ üst köşede',
      type: 'success',
      position: 'top-right'
    });

    setTimeout(() => {
      this.alertService.show({
        message: 'Sol üst köşede',
        type: 'info',
        position: 'top-left'
      });
    }, 1000);

    setTimeout(() => {
      this.alertService.show({
        message: 'Alt ortada',
        type: 'warning',
        position: 'bottom-center'
      });
    }, 2000);
  }
} 