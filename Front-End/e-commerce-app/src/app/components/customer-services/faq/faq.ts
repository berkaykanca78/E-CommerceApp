import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss']
})
export class Faq {
  faqs = [
    { question: 'What is your return policy?', answer: 'You can return any item within 30 days of purchase.' },
    { question: 'How do I track my order?', answer: 'You can track your order using the tracking link sent to your email.' },
    { question: 'Do you offer international shipping?', answer: 'Yes, we ship to most countries worldwide.' },
    { question: 'How can I contact customer support?', answer: 'You can contact us via the support page or email us at support@example.com.' }
  ];
  openedIndex: number | null = null;

  toggle(index: number) {
    this.openedIndex = this.openedIndex === index ? null : index;
  }
}
