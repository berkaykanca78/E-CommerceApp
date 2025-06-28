import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  private readonly router = inject(Router);
  private readonly cartService = inject(Cart);
  private readonly alertService = inject(AlertService);

  checkoutForm: FormGroup;
  cartItems$ = this.cartService.cartItems$;
  cartTotal$ = this.cartService.totalPrice$;
  
  isCardFlipped = false;

  constructor() {
    this.checkoutForm = this.fb.group({
      useSameAddress: [true],
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
        cardNumber: ['', [Validators.required, Validators.pattern('^[0-9\\s]{19}$')]],
        expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],
        cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
      })
    });

    this.toggleBillingAddressValidators();
    
    // Listen for changes in useSameAddress checkbox
    this.checkoutForm.get('useSameAddress')?.valueChanges.subscribe(value => {
      this.toggleBillingAddressValidators();
    });
    
    // Listen for changes in shipping address to update billing address if same address is selected
    this.checkoutForm.get('shippingAddress')?.valueChanges.subscribe(value => {
      const useSameAddress = this.checkoutForm.get('useSameAddress')?.value;
      if (useSameAddress) {
        const billingAddress = this.checkoutForm.get('billingAddress') as FormGroup;
        billingAddress.patchValue(value);
      }
    });
  }

  toggleBillingAddressValidators(): void {
    const billingAddress = this.checkoutForm.get('billingAddress') as FormGroup;
    const shippingAddress = this.checkoutForm.get('shippingAddress') as FormGroup;
    const useSameAddress = this.checkoutForm.get('useSameAddress')?.value;
    
    if (useSameAddress) {
      // Billing address alanlarından validation'ları kaldır
      Object.keys(billingAddress.controls).forEach(key => {
        billingAddress.get(key)?.clearValidators();
        billingAddress.get(key)?.updateValueAndValidity();
      });
      
      // Shipping address bilgilerini billing address'e kopyala
      const shippingValues = shippingAddress.value;
      billingAddress.patchValue(shippingValues);
    } else {
      // Billing address alanlarına validation ekle
      Object.keys(billingAddress.controls).forEach(key => {
        billingAddress.get(key)?.setValidators([Validators.required]);
        billingAddress.get(key)?.updateValueAndValidity();
      });
      
      // Billing address'i temizle ki kullanıcı kendi bilgilerini girebilsin
      billingAddress.reset();
    }
  }

  onPlaceOrder(): void {
    console.log('Form Value:', this.checkoutForm.value);
    console.log('Form Valid:', this.checkoutForm.valid);
    
    if (!this.checkoutForm.valid) {
      console.log('Invalid fields:', this.getInvalidFields());
    }
    
    if (this.checkoutForm.valid) {
      console.log('Order placed:', this.checkoutForm.value);
      
      // Sipariş verme işlemi başarılı olduğunda order confirmation sayfasına yönlendir
      this.alertService.success('Your order has been successfully placed! Redirecting...');
      
      // Gerçek uygulamada burada API çağrısı yapılacak
      // API çağrısı tamamlandıktan sonra yönlendirme yapılacak
      setTimeout(() => {
        this.router.navigate(['/order-confirmation']);
      }, 1500);
      
    } else {
      this.markFormGroupTouched();
      this.alertService.error('Please fill in all required fields.');
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
    const markTouched = (formGroup: FormGroup) => {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);
        if (control instanceof FormGroup) {
          markTouched(control);
        } else {
          control?.markAsTouched();
        }
      });
    };
    
    markTouched(this.checkoutForm);
  }

  private getInvalidFields(): string[] {
    const invalidFields: string[] = [];
    
    const checkFormGroup = (formGroup: FormGroup, groupName: string = '') => {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);
        const fieldName = groupName ? `${groupName}.${key}` : key;
        
        if (control instanceof FormGroup) {
          checkFormGroup(control, fieldName);
        } else if (control && control.invalid) {
          invalidFields.push(`${fieldName}: ${JSON.stringify(control.errors)}`);
        }
      });
    };
    
    checkFormGroup(this.checkoutForm);
    return invalidFields;
  }
} 