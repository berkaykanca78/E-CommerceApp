import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGrid, TableColumn } from './data-grid';

@Component({
  selector: 'app-data-grid-demo',
  imports: [CommonModule, DataGrid],
  template: `
    <div class="container-fluid">
      <h2 class="mb-4">Data Grid Demo</h2>
      <p class="text-muted mb-4">Bu sayfa data grid component'inin kullanımını göstermek için oluşturulmuştur.</p>
      
      <app-data-grid 
        [data]="demoData" 
        [columns]="columns"
        [showSearchAndFilters]="true"
        [categories]="categories"
        [showViewToggle]="true"
        [showAddButton]="true"
        [title]="'Sample Data'"
        [addButtonText]="'Add Item'"
        [dataGridLabel]="'Items data grid'">
      </app-data-grid>
    </div>
  `,
  styleUrls: []
})
export class DataGridDemo {
  columns: TableColumn[] = [
    { key: 'id', label: 'ID', type: 'text', sortable: true },
    { key: 'name', label: 'Name', type: 'text', sortable: true },
    { key: 'category', label: 'Category', type: 'text', sortable: true },
    { key: 'price', label: 'Price', type: 'price', sortable: true },
    { key: 'stock', label: 'Stock', type: 'stock', sortable: true },
    { key: 'isActive', label: 'Status', type: 'status', sortable: true }
  ];

  categories: string[] = ['Electronics', 'Fashion', 'Sports', 'Books'];

  demoData = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, stock: 15, isActive: true },
    { id: 2, name: 'T-Shirt', category: 'Fashion', price: 29.99, stock: 50, isActive: true },
    { id: 3, name: 'Basketball', category: 'Sports', price: 49.99, stock: 8, isActive: false },
    { id: 4, name: 'Novel', category: 'Books', price: 19.99, stock: 25, isActive: true },
    { id: 5, name: 'Smartphone', category: 'Electronics', price: 699.99, stock: 3, isActive: true },
    { id: 6, name: 'Jeans', category: 'Fashion', price: 79.99, stock: 0, isActive: false },
    { id: 7, name: 'Tennis Racket', category: 'Sports', price: 149.99, stock: 12, isActive: true },
    { id: 8, name: 'Cookbook', category: 'Books', price: 24.99, stock: 18, isActive: true },
    { id: 9, name: 'Tablet', category: 'Electronics', price: 399.99, stock: 7, isActive: true },
    { id: 10, name: 'Sneakers', category: 'Fashion', price: 129.99, stock: 22, isActive: true }
  ];
} 