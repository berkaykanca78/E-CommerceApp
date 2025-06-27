import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile {
  activeTab: 'profile' | 'orders' | 'settings' = 'profile';

  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software Developer at E-Commerce Inc.',
    address: '123 Tech Street, Silicon Valley, CA 94101',
    phone: '555-123-4567',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  };

  orders = [
    { id: 'ORD-001', date: '2023-10-25', total: 150.75, status: 'Delivered' },
    { id: 'ORD-002', date: '2023-11-10', total: 89.99, status: 'Shipped' },
    { id: 'ORD-003', date: '2023-11-15', total: 250.00, status: 'Processing' }
  ];

  settings = {
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  };

  setActiveTab(tab: 'profile' | 'orders' | 'settings'): void {
    this.activeTab = tab;
  }

  saveProfile(): void {
    console.log('Profile saved:', this.user);
    // Burada alert service kullanılabilir:
    // this.alertService.success('Profile updated successfully!');
  }

  saveSettings(): void {
    if (this.settings.newPassword !== this.settings.confirmPassword) {
      console.error('Passwords do not match');
      // this.alertService.error('Passwords do not match!');
      return;
    }
    console.log('Settings saved:', this.settings);
    // this.alertService.success('Settings updated successfully!');
  }
} 