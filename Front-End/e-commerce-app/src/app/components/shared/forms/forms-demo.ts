import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-forms-demo',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container-fluid">
      <h2 class="mb-4">Forms Demo</h2>
      <p class="text-muted mb-4">Various form types and validation examples.</p>
      
      <div class="row g-4">
        <!-- Basic Form -->
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Basic Form (Template-driven)</h5>
            </div>
            <div class="card-body">
              <form #basicForm="ngForm" (ngSubmit)="onBasicSubmit(basicForm)">
                <div class="mb-3">
                  <label for="firstName" class="form-label">First Name *</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    name="firstName"
                    [(ngModel)]="basicFormData.firstName"
                    required
                    #firstName="ngModel"
                    [class.is-invalid]="firstName.invalid && firstName.touched">
                  <div class="invalid-feedback" *ngIf="firstName.invalid && firstName.touched">
                    First name is required
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="lastName" class="form-label">Last Name *</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    name="lastName"
                    [(ngModel)]="basicFormData.lastName"
                    required
                    #lastName="ngModel"
                    [class.is-invalid]="lastName.invalid && lastName.touched">
                  <div class="invalid-feedback" *ngIf="lastName.invalid && lastName.touched">
                    Last name is required
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="email" class="form-label">Email *</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    [(ngModel)]="basicFormData.email"
                    required
                    email
                    #email="ngModel"
                    [class.is-invalid]="email.invalid && email.touched">
                  <div class="invalid-feedback" *ngIf="email.invalid && email.touched">
                    <span *ngIf="email.errors?.['required']">Email is required</span>
                    <span *ngIf="email.errors?.['email']">Please enter a valid email</span>
                  </div>
                </div>
                
                <button type="submit" class="btn btn-primary" [disabled]="!basicForm.valid">
                  Submit Basic Form
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Reactive Form -->
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Reactive Form</h5>
            </div>
            <div class="card-body">
              <form [formGroup]="reactiveForm" (ngSubmit)="onReactiveSubmit()">
                <div class="mb-3">
                  <label for="productName" class="form-label">Product Name *</label>
                  <input
                    type="text"
                    class="form-control"
                    id="productName"
                    formControlName="productName"
                    [class.is-invalid]="reactiveForm.get('productName')?.invalid && reactiveForm.get('productName')?.touched">
                  <div class="invalid-feedback" *ngIf="reactiveForm.get('productName')?.invalid && reactiveForm.get('productName')?.touched">
                    Product name is required (min 3 characters)
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="price" class="form-label">Price *</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    formControlName="price"
                    min="0"
                    step="0.01"
                    [class.is-invalid]="reactiveForm.get('price')?.invalid && reactiveForm.get('price')?.touched">
                  <div class="invalid-feedback" *ngIf="reactiveForm.get('price')?.invalid && reactiveForm.get('price')?.touched">
                    Price must be a positive number
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="category" class="form-label">Category *</label>
                  <select
                    class="form-select"
                    id="category"
                    formControlName="category"
                    [class.is-invalid]="reactiveForm.get('category')?.invalid && reactiveForm.get('category')?.touched">
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="sports">Sports</option>
                    <option value="books">Books</option>
                  </select>
                  <div class="invalid-feedback" *ngIf="reactiveForm.get('category')?.invalid && reactiveForm.get('category')?.touched">
                    Please select a category
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <textarea
                    class="form-control"
                    id="description"
                    formControlName="description"
                    rows="3"></textarea>
                </div>
                
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="isActive"
                    formControlName="isActive">
                  <label class="form-check-label" for="isActive">
                    Active Product
                  </label>
                </div>
                
                <button type="submit" class="btn btn-success" [disabled]="!reactiveForm.valid">
                  Submit Reactive Form
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Dynamic Form with FormArray -->
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Dynamic Form (FormArray)</h5>
            </div>
            <div class="card-body">
              <form [formGroup]="dynamicForm" (ngSubmit)="onDynamicSubmit()">
                <div class="mb-3">
                  <label for="orderName" class="form-label">Order Name *</label>
                  <input
                    type="text"
                    class="form-control"
                    id="orderName"
                    formControlName="orderName"
                    [class.is-invalid]="dynamicForm.get('orderName')?.invalid && dynamicForm.get('orderName')?.touched">
                  <div class="invalid-feedback" *ngIf="dynamicForm.get('orderName')?.invalid && dynamicForm.get('orderName')?.touched">
                    Order name is required
                  </div>
                </div>
                
                <div class="mb-3">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label mb-0">Order Items</label>
                    <button type="button" class="btn btn-sm btn-outline-primary" (click)="addItem()">
                      <i class="fas fa-plus"></i> Add Item
                    </button>
                  </div>
                  
                  <div formArrayName="items">
                    <div *ngFor="let item of items.controls; let i = index" [formGroupName]="i" class="card mb-2">
                      <div class="card-body">
                        <div class="row g-3">
                          <div class="col-md-4">
                            <label class="form-label">Item Name *</label>
                            <input
                              type="text"
                              class="form-control"
                              formControlName="name"
                              [class.is-invalid]="item.get('name')?.invalid && item.get('name')?.touched">
                          </div>
                          <div class="col-md-3">
                            <label class="form-label">Quantity *</label>
                            <input
                              type="number"
                              class="form-control"
                              formControlName="quantity"
                              min="1"
                              [class.is-invalid]="item.get('quantity')?.invalid && item.get('quantity')?.touched">
                          </div>
                          <div class="col-md-3">
                            <label class="form-label">Price *</label>
                            <input
                              type="number"
                              class="form-control"
                              formControlName="price"
                              min="0"
                              step="0.01"
                              [class.is-invalid]="item.get('price')?.invalid && item.get('price')?.touched">
                          </div>
                          <div class="col-md-2 d-flex align-items-end">
                            <button type="button" class="btn btn-danger btn-sm" (click)="removeItem(i)">
                              <i class="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="mb-3">
                  <strong>Total: {{ calculateTotal() | currency }}</strong>
                </div>
                
                <button type="submit" class="btn btn-warning" [disabled]="!dynamicForm.valid">
                  Submit Dynamic Form
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Form Results -->
      <div class="row mt-4" *ngIf="submittedData">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Last Submitted Data</h5>
            </div>
            <div class="card-body">
              <pre>{{ submittedData | json }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: []
})
export class FormsDemo {
  // Template-driven form data
  basicFormData = {
    firstName: '',
    lastName: '',
    email: ''
  };

  // Reactive form
  reactiveForm: FormGroup;

  // Dynamic form with FormArray
  dynamicForm: FormGroup;

  // Submitted data storage
  submittedData: any = null;

  constructor(private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      description: [''],
      isActive: [true]
    });

    this.dynamicForm = this.fb.group({
      orderName: ['', Validators.required],
      items: this.fb.array([this.createItem()])
    });
  }

  get items() {
    return this.dynamicForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  calculateTotal(): number {
    let total = 0;
    this.items.controls.forEach(item => {
      const quantity = item.get('quantity')?.value || 0;
      const price = item.get('price')?.value || 0;
      total += quantity * price;
    });
    return total;
  }

  onBasicSubmit(form: any) {
    if (form.valid) {
      this.submittedData = {
        formType: 'Basic Form',
        data: { ...this.basicFormData }
      };
      console.log('Basic form submitted:', this.basicFormData);
    }
  }

  onReactiveSubmit() {
    if (this.reactiveForm.valid) {
      this.submittedData = {
        formType: 'Reactive Form',
        data: this.reactiveForm.value
      };
      console.log('Reactive form submitted:', this.reactiveForm.value);
    }
  }

  onDynamicSubmit() {
    if (this.dynamicForm.valid) {
      this.submittedData = {
        formType: 'Dynamic Form',
        data: this.dynamicForm.value,
        total: this.calculateTotal()
      };
      console.log('Dynamic form submitted:', this.dynamicForm.value);
    }
  }
} 