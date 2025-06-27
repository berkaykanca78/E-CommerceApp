import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-track-order',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './track-order.html',
  styleUrls: ['./track-order.scss']
})
export class TrackOrder {
  trackingForm = {
    orderNumber: '',
    email: ''
  };

  trackingResult: any = null;
  isLoading = false;
  errorMessage = '';

  // Sample tracking data (in real app, this would come from API)
  sampleOrders = [
    {
      orderNumber: 'ORD-123456789',
      email: 'john@example.com',
      status: 'delivered',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-20',
      totalAmount: 299.99,
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 199.99 },
        { name: 'Phone Case', quantity: 2, price: 50.00 }
      ],
      trackingSteps: [
        {
          status: 'Order Placed',
          date: '2024-01-15 10:30 AM',
          description: 'Your order has been placed successfully',
          icon: 'fas fa-shopping-cart',
          completed: true
        },
        {
          status: 'Payment Confirmed',
          date: '2024-01-15 10:35 AM',
          description: 'Payment has been processed',
          icon: 'fas fa-credit-card',
          completed: true
        },
        {
          status: 'Processing',
          date: '2024-01-16 09:00 AM',
          description: 'Your order is being prepared',
          icon: 'fas fa-cogs',
          completed: true
        },
        {
          status: 'Shipped',
          date: '2024-01-17 02:15 PM',
          description: 'Your order has been shipped',
          icon: 'fas fa-shipping-fast',
          completed: true
        },
        {
          status: 'Out for Delivery',
          date: '2024-01-20 08:00 AM',
          description: 'Your order is out for delivery',
          icon: 'fas fa-truck',
          completed: true
        },
        {
          status: 'Delivered',
          date: '2024-01-20 03:45 PM',
          description: 'Order delivered successfully',
          icon: 'fas fa-check-circle',
          completed: true
        }
      ],
      shippingAddress: {
        name: 'John Smith',
        address: '123 Main Street',
        city: 'Ankara',
        state: 'Çankaya',
        zipCode: '06100',
        country: 'Türkiye'
      },
      carrier: 'FedEx',
      trackingNumber: 'FDX123456789'
    },
    {
      orderNumber: 'ORD-987654321',
      email: 'sarah@example.com',
      status: 'shipped',
      orderDate: '2024-01-18',
      deliveryDate: '2024-01-23',
      totalAmount: 149.99,
      items: [
        { name: 'Bluetooth Speaker', quantity: 1, price: 149.99 }
      ],
      trackingSteps: [
        {
          status: 'Order Placed',
          date: '2024-01-18 02:20 PM',
          description: 'Your order has been placed successfully',
          icon: 'fas fa-shopping-cart',
          completed: true
        },
        {
          status: 'Payment Confirmed',
          date: '2024-01-18 02:25 PM',
          description: 'Payment has been processed',
          icon: 'fas fa-credit-card',
          completed: true
        },
        {
          status: 'Processing',
          date: '2024-01-19 10:00 AM',
          description: 'Your order is being prepared',
          icon: 'fas fa-cogs',
          completed: true
        },
        {
          status: 'Shipped',
          date: '2024-01-20 11:30 AM',
          description: 'Your order has been shipped',
          icon: 'fas fa-shipping-fast',
          completed: true
        },
        {
          status: 'Out for Delivery',
          date: '',
          description: 'Your order will be out for delivery soon',
          icon: 'fas fa-truck',
          completed: false
        },
        {
          status: 'Delivered',
          date: '',
          description: 'Order will be delivered',
          icon: 'fas fa-check-circle',
          completed: false
        }
      ],
      shippingAddress: {
        name: 'Sarah Johnson',
        address: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      carrier: 'UPS',
      trackingNumber: 'UPS987654321'
    }
  ];

  faqItems = [
    {
      question: 'How can I track my order?',
      answer: 'You can track your order by entering your order number and email address in the tracking form above. You will receive a tracking number via email once your order ships.'
    },
    {
      question: 'When will I receive my tracking number?',
      answer: 'You will receive your tracking number via email within 24-48 hours after your order ships. Processing typically takes 1-2 business days.'
    },
    {
      question: 'What if my tracking shows no updates?',
      answer: 'Sometimes there can be delays in tracking updates. If your tracking hasn\'t updated for more than 3 business days, please contact our customer service team.'
    },
    {
      question: 'Can I change my delivery address after shipping?',
      answer: 'Once your order has shipped, address changes may not be possible. Contact the shipping carrier directly or our customer service team as soon as possible.'
    },
    {
      question: 'What if my package is marked as delivered but I didn\'t receive it?',
      answer: 'First, check with neighbors and any safe delivery locations. If you still can\'t locate your package, contact us immediately and we\'ll investigate with the carrier.'
    }
  ];

  activeFaq: number = -1;

  onTrackOrder() {
    this.isLoading = true;
    this.errorMessage = '';
    this.trackingResult = null;

    // Simulate API call delay
    setTimeout(() => {
      const foundOrder = this.sampleOrders.find(order => 
        order.orderNumber.toLowerCase() === this.trackingForm.orderNumber.toLowerCase() &&
        order.email.toLowerCase() === this.trackingForm.email.toLowerCase()
      );

      if (foundOrder) {
        this.trackingResult = foundOrder;
      } else {
        this.errorMessage = 'Order not found. Please check your order number and email address.';
      }

      this.isLoading = false;
    }, 1500);
  }

  toggleFaq(index: number) {
    this.activeFaq = this.activeFaq === index ? -1 : index;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'shipped':
      case 'out for delivery':
        return 'status-shipped';
      case 'processing':
        return 'status-processing';
      default:
        return 'status-pending';
    }
  }

  resetTracking() {
    this.trackingResult = null;
    this.errorMessage = '';
    this.trackingForm = {
      orderNumber: '',
      email: ''
    };
  }

  getNextStepIndex(): number {
    if (!this.trackingResult) return -1;
    return this.trackingResult.trackingSteps.findIndex((step: any) => !step.completed);
  }
} 