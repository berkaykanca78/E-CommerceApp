import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagination } from './pagination';

@Component({
  selector: 'app-pagination-demo',
  standalone: true,
  imports: [CommonModule, Pagination],
  template: `
    <div class="container mt-5">
      <h2 class="mb-4">Pagination Demo</h2>
      <p class="text-muted mb-4">Bu sayfa pagination component'inin kullanımını göstermek için oluşturulmuştur.</p>
      <app-pagination
        [currentPage]="currentPage"
        [totalItems]="items.length"
        [pageSize]="itemsPerPage"
        [totalPages]="totalPages"
        [hasNextPage]="hasNextPage"
        [hasPreviousPage]="hasPreviousPage"
        [columns]="columns"
        [rows]="pagedRows"
        (pageChange)="onPageChange($event)"
        (pageSizeChange)="onPageSizeChange($event)">
      </app-pagination>
    </div>
  `
})
export class PaginationDemo {
  items = Array.from({ length: 42 }, (_, i) => ({ id: i + 1, name: `Item #${i + 1}`, desc: `Açıklama ${i + 1}` }));
  itemsPerPage = 9;
  currentPage = 1;
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'İsim' },
    { key: 'desc', label: 'Açıklama' }
  ];

  get totalPages() {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }

  get hasNextPage() {
    return this.currentPage < this.totalPages;
  }

  get hasPreviousPage() {
    return this.currentPage > 1;
  }

  get pagedRows() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.items.slice(start, start + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onPageSizeChange(size: number) {
    this.itemsPerPage = size;
    this.currentPage = 1;
  }
} 