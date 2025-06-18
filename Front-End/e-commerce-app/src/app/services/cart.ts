import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private cartCount = new BehaviorSubject<number>(0);
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  
  cartCount$ = this.cartCount.asObservable();
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Initialize cart from localStorage if available
    const savedCount = localStorage.getItem('cartCount');
    const savedItems = localStorage.getItem('cartItems');
    
    if (savedCount) {
      this.cartCount.next(parseInt(savedCount));
    }
    if (savedItems) {
      this.cartItems.next(JSON.parse(savedItems));
    }
  }

  addToCart(product: { id: number; name: string; price: number }) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { ...product, quantity: 1 }]);
    }

    const newCount = this.cartCount.value + 1;
    this.cartCount.next(newCount);
    
    // Save to localStorage
    localStorage.setItem('cartCount', newCount.toString());
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems.value));
  }

  updateQuantity(item: CartItem, change: number) {
    const currentItems = this.cartItems.value;
    const itemIndex = currentItems.findIndex(i => i.id === item.id);
    
    if (itemIndex !== -1) {
      const newQuantity = currentItems[itemIndex].quantity + change;
      if (newQuantity > 0) {
        currentItems[itemIndex].quantity = newQuantity;
        this.cartItems.next([...currentItems]);
        
        // Update cart count
        const newCount = this.cartCount.value + change;
        this.cartCount.next(newCount);
        
        // Save to localStorage
        localStorage.setItem('cartCount', newCount.toString());
        localStorage.setItem('cartItems', JSON.stringify(currentItems));
      }
    }
  }

  removeItem(item: CartItem) {
    const currentItems = this.cartItems.value;
    const newItems = currentItems.filter(i => i.id !== item.id);
    this.cartItems.next(newItems);
    
    // Update cart count
    const newCount = this.cartCount.value - item.quantity;
    this.cartCount.next(newCount);
    
    // Save to localStorage
    localStorage.setItem('cartCount', newCount.toString());
    localStorage.setItem('cartItems', JSON.stringify(newItems));
  }

  getCartCount(): number {
    return this.cartCount.value;
  }

  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }

  getTotalPrice(): number {
    return this.cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
} 