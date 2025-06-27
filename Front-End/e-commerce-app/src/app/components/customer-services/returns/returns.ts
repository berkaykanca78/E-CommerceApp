import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-returns',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './returns.html',
  styleUrls: ['./returns.scss']
})
export class Returns {
  activeFaq: number = -1;
  returnForm = {
    orderNumber: '',
    email: '',
    reason: '',
    description: '',
    refundMethod: 'original'
  };

  returnReasons = [
    'Defective/Damaged item',
    'Wrong item received',
    'Item not as described',
    'Changed my mind',
    'Size/fit issues',
    'Quality not as expected',
    'Arrived too late',
    'Other'
  ];

  returnProcess = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Fill out our return form with your order details',
      icon: 'fas fa-clipboard-list',
      status: 'active'
    },
    {
      step: 2,
      title: 'Get Return Label',
      description: 'Receive your prepaid return shipping label via email',
      icon: 'fas fa-shipping-fast',
      status: 'pending'
    },
    {
      step: 3,
      title: 'Package & Ship',
      description: 'Pack your items securely and drop off at any shipping location',
      icon: 'fas fa-box',
      status: 'pending'
    },
    {
      step: 4,
      title: 'Processing',
      description: 'We inspect your return and process your refund',
      icon: 'fas fa-search',
      status: 'pending'
    },
    {
      step: 5,
      title: 'Refund Issued',
      description: 'Receive your refund within 5-7 business days',
      icon: 'fas fa-check-circle',
      status: 'pending'
    }
  ];

  returnPolicy = {
    timeLimit: '30 days',
    condition: 'Original condition with tags',
    shipping: 'Free return shipping',
    processing: '5-7 business days'
  };

  faqItems = [
    {
      question: 'How long do I have to return an item?',
      answer: 'You have 30 days from the delivery date to initiate a return. Items must be in their original condition with all tags attached.'
    },
    {
      question: 'Do I have to pay for return shipping?',
      answer: 'No, we provide free return shipping labels for all returns within the United States. International returns may be subject to shipping charges.'
    },
    {
      question: 'How long does it take to process a refund?',
      answer: 'Once we receive your return, it typically takes 2-3 business days to inspect and process. Refunds are issued within 5-7 business days after processing.'
    },
    {
      question: 'Can I exchange an item instead of returning it?',
      answer: 'Yes, you can request an exchange for a different size or color. Exchanges are processed as a return and new order to ensure faster delivery.'
    },
    {
      question: 'What if my item was damaged during shipping?',
      answer: 'If your item arrived damaged, please contact us immediately with photos. We will expedite a replacement or full refund at no cost to you.'
    },
    {
      question: 'Can I return sale or clearance items?',
      answer: 'Sale and clearance items can be returned within 30 days, but some final sale items may not be eligible for return. Check the product page for specific details.'
    }
  ];

  toggleFaq(index: number) {
    this.activeFaq = this.activeFaq === index ? -1 : index;
  }

  onSubmitReturn() {
    // Handle return form submission
    console.log('Return form submitted:', this.returnForm);
    // Here you would typically send the data to your backend
    alert('Return request submitted successfully! You will receive a confirmation email shortly.');
    
    // Reset form
    this.returnForm = {
      orderNumber: '',
      email: '',
      reason: '',
      description: '',
      refundMethod: 'original'
    };
  }
} 