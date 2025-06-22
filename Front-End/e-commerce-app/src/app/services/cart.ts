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
  private readonly cartCount = new BehaviorSubject<number>(0);
  private readonly cartItems = new BehaviorSubject<CartItem[]>([]);
  private readonly _totalPrice = new BehaviorSubject<number>(0);
  
  readonly cartCount$ = this.cartCount.asObservable();
  readonly cartItems$ = this.cartItems.asObservable();
  readonly totalPrice$ = this._totalPrice.asObservable();

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
    this.updateTotal();
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
    
    this.saveCart();
  }

  updateQuantity(item: CartItem, change: number) {
    const currentItems = this.cartItems.value;
    const itemIndex = currentItems.findIndex(i => i.id === item.id);
    
    if (itemIndex !== -1) {
      const newQuantity = currentItems[itemIndex].quantity + change;
      if (newQuantity > 0) {
        currentItems[itemIndex].quantity = newQuantity;
        this.cartItems.next([...currentItems]);
        
        const newCount = this.cartCount.value + change;
        this.cartCount.next(newCount);
        
        this.saveCart();
      } else {
        // If quantity becomes 0, remove the item
        this.removeItem(item);
      }
    }
  }

  removeItem(item: CartItem) {
    const currentItems = this.cartItems.value;
    const newItems = currentItems.filter(i => i.id !== item.id);
    this.cartItems.next(newItems);
    
    const newCount = this.cartCount.value - item.quantity;
    this.cartCount.next(newCount);
    
    this.saveCart();
  }

  private saveCart(): void {
    const items = this.cartItems.value;
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    
    this.cartCount.next(count);
    localStorage.setItem('cartCount', count.toString());
    localStorage.setItem('cartItems', JSON.stringify(items));
    this.updateTotal();
  }

  private updateTotal(): void {
    const total = this.cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this._totalPrice.next(total);
  }

  getTotalPrice(): number {
    return this._totalPrice.value;
  }

  getCartCount(): number {
    return this.cartCount.value;
  }

  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }
} 