import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mt-3">
      <div class="d-flex align-items-center">
        <span class="me-2">Show</span>
        <select class="form-select form-select-sm" style="width: 70px" [(ngModel)]="pageSize" (change)="onPageSizeChange()">
          <option [value]="3">3</option>
          <option [value]="6">6</option>
          <option [value]="9">9</option>
          <option [value]="12">12</option>
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