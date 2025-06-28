import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-demo',
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <h2 class="mb-4">Carousel Demo</h2>
      <p class="text-muted mb-4">Various carousel and gallery implementations.</p>
      
      <div class="row g-4">
        <!-- Basic Carousel -->
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Basic Carousel</h5>
            </div>
            <div class="card-body">
              <div class="carousel-container">
                <div class="carousel" [style.transform]="'translateX(-' + (currentSlide * 100) + '%)'">
                  <div *ngFor="let slide of carouselItems; let i = index" class="carousel-slide">
                    <div class="slide-content" [style.background-image]="'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(' + slide.image + ')'">
                      <div class="slide-text">
                        <h3>{{ slide.title }}</h3>
                        <p>{{ slide.description }}</p>
                        <button *ngIf="slide.buttonText" class="btn btn-primary">{{ slide.buttonText }}</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Navigation -->
                <button class="carousel-nav prev" (click)="prevSlide()" [disabled]="currentSlide === 0">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button class="carousel-nav next" (click)="nextSlide()" [disabled]="currentSlide === carouselItems.length - 1">
                  <i class="fas fa-chevron-right"></i>
                </button>
                
                <!-- Indicators -->
                <div class="carousel-indicators">
                  <button *ngFor="let slide of carouselItems; let i = index" 
                          class="indicator" 
                          [class.active]="i === currentSlide"
                          (click)="goToSlide(i)"></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Carousel -->
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Product Carousel</h5>
            </div>
            <div class="card-body">
              <div class="product-carousel-container">
                <button class="product-nav prev" (click)="prevProduct()" [disabled]="productStartIndex === 0">
                  <i class="fas fa-chevron-left"></i>
                </button>
                
                <div class="product-carousel">
                  <div class="product-track" [style.transform]="'translateX(-' + (productStartIndex * (100 / visibleProducts)) + '%)'">
                    <div *ngFor="let product of products" class="product-item">
                      <div class="product-card">
                        <img [src]="product.image" [alt]="product.name">
                        <div class="product-info">
                          <h6>{{ product.name }}</h6>
                          <p class="price">{{ product.price | currency }}</p>
                          <div class="rating">
                            <i *ngFor="let star of getStars(product.rating)" [class]="star"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button class="product-nav next" (click)="nextProduct()" [disabled]="productStartIndex >= products.length - visibleProducts">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Image Gallery -->
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Image Gallery</h5>
            </div>
            <div class="card-body">
              <div class="image-grid">
                <div *ngFor="let image of galleryImages" class="grid-item" (click)="openLightbox(image)">
                  <div class="grid-image">
                    <img [src]="image.src" [alt]="image.alt">
                    <div class="grid-overlay">
                      <div class="grid-content">
                        <h6>{{ image.title }}</h6>
                        <p class="small">{{ image.category }}</p>
                        <button class="btn btn-sm btn-light">
                          <i class="fas fa-expand"></i> View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox Modal -->
      <div class="lightbox" [class.active]="lightboxActive" (click)="closeLightbox()">
        <div class="lightbox-content" (click)="$event.stopPropagation()">
          <button class="lightbox-close" (click)="closeLightbox()">
            <i class="fas fa-times"></i>
          </button>
          <img *ngIf="lightboxImage" [src]="lightboxImage.src" [alt]="lightboxImage.alt">
          <div class="lightbox-info" *ngIf="lightboxImage">
            <h5>{{ lightboxImage.title }}</h5>
            <p>{{ lightboxImage.category }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .carousel-container {
      position: relative;
      overflow: hidden;
      border-radius: 8px;
      height: 300px;
    }
    
    .carousel {
      display: flex;
      transition: transform 0.5s ease;
      height: 100%;
    }
    
    .carousel-slide {
      min-width: 100%;
      height: 100%;
    }
    
    .slide-content {
      height: 100%;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
    }
    
    .carousel-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0,0,0,0.5);
      color: white;
      border: none;
      padding: 10px 15px;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.3s;
    }
    
    .carousel-nav:hover:not(:disabled) {
      background: rgba(0,0,0,0.7);
    }
    
    .carousel-nav:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .carousel-nav.prev {
      left: 20px;
    }
    
    .carousel-nav.next {
      right: 20px;
    }
    
    .carousel-indicators {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
    }
    
    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: none;
      background: rgba(255,255,255,0.5);
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .indicator.active {
      background: white;
    }
    
    .image-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
    }
    
    .grid-item {
      cursor: pointer;
    }
    
    .grid-image {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
      border-radius: 8px;
    }
    
    .grid-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
    
    .grid-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    .grid-item:hover .grid-overlay {
      opacity: 1;
    }
    
    .grid-item:hover img {
      transform: scale(1.1);
    }
    
    .product-carousel-container {
      position: relative;
      display: flex;
      align-items: center;
    }
    
    .product-carousel {
      flex: 1;
      overflow: hidden;
      margin: 0 50px;
    }
    
    .product-track {
      display: flex;
      transition: transform 0.5s ease;
    }
    
    .product-item {
      min-width: calc(100% / 4);
      padding: 0 10px;
    }
    
    .product-card {
      border: 1px solid #dee2e6;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s;
    }
    
    .product-card:hover {
      transform: translateY(-5px);
    }
    
    .product-card img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    
    .product-info {
      padding: 10px;
      text-align: center;
    }
    
    .product-nav {
      background: #007bff;
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .product-nav:hover:not(:disabled) {
      background: #0056b3;
    }
    
    .product-nav:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }
    
    .lightbox.active {
      opacity: 1;
      visibility: visible;
    }
    
    .lightbox-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
    }
    
    .lightbox-content img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    
    .lightbox-close {
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }
    
    .lightbox-info {
      position: absolute;
      bottom: -60px;
      left: 0;
      color: white;
    }
    
    @media (max-width: 768px) {
      .product-item {
        min-width: calc(100% / 2);
      }
      
      .product-carousel {
        margin: 0 30px;
      }
    }
    
    @media (max-width: 576px) {
      .product-item {
        min-width: 100%;
      }
    }
  `]
})
export class CarouselDemo implements OnInit, OnDestroy {
  // Basic carousel
  currentSlide = 0;
  carouselItems = [
    {
      id: 1,
      title: 'Welcome to Our Store',
      description: 'Discover amazing products at great prices',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop',
      buttonText: 'Shop Now'
    },
    {
      id: 2,
      title: 'Summer Sale',
      description: 'Up to 50% off on selected items',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=300&fit=crop',
      buttonText: 'View Deals'
    },
    {
      id: 3,
      title: 'New Arrivals',
      description: 'Check out our latest collection',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=300&fit=crop',
      buttonText: 'Explore'
    }
  ];

  // Gallery
  selectedImage: any;
  lightboxActive = false;
  lightboxImage: any = null;
  
  galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop', alt: 'Nature 1', title: 'Mountain View', category: 'nature' },
    { id: 2, src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&h=300&fit=crop', alt: 'City 1', title: 'City Skyline', category: 'city' },
    { id: 3, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', alt: 'People 1', title: 'Portrait', category: 'people' },
    { id: 4, src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop', alt: 'Nature 2', title: 'Forest Path', category: 'nature' },
    { id: 5, src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=300&fit=crop', alt: 'City 2', title: 'Street Art', category: 'city' },
    { id: 6, src: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&h=300&fit=crop', alt: 'People 2', title: 'Group Photo', category: 'people' },
    { id: 7, src: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop', alt: 'Tech 1', title: 'Gadgets', category: 'tech' },
  ];

  // Product carousel
  productStartIndex = 0;
  visibleProducts = 4;
  products = [
    { name: 'Headphones', price: 199, rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=150&fit=crop' },
    { name: 'Smart Watch', price: 299, rating: 4.8, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=150&fit=crop' },
    { name: 'Laptop', price: 999, rating: 4.2, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=150&fit=crop' },
    { name: 'Phone', price: 699, rating: 4.6, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=150&fit=crop' },
    { name: 'Tablet', price: 499, rating: 4.3, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=150&fit=crop' },
    { name: 'Camera', price: 799, rating: 4.7, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=150&fit=crop' },
    { name: 'Speaker', price: 149, rating: 4.4, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=150&fit=crop' },
    { name: 'Monitor', price: 349, rating: 4.5, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=150&fit=crop' }
  ];

  ngOnInit() {
    this.selectedImage = this.galleryImages[0];
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  // Basic carousel methods
  nextSlide() {
    if (this.currentSlide < this.carouselItems.length - 1) {
      this.currentSlide++;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  // Gallery methods
  openLightbox(image: any) {
    this.lightboxImage = image;
    this.lightboxActive = true;
  }

  closeLightbox() {
    this.lightboxActive = false;
    this.lightboxImage = null;
  }

  // Product carousel methods
  nextProduct() {
    if (this.productStartIndex < this.products.length - this.visibleProducts) {
      this.productStartIndex++;
    }
  }

  prevProduct() {
    if (this.productStartIndex > 0) {
      this.productStartIndex--;
    }
  }

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