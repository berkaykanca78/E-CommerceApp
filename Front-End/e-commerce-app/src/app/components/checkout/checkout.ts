import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Cart } from '../../services/cart';
import { AlertService } from '../../services/alert';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class Checkout {
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(Cart);
  private readonly alertService = inject(AlertService);

  checkoutForm: FormGroup;
  cartItems$ = this.cartService.cartItems$;
  cartTotal$ = this.cartService.totalPrice$;
  
  useSameAddress = true;
  isCardFlipped = false;

  constructor() {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        fullName: ['', Validators.required],
        addressLine1: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', Validators.required],
        country: ['Turkey', Validators.required]
      }),
      billingAddress: this.fb.group({
        fullName: [''],
        addressLine1: [''],
        city: [''],
        zipCode: [''],
        country: ['']
      }),
      paymentDetails: this.fb.group({
        cardholderName: ['', Validators.required],
        cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
        expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/?([0-9]{2})$')]],
        cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
      })
    });

    this.toggleBillingAddressValidators();
  }

  toggleBillingAddressValidators(): void {
    const billingAddress = this.checkoutForm.get('billingAddress') as FormGroup;
    if (this.useSameAddress) {
      Object.keys(billingAddress.controls).forEach(key => {
        billingAddress.get(key)?.clearValidators();
        billingAddress.get(key)?.updateValueAndValidity();
      });
    } else {
      Object.keys(billingAddress.controls).forEach(key => {
        billingAddress.get(key)?.setValidators([Validators.required]);
        billingAddress.get(key)?.updateValueAndValidity();
      });
    }
  }

  onPlaceOrder(): void {
    if (this.checkoutForm.valid) {
      console.log('Order placed:', this.checkoutForm.value);
      // TODO: Implement order placement logic
    } else {
      this.markFormGroupTouched();
    }
  }

  onCardholderNameInput(event: any) {
    const value = event.target.value.toUpperCase();
    this.checkoutForm.get('paymentDetails.cardholderName')?.setValue(value, { emitEvent: false });
  }

  onCardNumberInput(event: any) {
    let value = event.target.value.replace(/\s/g, '').replace(/\D/g, '');
    
    // Maksimum 16 rakam sınırlaması
    if (value.length > 16) {
      value = value.substring(0, 16);
    }
    
    // Her 4 rakamdan sonra boşluk ekle
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    this.checkoutForm.get('paymentDetails.cardNumber')?.setValue(value, { emitEvent: false });
  }

  onExpiryDateInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.checkoutForm.get('paymentDetails.expiryDate')?.setValue(value, { emitEvent: false });
  }

  onCvvInput(event: any) {
    const value = event.target.value.replace(/\D/g, '').substring(0, 4);
    this.checkoutForm.get('paymentDetails.cvv')?.setValue(value, { emitEvent: false });
  }

  private markFormGroupTouched() {
    Object.keys(this.checkoutForm.controls).forEach(key => {
      this.checkoutForm.get(key)?.markAsTouched();
    });
  }
} 