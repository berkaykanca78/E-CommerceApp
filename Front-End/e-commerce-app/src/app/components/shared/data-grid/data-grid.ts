import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'badge' | 'image' | 'product-name' | 'price' | 'stock' | 'date' | 'status';
  sortable?: boolean;
  badgeConfig?: { [key: string]: { class: string; text: string } };
  descriptionKey?: string;
  altKey?: string;
}

@Component({
  selector: 'app-data-grid',
  imports: [CommonModule, FormsModule],
  templateUrl: './data-grid.html',
  styleUrls: ['./data-grid.scss']
})
export class DataGrid implements OnInit, OnChanges {
  // Data Properties
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  
  // View Mode Properties
  @Input() viewMode: 'grid' | 'table' = 'grid';
  @Input() showViewToggle: boolean = true;
  @Input() title: string = ''; // Title to display between view mode buttons
  @Input() showAddButton: boolean = false; // Show add button
  @Input() addButtonText: string = 'Add'; // Add button text
  @Input() addButtonIcon: string = 'fas fa-plus'; // Add button icon
  @Output() viewModeChange = new EventEmitter<'grid' | 'table'>();
  @Output() addButtonClick = new EventEmitter<void>(); // Add button click event
  
  // Pagination Properties
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 6;
  @Input() pageSizeOptions: number[] = [6, 12, 18, 24];
  @Input() totalItems: number = 0;
  @Input() serverSideDataGrid: boolean = false; // For API data grid
  
  // Search and Filter Properties
  @Input() searchTerm: string = '';
  @Input() searchPlaceholder: string = 'Search...';
  @Input() statusFilter: string = 'all';
  @Input() categoryFilter: string = 'all';
  @Input() categories: string[] = [];
  
  // Filter Controls
  @Input() showStatusFilter: boolean = true;
  @Input() showCategoryFilter: boolean = true;
  @Input() showSearchAndFilters: boolean = false;
  
  // Filter Expand/Collapse State
  filtersExpanded: boolean = false;
  
  // Sorting Properties
  @Input() sortField: string = '';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';
  
  // Actions Properties
  @Input() showActions: boolean = true;
  @Input() actions: string[] = ['edit', 'toggle', 'delete'];
  @Input() statusKey: string = 'isActive';
  
  // State Properties
  @Input() loading: boolean = false;
  @Input() error: string = '';
  @Input() loadingText: string = 'Loading...';
  
  // Empty State Properties
  @Input() emptyStateIcon: string = 'fas fa-inbox';
  @Input() emptyStateTitle: string = 'No data found';
  @Input() emptyStateMessage: string = 'Try adjusting your search or filter criteria';
  
  // Data Grid Label
  @Input() dataGridLabel: string = 'Data grid';
  
  // Hide table (show only controls) - deprecated, use viewMode instead
  @Input() hideTable: boolean = false;
  
  // Events
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() statusFilterChange = new EventEmitter<string>();
  @Output() categoryFilterChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<{ field: string; direction: 'asc' | 'desc' }>();
  @Output() editItem = new EventEmitter<any>();
  @Output() toggleStatus = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();
  @Output() dataGridDataChange = new EventEmitter<any[]>();

  // Computed Properties
  filteredData: any[] = [];
  dataGridData: any[] = [];
  totalPages: number = 0;

  Math = Math;

  ngOnInit() {
    this.updateData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['searchTerm'] || changes['statusFilter'] || changes['categoryFilter'] || changes['totalItems'] || changes['currentPage'] || changes['serverSideDataGrid']) {
      this.updateData();
    }
  }

  updateData() {
    // Handle empty data
    if (!this.data || this.data.length === 0) {
      this.filteredData = [];
      this.dataGridData = [];
      // Use input totalItems if provided, otherwise 0
      if (!this.totalItems) {
        this.totalItems = 0;
      }
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.dataGridDataChange.emit(this.dataGridData);
      return;
    }

    // Apply filters
    this.filteredData = this.data.filter(item => {
      // Search filter
      const matchesSearch = this.searchTerm === '' || 
        this.columns.some(col => {
          const value = item[col.key];
          if (col.type === 'product-name' && col.descriptionKey) {
            return String(value).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                   String(item[col.descriptionKey]).toLowerCase().includes(this.searchTerm.toLowerCase());
          }
          return String(value).toLowerCase().includes(this.searchTerm.toLowerCase());
        });

      // Status filter
      const matchesStatus = this.statusFilter === 'all' || 
        (this.statusFilter === 'active' && item[this.statusKey]) ||
        (this.statusFilter === 'inactive' && !item[this.statusKey]);

      // Category filter
      const matchesCategory = this.categoryFilter === 'all' || 
        item.category === this.categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    // Apply sorting
    if (this.sortField) {
      this.filteredData.sort((a, b) => {
        const aVal = a[this.sortField];
        const bVal = b[this.sortField];
        
        let comparison = 0;
        if (aVal > bVal) comparison = 1;
        if (aVal < bVal) comparison = -1;
        
        return this.sortDirection === 'desc' ? -comparison : comparison;
      });
    }

    // Use input totalItems if provided and no filters are applied, otherwise use filtered data length
    if (this.totalItems > 0 && this.searchTerm === '' && this.statusFilter === 'all' && this.categoryFilter === 'all') {
      // Use input totalItems from API
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    } else {
      // Use filtered data length for local filtering
      this.totalItems = this.filteredData.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    }

    // Ensure current page is valid
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = 1;
    }

    // Apply data grid
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    
    if (this.serverSideDataGrid) {
      // For API data grid, data is already paginated
      this.dataGridData = this.filteredData;
    } else {
      // For local data grid, slice the data
      this.dataGridData = this.filteredData.slice(startIndex, endIndex);
    }
    
    // Emit data grid data
    this.dataGridDataChange.emit(this.dataGridData);
  }

  // Event Handlers
  onSearch() {
    this.currentPage = 1;
    this.updateData();
    this.searchChange.emit(this.searchTerm);
  }

  onStatusFilterChange() {
    this.currentPage = 1;
    this.updateData();
    this.statusFilterChange.emit(this.statusFilter);
  }

  onCategoryFilterChange() {
    this.currentPage = 1;
    this.updateData();
    this.categoryFilterChange.emit(this.categoryFilter);
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.updateData();
    this.pageSizeChange.emit(this.itemsPerPage);
  }

  onSort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.updateData();
    this.sortChange.emit({ field: this.sortField, direction: this.sortDirection });
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.updateData();
      this.pageChange.emit(this.currentPage);
    }
  }

  onViewModeChange(mode: 'grid' | 'table') {
    this.viewMode = mode;
    this.viewModeChange.emit(mode);
  }

  onAddButtonClick() {
    this.addButtonClick.emit();
  }

  // Filter toggle
  toggleFilters() {
    this.filtersExpanded = !this.filtersExpanded;
  }

  onEdit(item: any) {
    this.editItem.emit(item);
  }

  onToggleStatus(item: any) {
    this.toggleStatus.emit(item);
  }

  onDelete(item: any) {
    this.deleteItem.emit(item);
  }

  // Helper methods
  getDataGridArray(): number[] {
    const maxPagesToShow = 5;
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;

    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    const adjustedStartPage = Math.max(1, endPage - maxPagesToShow + 1);

    return Array.from({ length: endPage - adjustedStartPage + 1 }, (_, i) => adjustedStartPage + i);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getBadgeClass(value: any, config?: { [key: string]: { class: string; text: string } }): string {
    if (config && config[value]) {
      return config[value].class;
    }
    return value ? 'bg-success' : 'bg-danger';
  }

  getBadgeText(value: any, config?: { [key: string]: { class: string; text: string } }): string {
    if (config && config[value]) {
      return config[value].text;
    }
    return value ? 'Active' : 'Inactive';
  }

  getStockBadgeClass(stock: number): string {
    if (stock <= 0) return 'bg-danger';
    if (stock <= 10) return 'bg-warning';
    return 'bg-success';
  }

  getStockText(stock: number): string {
    if (stock <= 0) return 'Out of Stock';
    if (stock <= 10) return 'Low Stock';
    return 'In Stock';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }
} 