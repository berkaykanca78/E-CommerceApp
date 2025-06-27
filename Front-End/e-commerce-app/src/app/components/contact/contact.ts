import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };



  contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Address',
      content: 'Ankara, Türkiye',
      link: 'https://maps.google.com'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      content: '+90 (505) 618 1906',
      link: 'tel:+905056181906'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      content: 'info@berkaykanca.com',
      link: 'mailto:info@berkaykanca.com'
    },
    {
      icon: 'fas fa-clock',
      title: 'Business Hours',
      content: 'Monday - Friday: 09:00 - 18:00',
      link: null
    }
  ];

  faqItems = [
    {
      question: 'How can I track my order?',
      answer: 'To track your order, log into your account and check the order status from the "My Orders" section.'
    },
    {
      question: 'What is the return policy?',
      answer: 'You can return your products within 14 days. The product must be in its original packaging and unused.'
    },
    {
      question: 'How much is the shipping fee?',
      answer: 'Shipping is free for orders over $50. For orders under $50, a $5 shipping fee applies.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards, debit cards, bank transfers, and cash on delivery options.'
    }
  ];

  onSubmit() {
    // Form submission logic would go here
    console.log('Contact form submitted:', this.contactForm);
    alert('Your message has been sent successfully! We will get back to you as soon as possible.');
    
    // Reset form
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }


} 