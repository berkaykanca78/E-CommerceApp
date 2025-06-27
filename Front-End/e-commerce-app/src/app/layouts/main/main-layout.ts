import { Component, Pipe, PipeTransform, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Alerts } from '../../components/shared/alerts/alerts';
import { Navbar } from '../../components/shared/navbar/navbar';
import { Footer } from '../../components/shared/footer/footer';

@Pipe({
  name: 'nl2br'
})
export class Nl2brPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.replace(/\n/g, '<br>');
  }
}

@Component({
  selector: 'main-layout',
  imports: [CommonModule, FormsModule, RouterOutlet, Alerts, Navbar, Footer, Nl2brPipe],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayout {
  // Chat functionality
  isChatOpen = false;
  chatMessages: any[] = [];
  currentMessage = '';
  isTyping = false;
  
  // Scroll to top functionality
  showScrollToTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollToTop = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Chat methods
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen && this.chatMessages.length === 0) {
      this.initializeChat();
    }
  }

  initializeChat() {
    setTimeout(() => {
      this.chatMessages.push({
        type: 'bot',
        message: 'Hello! 👋 I\'m here to help you. How can I assist you today?',
        time: new Date()
      });
    }, 500);
  }

  sendMessage() {
    if (this.currentMessage.trim()) {
      // Add user message
      this.chatMessages.push({
        type: 'user',
        message: this.currentMessage,
        time: new Date()
      });

      const userMessage = this.currentMessage.toLowerCase();
      this.currentMessage = '';

      // Show typing indicator
      this.isTyping = true;

      // Generate bot response
      setTimeout(() => {
        this.isTyping = false;
        const botResponse = this.generateBotResponse(userMessage);
        this.chatMessages.push({
          type: 'bot',
          message: botResponse,
          time: new Date()
        });
      }, 1000 + Math.random() * 1000);
    }
  }

  generateBotResponse(userMessage: string): string {
    const responses: { [key: string]: string } = {
      'hello': 'Hello! How can I help you today? 😊',
      'hi': 'Hi there! What can I do for you?',
      'help': 'I\'m here to help! You can ask me about:\n• Order tracking\n• Shipping information\n• Return policy\n• Payment methods\n• Product information',
      'order': 'To track your order, please log into your account and go to "My Orders" section. You can also provide your order number for assistance.',
      'shipping': 'We offer free shipping on orders over $50. Standard shipping takes 3-5 business days, express shipping takes 1-2 business days.',
      'return': 'You can return items within 14 days of purchase. Items must be in original condition and packaging. Visit our returns page for more details.',
      'payment': 'We accept all major credit cards, debit cards, PayPal, and bank transfers. All payments are secure and encrypted.',
      'support': 'For additional support, you can:\n• Call us at +90 (505) 618 1906\n• Email us at info@berkaykanca.com\n• Use this chat for instant help',
      'hours': 'Our customer service is available Monday-Friday, 9:00 AM - 6:00 PM EST. This chat is available 24/7!',
      'contact': 'You can reach us through:\n📞 Phone: +90 (505) 618 1906\n📧 Email: info@berkaykanca.com\n📍 Address: Ankara, Türkiye',
      'thanks': 'You\'re welcome! Is there anything else I can help you with? 😊',
      'thank you': 'You\'re very welcome! Feel free to ask if you need anything else.',
      'bye': 'Goodbye! Have a great day! Feel free to come back anytime you need help. 👋',
      'goodbye': 'Thank you for chatting with us! Have a wonderful day! 🌟'
    };

    // Check for keyword matches
    for (const keyword in responses) {
      if (userMessage.includes(keyword)) {
        return responses[keyword];
      }
    }

    // Default response
    const defaultResponses = [
      'I understand you\'re asking about that. Let me help you find the right information. Could you be more specific?',
      'That\'s a great question! For detailed information, I recommend checking our FAQ section or contacting our support team.',
      'I\'d be happy to help with that! Could you provide more details about what you\'re looking for?',
      'Thanks for your question! For the most accurate information, please contact our customer service team at +1 (555) 123-4567.',
      'I want to make sure I give you the right information. Could you rephrase your question or be more specific?'
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  onChatKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
} 