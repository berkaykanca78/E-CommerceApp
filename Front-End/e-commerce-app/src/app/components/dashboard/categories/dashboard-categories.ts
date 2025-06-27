import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pagination, TableColumn } from '../../shared/pagination/pagination';

interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdDate: Date;
}

@Component({
  selector: 'app-dashboard-categories',
  imports: [CommonModule, FormsModule, Pagination],
  templateUrl: './dashboard-categories.html',
  styleUrls: ['./dashboard-categories.scss']
})
export class DashboardCategories implements OnInit {
  categories: Category[] = [];
  columns: TableColumn[] = [];
  loading = false;
  error = '';
  viewMode: 'grid' | 'table' = 'table';
  currentPage = 1;
  itemsPerPage = 12;
  paginatedCategories: Category[] = [];

  Math = Math;

  ngOnInit() {
    this.initializeColumns();
    this.loadCategories();
  }

  initializeColumns() {
    this.columns = [
      {
        key: 'id',
        label: 'ID',
        type: 'badge',
        badgeConfig: {
          default: { class: 'bg-secondary', text: '' }
        }
      },
      {
        key: 'imageUrl',
        label: 'Image',
        type: 'image',
        altKey: 'name',
        sortable: false
      },
      {
        key: 'name',
        label: 'Category Name',
        type: 'product-name',
        descriptionKey: 'description'
      },
      {
        key: 'isActive',
        label: 'Status',
        type: 'status'
      },
      {
        key: 'createdDate',
        label: 'Created Date',
        type: 'date'
      }
    ];
  }

  loadCategories() {
    this.loading = true;
    this.error = '';

    try {
      this.categories = [
          {
            id: 1,
            name: 'Electronics',
            description: 'Electronic devices, gadgets and accessories',
            imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-01-10')
          },
          {
            id: 2,
            name: 'Clothing',
            description: 'Fashion and apparel for all ages',
            imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-01-15')
          },
          {
            id: 3,
            name: 'Home & Kitchen',
            description: 'Home appliances and kitchen essentials',
            imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-01-20')
          },
          {
            id: 4,
            name: 'Sports',
            description: 'Sports equipment and fitness gear',
            imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-01-25')
          },
          {
            id: 5,
            name: 'Books',
            description: 'Books, magazines and educational materials',
            imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&q=80',
            isActive: false,
            createdDate: new Date('2024-02-01')
          },
          {
            id: 6,
            name: 'Beauty',
            description: 'Cosmetics and personal care products',
            imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-02-05')
          },
          {
            id: 7,
            name: 'Toys',
            description: 'Toys and games for children',
            imageUrl: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-02-10')
          },
          {
            id: 8,
            name: 'Automotive',
            description: 'Car parts and automotive accessories',
            imageUrl: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-02-15')
          },
          {
            id: 9,
            name: 'Health',
            description: 'Health and wellness products',
            imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&q=80',
            isActive: false,
            createdDate: new Date('2024-02-20')
          },
          {
            id: 10,
            name: 'Music',
            description: 'Musical instruments and audio equipment',
            imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-02-25')
          },
          {
            id: 11,
            name: 'Gaming',
            description: 'Video games and gaming accessories',
            imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-03-01')
          },
          {
            id: 12,
            name: 'Accessories',
            description: 'Fashion accessories and lifestyle products',
            imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-03-05')
          }
        ];

      this.loading = false;
    } catch (err) {
      this.error = 'Failed to load categories. Please try again.';
      this.loading = false;
    }
  }

  trackByCategoryId = (index: number, category: Category): number => {
    return category.id;
  }

  onViewModeChange(mode: 'grid' | 'table') {
    this.viewMode = mode;
  }

  onPaginatedDataChange(paginatedData: Category[]) {
    this.paginatedCategories = paginatedData;
  }

  addCategory() {
    console.log('Add category clicked');
    // Implement add category logic
  }

  editCategory(category: Category) {
    console.log('Edit category:', category);
    // Implement edit category logic
  }

  toggleStatus(category: Category) {
    console.log('Toggle status for category:', category);
    // Find the category in the array and toggle its status
    const index = this.categories.findIndex(c => c.id === category.id);
    if (index !== -1) {
      this.categories[index].isActive = !this.categories[index].isActive;
    }
  }

  deleteCategory(category: Category) {
    console.log('Delete category:', category);
    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      this.categories = this.categories.filter(c => c.id !== category.id);
    }
  }
} 