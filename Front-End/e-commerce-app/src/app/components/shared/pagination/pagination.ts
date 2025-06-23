import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="table-responsive mb-2">
      <table class="table table-striped">
        <thead>
          <tr>
            <th *ngFor="let col of columns">{{ col.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td *ngFor="let col of columns">{{ row[col.key] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-3 mb-2">
      <div class="d-flex align-items-center">
        <span class="me-2">Show</span>
        <select class="form-select form-select-sm" style="width: 70px" [(ngModel)]="pageSize" (change)="onPageSizeChange()">
          <option *ngFor="let option of pageSizeOptions" [value]="option">{{ option }}</option>
        </select>
        <span class="ms-2">entries</span>
      </div>
      <div class="d-flex align-items-center">
        <span class="me-3">
          Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, totalItems) }} of {{ totalItems }} entries
        </span>
        <nav aria-label="Page navigation">
          <ul class="pagination mb-0">
            <li class="page-item" [class.disabled]="currentPage === 1">
              <a class="page-link" (click)="onPageChange(1)" style="cursor: pointer">
                <i class="fas fa-angle-double-left"></i>
              </a>
            </li>
            <li class="page-item" [class.disabled]="!hasPreviousPage">
              <a class="page-link" (click)="onPageChange(currentPage - 1)" style="cursor: pointer">
                <i class="fas fa-angle-left"></i>
              </a>
            </li>
            <li class="page-item" *ngFor="let page of pages" [class.active]="page === currentPage">
              <a class="page-link" (click)="onPageChange(page)" style="cursor: pointer">{{page}}</a>
            </li>
            <li class="page-item" [class.disabled]="!hasNextPage">
              <a class="page-link" (click)="onPageChange(currentPage + 1)" style="cursor: pointer">
                <i class="fas fa-angle-right"></i>
              </a>
            </li>
            <li class="page-item" [class.disabled]="currentPage === totalPages">
              <a class="page-link" (click)="onPageChange(totalPages)" style="cursor: pointer">
                <i class="fas fa-angle-double-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  styles: [`
    .pagination {
      margin-bottom: 0;
    }
    .page-link {
      padding: 0.375rem 0.75rem;
    }
    .page-item.disabled .page-link {
      cursor: not-allowed;
    }
    .form-select-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }
    @media (max-width: 900px) {
      .d-flex.justify-content-between.align-items-center.mt-3.mb-2 {
        flex-direction: column;
        align-items: stretch;
        gap: 0.7rem;
      }
      .d-flex.align-items-center {
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    }
    @media (max-width: 600px) {
      .d-flex.justify-content-between.align-items-center.mt-3.mb-2 {
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
        margin-top: 0.7rem !important;
        margin-bottom: 0.5rem !important;
      }
      .d-flex.align-items-center {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.3rem;
      }
      .table-responsive {
        font-size: 0.93rem;
      }
      .form-select-sm {
        width: 100% !important;
        min-width: 0;
      }
      .pagination {
        flex-wrap: wrap;
      }
      .page-link {
        font-size: 0.95rem;
        padding: 0.25rem 0.5rem;
      }
    }
  `]
})
export class Pagination {
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 4;
  @Input() totalPages: number = 0;
  @Input() hasNextPage: boolean = false;
  @Input() hasPreviousPage: boolean = false;
  @Input() searchQuery: string = '';
  @Input() columns: { key: string, label: string }[] = [];
  @Input() rows: any[] = [];
  @Input() pageSizeOptions: number[] = [3, 6, 9, 12];
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  Math = Math;

  get pages(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }

  onPageSizeChange(): void {
    this.pageSizeChange.emit(this.pageSize);
  }
} 