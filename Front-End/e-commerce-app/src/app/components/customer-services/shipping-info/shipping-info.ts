import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shipping-info',
  imports: [CommonModule, RouterModule],
  templateUrl: './shipping-info.html',
  styleUrls: ['./shipping-info.scss']
})
export class ShippingInfo {
  shippingOptions = [
    {
      title: 'Standard Shipping',
      price: 'FREE',
      duration: '5-7 business days',
      description: 'Free shipping on orders over $50',
      icon: 'fas fa-truck',
      features: [
        'Free on orders $50+',
        'Tracking included',
        'Signature not required',
        'Business days only'
      ]
    },
    {
      title: 'Express Shipping',
      price: '$9.99',
      duration: '2-3 business days',
      description: 'Faster delivery for urgent orders',
      icon: 'fas fa-shipping-fast',
      features: [
        'Expedited processing',
        'Priority handling',
        'Real-time tracking',
        'Weekend delivery available'
      ]
    },
    {
      title: 'Overnight Shipping',
      price: '$24.99',
      duration: '1 business day',
      description: 'Next day delivery by 6 PM',
      icon: 'fas fa-rocket',
      features: [
        'Next business day delivery',
        'Signature required',
        'Insurance included',
        'Cut-off time: 2 PM EST'
      ]
    }
  ];

  shippingZones = [
    {
      zone: 'Domestic (USA)',
      countries: ['United States'],
      standardTime: '5-7 business days',
      expressTime: '2-3 business days',
      overnightTime: '1 business day'
    },
    {
      zone: 'Canada',
      countries: ['Canada'],
      standardTime: '7-10 business days',
      expressTime: '4-6 business days',
      overnightTime: 'Not available'
    },
    {
      zone: 'Europe',
      countries: ['UK', 'Germany', 'France', 'Italy', 'Spain'],
      standardTime: '10-14 business days',
      expressTime: '5-7 business days',
      overnightTime: 'Not available'
    },
    {
      zone: 'International',
      countries: ['Other countries'],
      standardTime: '14-21 business days',
      expressTime: '7-10 business days',
      overnightTime: 'Not available'
    }
  ];

  faqItems = [
    {
      question: 'How is shipping cost calculated?',
      answer: 'Shipping costs are calculated based on the weight, dimensions, and destination of your order. We offer free standard shipping on orders over $50 within the United States.'
    },
    {
      question: 'Can I change my shipping address after placing an order?',
      answer: 'You can change your shipping address within 1 hour of placing your order by contacting our customer service. After this time, the order may have already been processed for shipping.'
    },
    {
      question: 'Do you ship to P.O. Boxes?',
      answer: 'Yes, we ship to P.O. Boxes for standard shipping only. Express and overnight shipping options are not available for P.O. Box addresses.'
    },
    {
      question: 'What happens if I\'m not home during delivery?',
      answer: 'If you\'re not home, the carrier will typically leave a delivery notice. You can then arrange for redelivery or pick up the package from the local facility.'
    },
    {
      question: 'Can I track my shipment?',
      answer: 'Yes, once your order ships, you\'ll receive a tracking number via email. You can use this number to track your package on our website or the carrier\'s website.'
    }
  ];

  activeFaq: number = -1;

  toggleFaq(index: number) {
    this.activeFaq = this.activeFaq === index ? -1 : index;
  }
} 