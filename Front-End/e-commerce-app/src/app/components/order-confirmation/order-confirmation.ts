import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Cart } from '../../services/cart';

interface OrderDetails {
  orderNumber: string;
  orderDate: Date;
  customerName: string;
  shippingAddress: any;
  billingAddress: any;
  paymentMethod: string;
  items: any[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  estimatedDelivery: Date;
}

@Component({
  selector: 'app-order-confirmation',
  imports: [CommonModule],
  templateUrl: './order-confirmation.html',
  styleUrls: ['./order-confirmation.scss']
})
export class OrderConfirmation implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly cartService = inject(Cart);

  orderDetails: OrderDetails | null = null;
  isLoading = true;

  ngOnInit(): void {
    // Gerçek uygulamada bu veriler API'den gelecek veya route parameterlerinden alınacak
    this.loadOrderDetails();
  }

  private loadOrderDetails(): void {
    // Simüle edilmiş sipariş detayları
    this.orderDetails = {
      orderNumber: this.generateOrderNumber(),
      orderDate: new Date(),
      customerName: 'John Doe', // Bu gerçek uygulamada auth service'den gelecek
      shippingAddress: {
        fullName: 'John Doe',
        addressLine1: '123 Main Street, Apt 4B',
        city: 'New York',
        zipCode: '10001',
        country: 'United States'
      },
      billingAddress: {
        fullName: 'John Doe',
        addressLine1: '123 Main Street, Apt 4B',
        city: 'New York',
        zipCode: '10001',
        country: 'United States'
      },
      paymentMethod: '**** **** **** 1234',
      items: [
        {
          id: 1,
          name: 'Premium Wireless Headphones',
          price: 299.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&crop=center'
        },
        {
          id: 2,
          name: 'Bluetooth Speaker',
          price: 89.99,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=80&h=80&fit=crop&crop=center'
        },
        {
          id: 3,
          name: 'Smart Watch',
          price: 199.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&crop=center'
        }
      ],
      subtotal: 679.96,
      shipping: 19.99,
      tax: 119.39,
      total: 819.34,
      estimatedDelivery: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)) // 7 gün sonra
    };
    this.isLoading = false;

    // Sepeti temizle
    this.cartService.clearCart();
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${timestamp.slice(-6)}${random}`;
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  trackOrder(): void {
    this.router.navigate(['/customer-services/track-order']);
  }

  downloadInvoice(): void {
    // PDF fatura indirme işlemi burada yapılacak
    console.log('Downloading invoice for order:', this.orderDetails?.orderNumber);
  }
} 