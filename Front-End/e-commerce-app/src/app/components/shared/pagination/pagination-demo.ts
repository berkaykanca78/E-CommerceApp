import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagination, TableColumn } from './pagination';

@Component({
  selector: 'app-pagination-demo',
  imports: [CommonModule, Pagination],
  template: `
    <div class="container mt-5">
      <h2 class="mb-4">Pagination Demo</h2>
      <p class="text-muted mb-4">Bu sayfa pagination component'inin kullanımını göstermek için oluşturulmuştur.</p>
      <app-pagination
        [data]="items"
        [columns]="columns"
        [showStatusFilter]="false"
        [showCategoryFilter]="false"
        [showActions]="false"
        [searchPlaceholder]="'Search items...'"
        [emptyStateIcon]="'fas fa-inbox'"
        [emptyStateTitle]="'No items found'"
        [emptyStateMessage]="'Try adjusting your search criteria'"
        [paginationLabel]="'Items pagination'">
      </app-pagination>
    </div>
  `
})
export class PaginationDemo {
  items = Array.from({ length: 42 }, (_, i) => ({ 
    id: i + 1, 
    name: `Item #${i + 1}`, 
    desc: `Açıklama ${i + 1}` 
  }));
  
  columns: TableColumn[] = [
    { key: 'id', label: 'ID', type: 'badge' },
    { key: 'name', label: 'İsim', type: 'text' },
    { key: 'desc', label: 'Açıklama', type: 'text' }
  ];
} 