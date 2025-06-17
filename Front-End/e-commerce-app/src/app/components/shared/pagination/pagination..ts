import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="d-flex justify-content-center mt-3">
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" [class.disabled]="!hasPreviousPage">
          <a class="page-link" (click)="onPageChange(currentPage - 1)" style="cursor: pointer">Previous</a>
        </li>
        <li class="page-item" *ngFor="let page of pages" [class.active]="page === currentPage">
          <a class="page-link" (click)="onPageChange(page)" style="cursor: pointer">{{page}}</a>
        </li>
        <li class="page-item" [class.disabled]="!hasNextPage">
          <a class="page-link" (click)="onPageChange(currentPage + 1)" style="cursor: pointer">Next</a>
        </li>
      </ul>
    </nav>
  </div>
  `
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() hasPreviousPage: boolean = false;
  @Input() hasNextPage: boolean = false;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
} 