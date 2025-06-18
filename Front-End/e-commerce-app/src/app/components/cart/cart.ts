import { Component, OnInit } from '@angular/core';
import { CartItem, Cart as CartService } from '../../services/cart';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss'],
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  updateQuantity(item: CartItem, change: number) {
    this.cartService.updateQuantity(item, change);
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
  }
}
