import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService, Alert } from '../../../services/alert';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Top Right -->
    <div class="alert-container position-top-right">
      <div 
        *ngFor="let alert of getAlertsByPosition('top-right')" 
        class="alert-item"
        [ngClass]="{
          'alert-success': alert.options.type === 'success',
          'alert-danger': alert.options.type === 'error',
          'alert-warning': alert.options.type === 'warning',
          'alert-info': alert.options.type === 'info',
          'show': alert.visible,
          'hide': !alert.visible
        }"
      >
        <div class="alert-content">
          <div class="alert-icon" *ngIf="alert.options.icon">
            <i [class]="getIconClass(alert.options.icon)"></i>
          </div>
          <div class="alert-body">
            <h6 class="alert-title" *ngIf="alert.options.title">
              {{ alert.options.title }}
            </h6>
            <p class="alert-message">{{ alert.options.message }}</p>
          </div>
          <div class="alert-action" *ngIf="alert.options.action">
            <button 
              type="button" 
              class="btn btn-sm btn-outline-primary"
              (click)="alert.options.action!.callback()"
            >
              {{ alert.options.action!.text }}
            </button>
          </div>
          <button 
            *ngIf="alert.options.dismissible"
            type="button" 
            class="alert-close-btn" 
            (click)="closeAlert(alert.id)"
            aria-label="Close"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Top Left -->
    <div class="alert-container position-top-left">
      <div 
        *ngFor="let alert of getAlertsByPosition('top-left')" 
        class="alert-item"
        [ngClass]="{
          'alert-success': alert.options.type === 'success',
          'alert-danger': alert.options.type === 'error',
          'alert-warning': alert.options.type === 'warning',
          'alert-info': alert.options.type === 'info',
          'show': alert.visible,
          'hide': !alert.visible
        }"
      >
        <div class="alert-content">
          <div class="alert-icon" *ngIf="alert.options.icon">
            <i [class]="getIconClass(alert.options.icon)"></i>
          </div>
          <div class="alert-body">
            <h6 class="alert-title" *ngIf="alert.options.title">
              {{ alert.options.title }}
            </h6>
            <p class="alert-message">{{ alert.options.message }}</p>
          </div>
          <div class="alert-action" *ngIf="alert.options.action">
            <button 
              type="button" 
              class="btn btn-sm btn-outline-primary"
              (click)="alert.options.action!.callback()"
            >
              {{ alert.options.action!.text }}
            </button>
          </div>
          <button 
            *ngIf="alert.options.dismissible"
            type="button" 
            class="alert-close-btn" 
            (click)="closeAlert(alert.id)"
            aria-label="Close"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Right -->
    <div class="alert-container position-bottom-right">
      <div 
        *ngFor="let alert of getAlertsByPosition('bottom-right')" 
        class="alert-item"
        [ngClass]="{
          'alert-success': alert.options.type === 'success',
          'alert-danger': alert.options.type === 'error',
          'alert-warning': alert.options.type === 'warning',
          'alert-info': alert.options.type === 'info',
          'show': alert.visible,
          'hide': !alert.visible
        }"
      >
        <div class="alert-content">
          <div class="alert-icon" *ngIf="alert.options.icon">
            <i [class]="getIconClass(alert.options.icon)"></i>
          </div>
          <div class="alert-body">
            <h6 class="alert-title" *ngIf="alert.options.title">
              {{ alert.options.title }}
            </h6>
            <p class="alert-message">{{ alert.options.message }}</p>
          </div>
          <div class="alert-action" *ngIf="alert.options.action">
            <button 
              type="button" 
              class="btn btn-sm btn-outline-primary"
              (click)="alert.options.action!.callback()"
            >
              {{ alert.options.action!.text }}
            </button>
          </div>
          <button 
            *ngIf="alert.options.dismissible"
            type="button" 
            class="alert-close-btn" 
            (click)="closeAlert(alert.id)"
            aria-label="Close"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Left -->
    <div class="alert-container position-bottom-left">
      <div 
        *ngFor="let alert of getAlertsByPosition('bottom-left')" 
        class="alert-item"
        [ngClass]="{
          'alert-success': alert.options.type === 'success',
          'alert-danger': alert.options.type === 'error',
          'alert-warning': alert.options.type === 'warning',
          'alert-info': alert.options.type === 'info',
          'show': alert.visible,
          'hide': !alert.visible
        }"
      >
        <div class="alert-content">
          <div class="alert-icon" *ngIf="alert.options.icon">
            <i [class]="getIconClass(alert.options.icon)"></i>
          </div>
          <div class="alert-body">
            <h6 class="alert-title" *ngIf="alert.options.title">
              {{ alert.options.title }}
            </h6>
            <p class="alert-message">{{ alert.options.message }}</p>
          </div>
          <div class="alert-action" *ngIf="alert.options.action">
            <button 
              type="button" 
              class="btn btn-sm btn-outline-primary"
              (click)="alert.options.action!.callback()"
            >
              {{ alert.options.action!.text }}
            </button>
          </div>
          <button 
            *ngIf="alert.options.dismissible"
            type="button" 
            class="alert-close-btn" 
            (click)="closeAlert(alert.id)"
            aria-label="Close"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Top Center -->
    <div class="alert-container position-top-center">
      <div 
        *ngFor="let alert of getAlertsByPosition('top-center')" 
        class="alert-item"
        [ngClass]="{
          'alert-success': alert.options.type === 'success',
          'alert-danger': alert.options.type === 'error',
          'alert-warning': alert.options.type === 'warning',
          'alert-info': alert.options.type === 'info',
          'show': alert.visible,
          'hide': !alert.visible
        }"
      >
        <div class="alert-content">
          <div class="alert-icon" *ngIf="alert.options.icon">
            <i [class]="getIconClass(alert.options.icon)"></i>
          </div>
          <div class="alert-body">
            <h6 class="alert-title" *ngIf="alert.options.title">
              {{ alert.options.title }}
            </h6>
            <p class="alert-message">{{ alert.options.message }}</p>
          </div>
          <div class="alert-action" *ngIf="alert.options.action">
            <button 
              type="button" 
              class="btn btn-sm btn-outline-primary"
              (click)="alert.options.action!.callback()"
            >
              {{ alert.options.action!.text }}
            </button>
          </div>
          <button 
            *ngIf="alert.options.dismissible"
            type="button" 
            class="alert-close-btn" 
            (click)="closeAlert(alert.id)"
            aria-label="Close"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Center -->
    <div class="alert-container position-bottom-center">
      <div 
        *ngFor="let alert of getAlertsByPosition('bottom-center')" 
        class="alert-item"
        [ngClass]="{
          'alert-success': alert.options.type === 'success',
          'alert-danger': alert.options.type === 'error',
          'alert-warning': alert.options.type === 'warning',
          'alert-info': alert.options.type === 'info',
          'show': alert.visible,
          'hide': !alert.visible
        }"
      >
        <div class="alert-content">
          <div class="alert-icon" *ngIf="alert.options.icon">
            <i [class]="getIconClass(alert.options.icon)"></i>
          </div>
          <div class="alert-body">
            <h6 class="alert-title" *ngIf="alert.options.title">
              {{ alert.options.title }}
            </h6>
            <p class="alert-message">{{ alert.options.message }}</p>
          </div>
          <div class="alert-action" *ngIf="alert.options.action">
            <button 
              type="button" 
              class="btn btn-sm btn-outline-primary"
              (click)="alert.options.action!.callback()"
            >
              {{ alert.options.action!.text }}
            </button>
          </div>
          <button 
            *ngIf="alert.options.dismissible"
            type="button" 
            class="alert-close-btn" 
            (click)="closeAlert(alert.id)"
            aria-label="Close"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --alert-max-width: 350px;
      --alert-gutter: 20px;
    }

    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(100%); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOutRight {
      from { opacity: 1; transform: translateX(0); }
      to { opacity: 0; transform: translateX(100%); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-100%); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOutLeft {
      from { opacity: 1; transform: translateX(0); }
      to { opacity: 0; transform: translateX(-100%); }
    }
    @keyframes slideInDown {
      from { opacity: 0; transform: translateY(-100%); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideOutUp {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-100%); }
    }

    .alert-container {
      position: fixed;
      z-index: 9999;
      width: var(--alert-max-width);
      max-width: calc(100vw - (2 * var(--alert-gutter)));
      box-sizing: border-box;
      pointer-events: none;
    }

    .alert-container.position-top-right {
      top: var(--alert-gutter);
      right: var(--alert-gutter);
    }
    .alert-container.position-top-left {
      top: var(--alert-gutter);
      left: var(--alert-gutter);
    }
    .alert-container.position-bottom-right {
      bottom: var(--alert-gutter);
      right: var(--alert-gutter);
    }
    .alert-container.position-bottom-left {
      bottom: var(--alert-gutter);
      left: var(--alert-gutter);
    }
    .alert-container.position-top-center {
      top: var(--alert-gutter);
      left: 50%;
      transform: translateX(-50%);
    }
    .alert-container.position-bottom-center {
      bottom: var(--alert-gutter);
      left: 50%;
      transform: translateX(-50%);
    }

    .alert-item {
      margin-bottom: 10px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      pointer-events: auto;
      box-sizing: border-box;
      animation-duration: 0.4s;
      animation-fill-mode: forwards;
      animation-timing-function: ease-out;
    }

    .position-top-right .alert-item.show,
    .position-bottom-right .alert-item.show { animation-name: slideInRight; }
    .position-top-right .alert-item.hide,
    .position-bottom-right .alert-item.hide { animation-name: slideOutRight; }

    .position-top-left .alert-item.show,
    .position-bottom-left .alert-item.show { animation-name: slideInLeft; }
    .position-top-left .alert-item.hide,
    .position-bottom-left .alert-item.hide { animation-name: slideOutLeft; }

    .position-top-center .alert-item.show { animation-name: slideInDown; }
    .position-top-center .alert-item.hide { animation-name: slideOutUp; }
    
    .position-bottom-center .alert-item.show { animation-name: slideInDown; transform: translateY(100%); }
    .position-bottom-center .alert-item.hide { animation-name: slideOutUp; transform: translateY(100%); }


    .alert-content {
      display: flex;
      align-items: flex-start;
      padding: 16px;
      gap: 12px;
    }

    .alert-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .alert-icon i {
      font-size: 18px;
    }

    .alert-body {
      flex: 1;
      min-width: 0;
    }

    .alert-title {
      margin: 0 0 4px 0;
      font-weight: 600;
      font-size: 14px;
    }

    .alert-message {
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
      overflow-wrap: break-word;
      word-break: break-word;
    }

    .alert-action {
      flex-shrink: 0;
    }

    .alert-close-btn {
      background: none;
      border: none;
      padding: 0;
      font-size: 1.2rem;
      color: inherit;
      opacity: 0.6;
      cursor: pointer;
      transition: opacity 0.2s ease;
      align-self: flex-start;
    }

    .alert-close-btn:hover {
      opacity: 1;
    }

    /* Alert type styles */
    .alert-success {
      background-color: #d1e7dd;
      border: 1px solid #badbcc;
      color: #0f5132;
    }

    .alert-danger {
      background-color: #f8d7da;
      border: 1px solid #f5c2c7;
      color: #842029;
    }

    .alert-warning {
      background-color: #fff3cd;
      border: 1px solid #ffecb5;
      color: #664d03;
    }

    .alert-info {
      background-color: #cff4fc;
      border: 1px solid #b6effb;
      color: #055160;
    }

    /* Icon colors */
    .alert-success .alert-icon i {
      color: #198754;
    }

    .alert-danger .alert-icon i {
      color: #dc3545;
    }

    .alert-warning .alert-icon i {
      color: #ffc107;
    }

    .alert-info .alert-icon i {
      color: #0dcaf0;
    }

    /* Spinner animation for loading */
    .fa-spinner {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class Alerts implements OnInit, OnDestroy {
  private alertService = inject(AlertService);
  private subscription?: Subscription;
  
  alerts: Alert[] = [];

  ngOnInit(): void {
    this.subscription = this.alertService.alerts$.subscribe(alerts => {
      this.alerts = alerts;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  closeAlert(alertId: string): void {
    this.alertService.removeAlert(alertId);
  }

  getAlertsByPosition(position: string): Alert[] {
    return this.alerts.filter(alert => alert.options.position === position);
  }

  getIconClass(icon: string): string {
    const iconMap: { [key: string]: string } = {
      'check-circle': 'fas fa-check-circle',
      'exclamation-triangle': 'fas fa-exclamation-triangle',
      'exclamation-circle': 'fas fa-exclamation-circle',
      'info-circle': 'fas fa-info-circle',
      'question-circle': 'fas fa-question-circle',
      'spinner': 'fas fa-spinner',
      'star': 'fas fa-star'
    };

    return iconMap[icon] || 'fas fa-info-circle';
  }
} 