import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards-demo',
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <h2 class="mb-4">Cards Demo</h2>
      <p class="text-muted mb-4">Various card layouts and styles for different use cases.</p>
      
      <div class="row g-4">
        <!-- Basic Cards -->
        <div class="col-12">
          <h4 class="mb-3">Basic Cards</h4>
          <div class="row g-3">
           
            <div class="col-lg-4 col-md-6">
              <div class="card">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=180&fit=crop" class="card-img-top" alt="Card image">
                <div class="card-body">
                  <h5 class="card-title">Card with Image</h5>
                  <p class="card-text">This card includes an image at the top.</p>
                  <a href="#" class="btn btn-success">Learn More</a>
                </div>
              </div>
            </div>
            
            <div class="col-lg-4 col-md-6">
              <div class="card">
                <div class="card-header">
                  <h6 class="mb-0">Card Header</h6>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Header Card</h5>
                  <p class="card-text">This card has a header section.</p>
                </div>
                <div class="card-footer text-muted">
                  2 days ago
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Basic Card</h5>
                  <p class="card-text">This is a basic card with just a title and text content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="col-12">
          <h4 class="mb-3">Statistics Cards</h4>
          <div class="row g-3">
            <div class="col-lg-3 col-md-6" *ngFor="let stat of stats">
              <div class="card stat-card h-100" [style.border-left-color]="stat.color">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="stat-icon me-3" [style.background-color]="stat.color + '20'" [style.color]="stat.color">
                      <i [class]="stat.icon"></i>
                    </div>
                    <div>
                      <h3 class="mb-1">{{ stat.value }}</h3>
                      <p class="text-muted mb-0">{{ stat.label }}</p>
                    </div>
                  </div>
                  <div class="progress mt-3" style="height: 4px;">
                    <div class="progress-bar" [style.background-color]="stat.color" [style.width.%]="stat.progress"></div>
                  </div>
                  <small class="text-muted">{{ stat.change }}% from last month</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Cards -->
        <div class="col-12">
          <h4 class="mb-3">Product Cards</h4>
          <div class="row g-3">
            <div class="col-lg-3 col-md-6" *ngFor="let product of products">
              <div class="card product-card h-100">
                <div class="position-relative">
                  <img [src]="product.image" class="card-img-top" [alt]="product.name">
                  <span class="badge bg-danger position-absolute top-0 end-0 m-2" *ngIf="product.discount">
                    -{{ product.discount }}%
                  </span>
                  <span class="badge bg-success position-absolute top-0 start-0 m-2" *ngIf="product.isNew">
                    New
                  </span>
                </div>
                <div class="card-body d-flex flex-column">
                  <h6 class="card-title">{{ product.name }}</h6>
                  <p class="card-text text-muted small flex-grow-1">{{ product.description }}</p>
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <span class="text-muted text-decoration-line-through small" *ngIf="product.originalPrice">
                        {{ product.originalPrice | currency }}
                      </span>
                      <span class="fw-bold text-primary ms-1">{{ product.price | currency }}</span>
                    </div>
                    <div class="text-warning">
                      <i *ngFor="let star of getStars(product.rating)" [class]="star"></i>
                      <span class="small text-muted ms-1">({{ product.reviews }})</span>
                    </div>
                  </div>
                  <button class="btn btn-outline-primary btn-sm">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pricing Cards -->
        <div class="col-12">
          <h4 class="mb-3">Pricing Cards</h4>
          <div class="row g-3 justify-content-center">
            <div class="col-lg-4 col-md-6" *ngFor="let plan of pricingPlans">
              <div class="card pricing-card h-100" [class.border-primary]="plan.popular" [class.shadow-lg]="plan.popular">
                <div class="card-header text-center" [class.bg-primary]="plan.popular" [class.text-white]="plan.popular">
                  <span class="badge bg-warning text-dark mb-2" *ngIf="plan.popular">Most Popular</span>
                  <h5 class="mb-0">{{ plan.name }}</h5>
                </div>
                <div class="card-body text-center">
                  <div class="price mb-3">
                    <span class="display-4 fw-bold">{{ plan.price | currency }}</span>
                    <span class="text-muted">/month</span>
                  </div>
                  <ul class="list-unstyled">
                    <li *ngFor="let feature of plan.features" class="mb-2">
                      <i class="fas fa-check text-success me-2"></i>{{ feature }}
                    </li>
                  </ul>
                </div>
                <div class="card-footer text-center">
                  <button class="btn w-100" [class.btn-primary]="plan.popular" [class.btn-outline-primary]="!plan.popular">
                    Choose Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stat-card {
      border-left: 4px solid;
      transition: transform 0.2s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-2px);
    }
    
    .stat-icon {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    
    .product-card {
      transition: transform 0.2s ease;
    }
    
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }
    
    .pricing-card {
      transition: transform 0.3s ease;
    }
    
    .pricing-card:hover {
      transform: scale(1.05);
    }
  `]
})
export class CardsDemo {
  stats = [
    { icon: 'fas fa-users', value: '1,234', label: 'Total Users', color: '#007bff', progress: 75, change: 12 },
    { icon: 'fas fa-shopping-cart', value: '567', label: 'Orders', color: '#28a745', progress: 85, change: 8 },
    { icon: 'fas fa-dollar-sign', value: '$12,345', label: 'Revenue', color: '#ffc107', progress: 65, change: 15 },
    { icon: 'fas fa-chart-line', value: '89%', label: 'Growth', color: '#dc3545', progress: 90, change: 5 }
  ];

  products = [
    {
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation.',
      price: 199,
      originalPrice: 249,
      discount: 20,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
      isNew: false
    },
    {
      name: 'Smart Watch',
      description: 'Latest smartwatch with health monitoring features.',
      price: 299,
      originalPrice: null,
      discount: null,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
      isNew: true
    },
    {
      name: 'Laptop Stand',
      description: 'Adjustable aluminum laptop stand for better ergonomics.',
      price: 79,
      originalPrice: 99,
      discount: 20,
      rating: 4.2,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop',
      isNew: false
    },
    {
      name: 'USB-C Hub',
      description: 'Multi-port USB-C hub with HDMI and ethernet support.',
      price: 49,
      originalPrice: null,
      discount: null,
      rating: 4.6,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=200&fit=crop',
      isNew: true
    }
  ];

  pricingPlans = [
    {
      name: 'Basic',
      price: 9,
      popular: false,
      features: [
        '10 Projects',
        '5GB Storage',
        'Email Support',
        'Basic Analytics'
      ]
    },
    {
      name: 'Pro',
      price: 29,
      popular: true,
      features: [
        'Unlimited Projects',
        '100GB Storage',
        'Priority Support',
        'Advanced Analytics',
        'Team Collaboration'
      ]
    },
    {
      name: 'Enterprise',
      price: 99,
      popular: false,
      features: [
        'Unlimited Projects',
        '1TB Storage',
        '24/7 Phone Support',
        'Custom Analytics',
        'Advanced Security',
        'API Access'
      ]
    }
  ];

  getStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('fas fa-star');
    }
    
    if (hasHalfStar) {
      stars.push('fas fa-star-half-alt');
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push('far fa-star');
    }
    
    return stars;
  }
} 