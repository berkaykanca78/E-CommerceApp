import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pagination, TableColumn } from '../../shared/pagination/pagination';
import { Modal } from '../../shared/modal/modal';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  isActive: boolean;
  createdDate: Date;
}

@Component({
  selector: 'app-dashboard-products',
  imports: [CommonModule, FormsModule, Pagination, Modal],
  templateUrl: './dashboard-products.html',
  styleUrls: ['./dashboard-products.scss']
})
export class DashboardProducts implements OnInit {
  @ViewChild('addProductModal') addProductModal!: Modal;
  
  products: Product[] = [];
  categories: string[] = [];
  columns: TableColumn[] = [];
  loading = false;
  error = '';
  viewMode: 'grid' | 'table' = 'table';
  currentPage = 1;
  itemsPerPage = 12;
  paginatedProducts: Product[] = [];

  // New product form data
  newProduct: Partial<Product> = {
    name: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    isActive: true
  };

  availableCategories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Sports', 'Books', 'Beauty', 'Toys', 'Automotive', 'Health', 'Music', 'Gaming', 'Accessories'];

  Math = Math;

  ngOnInit() {
    this.initializeColumns();
    this.loadProducts();
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
        label: 'Product Name',
        type: 'product-name',
        descriptionKey: 'description'
      },
      {
        key: 'category',
        label: 'Category',
        type: 'badge',
        badgeConfig: {
          default: { class: 'bg-info', text: '' }
        }
      },
      {
        key: 'price',
        label: 'Price',
        type: 'price'
      },
      {
        key: 'stock',
        label: 'Stock',
        type: 'stock'
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

  loadProducts() {
    this.loading = true;
    this.error = '';

    try {
      this.products = [
          {
            id: 1,
            name: 'Premium Wireless Headphones',
            description: 'High-quality wireless headphones with noise cancellation',
            category: 'Electronics',
            price: 299.99,
            stock: 25,
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-01-15')
          },
          {
            id: 2,
            name: 'Smart Fitness Watch',
            description: 'Advanced fitness tracker with heart rate monitoring',
            category: 'Electronics',
            price: 199.99,
            stock: 0,
            imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-01-20')
          },
          {
            id: 3,
            name: 'Organic Cotton T-Shirt',
            description: 'Comfortable organic cotton t-shirt in various colors',
            category: 'Clothing',
            price: 29.99,
            stock: 150,
            imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-02-01')
          },
          {
            id: 4,
            name: 'Professional Camera Lens',
            description: '85mm f/1.4 portrait lens for professional photography',
            category: 'Electronics',
            price: 899.99,
            stock: 8,
            imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop&q=80',
            isActive: false,
            createdDate: new Date('2024-02-05')
          },
          {
            id: 5,
            name: 'Leather Laptop Bag',
            description: 'Genuine leather laptop bag with multiple compartments',
            category: 'Accessories',
            price: 149.99,
            stock: 45,
            imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-02-10')
          },
          {
            id: 6,
            name: 'Wireless Gaming Mouse',
            description: 'High-precision wireless gaming mouse with RGB lighting',
            category: 'Electronics',
            price: 79.99,
            stock: 32,
            imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-02-15')
          },
          {
            id: 7,
            name: 'Yoga Mat Premium',
            description: 'Non-slip premium yoga mat with carrying strap',
            category: 'Sports',
            price: 49.99,
            stock: 75,
            imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-02-20')
          },
          {
            id: 8,
            name: 'Coffee Maker Deluxe',
            description: 'Programmable coffee maker with thermal carafe',
            category: 'Home & Kitchen',
            price: 129.99,
            stock: 18,
            imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-02-25')
          },
          {
            id: 9,
            name: 'Designer Sunglasses',
            description: 'UV protection designer sunglasses with polarized lenses',
            category: 'Accessories',
            price: 189.99,
            stock: 5,
            imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop&q=80',
            isActive: false,
            createdDate: new Date('2024-03-01')
          },
          {
            id: 10,
            name: 'Bluetooth Speaker',
            description: 'Portable waterproof bluetooth speaker with bass boost',
            category: 'Electronics',
            price: 69.99,
            stock: 55,
            imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-03-05')
          },
          {
            id: 11,
            name: 'Running Shoes Pro',
            description: 'Professional running shoes with advanced cushioning',
            category: 'Sports',
            price: 159.99,
            stock: 28,
            imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-03-10')
          },
          {
            id: 12,
            name: 'Kitchen Knife Set',
            description: 'Professional chef knife set with wooden block',
            category: 'Home & Kitchen',
            price: 89.99,
            stock: 12,
            imageUrl: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-03-15')
          },
          {
            id: 13,
            name: 'Winter Jacket',
            description: 'Waterproof winter jacket with thermal insulation',
            category: 'Clothing',
            price: 199.99,
            stock: 0,
            imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-03-20')
          },
          {
            id: 14,
            name: 'Gaming Keyboard',
            description: 'Mechanical gaming keyboard with RGB backlighting',
            category: 'Electronics',
            price: 119.99,
            stock: 22,
            imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop&q=80',
            isActive: true,
            createdDate: new Date('2024-03-25')
          },
          {
            id: 15,
            name: 'Travel Backpack',
            description: 'Durable travel backpack with laptop compartment',
            category: 'Accessories',
            price: 79.99,
            stock: 38,
            imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&q=80',
            isActive: false,
            createdDate: new Date('2024-03-30')
          }
        ];

      // Extract unique categories
      this.categories = [...new Set(this.products.map(p => p.category))];
      
      this.loading = false;
    } catch (err) {
      this.error = 'Failed to load products. Please try again.';
      this.loading = false;
    }
  }

  trackByProductId = (index: number, product: Product): number => {
    return product.id;
  }

  onViewModeChange(mode: 'grid' | 'table') {
    this.viewMode = mode;
  }

  onPaginatedDataChange(paginatedData: Product[]) {
    this.paginatedProducts = paginatedData;
  }

  addProduct() {
    this.resetNewProductForm();
    this.addProductModal.show();
  }

  resetNewProductForm() {
    this.newProduct = {
      name: '',
      description: '',
      category: '',
      price: 0,
      stock: 0,
      imageUrl: '',
      isActive: true
    };
  }

  saveNewProduct() {
    if (this.validateProductForm()) {
      const newId = Math.max(...this.products.map(p => p.id)) + 1;
      const productToAdd: Product = {
        id: newId,
        name: this.newProduct.name!,
        description: this.newProduct.description!,
        category: this.newProduct.category!,
        price: this.newProduct.price!,
        stock: this.newProduct.stock!,
        imageUrl: this.newProduct.imageUrl || 'https://via.placeholder.com/400x300',
        isActive: this.newProduct.isActive!,
        createdDate: new Date()
      };
      
      this.products.push(productToAdd);
      this.addProductModal.hide();
      this.resetNewProductForm();
      
      // Show success message
      console.log('Product added successfully:', productToAdd);
    }
  }

  validateProductForm(): boolean {
    return !!(this.newProduct.name && 
              this.newProduct.description && 
              this.newProduct.category && 
              this.newProduct.price !== undefined && 
              this.newProduct.price > 0 &&
              this.newProduct.stock !== undefined && 
              this.newProduct.stock >= 0);
  }

  cancelAddProduct() {
    this.addProductModal.hide();
    this.resetNewProductForm();
  }

  editProduct(product: Product) {
    console.log('Edit product:', product);
    // Implement edit product logic
  }

  toggleStatus(product: Product) {
    console.log('Toggle status for product:', product);
    // Find the product in the array and toggle its status
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index].isActive = !this.products[index].isActive;
    }
  }

  deleteProduct(product: Product) {
    console.log('Delete product:', product);
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.products = this.products.filter(p => p.id !== product.id);
    }
  }
} 