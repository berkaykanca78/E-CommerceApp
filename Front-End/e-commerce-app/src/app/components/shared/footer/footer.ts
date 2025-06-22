import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-dark text-light py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-3 col-md-6">
            <h5 class="mb-4">About Us</h5>
            <p>Your trusted online shopping destination for quality products and excellent service.</p>
            <div class="social-links mt-3">
              <a href="#" class="btn btn-outline-light me-2"><i class="fab fa-facebook"></i></a>
              <a href="#" class="btn btn-outline-light me-2"><i class="fab fa-twitter"></i></a>
              <a href="#" class="btn btn-outline-light me-2"><i class="fab fa-instagram"></i></a>
              <a href="#" class="btn btn-outline-light"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5 class="mb-4">Quick Links</h5>
            <ul class="list-unstyled">
              <li><a href="#" class="text-light text-decoration-none mb-2 d-block">Home</a></li>
              <li><a href="#" class="text-light text-decoration-none mb-2 d-block">Shop</a></li>
              <li><a href="#" class="text-light text-decoration-none mb-2 d-block">Categories</a></li>
              <li><a href="#" class="text-light text-decoration-none mb-2 d-block">Contact</a></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5 class="mb-4">Customer Service</h5>
            <ul class="list-unstyled">
              <li><a href="#" class="text-light text-decoration-none mb-2 d-block">FAQ</a></li>
              <li><a href="#" class="text-light text-decoration-none mb-2 d-block">Shipping Info</a></li>
              <li><a href="#" class="text-light text-decoration-none mb-2 d-block">Returns</a></li>
              <li><a href="#" class="text-light text-decoration-none mb-2 d-block">Track Order</a></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5 class="mb-4">Contact Us</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><i class="fas fa-phone me-2"></i> (555) 123-4567</li>
              <li class="mb-2"><i class="fas fa-map-marker-alt me-2"></i> 123 Store St, City</li>
            </ul>
          </div>
        </div>
        <hr class="my-4">
        <div class="row">
          <div class="col-md-6 text-center text-md-start">
            <p class="mb-0">&copy; {{year}} E-Commerce Store. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png" alt="Visa" class="me-2" style="height: 30px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png" alt="Mastercard" class="me-2" style="height: 30px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/100px-PayPal.svg.png" alt="PayPal" class="me-2" style="height: 30px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/100px-American_Express_logo_%282018%29.svg.png" alt="American Express" style="height: 30px;">
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      flex-shrink: 0;
      background: #222;
      color: #fff;
    }
    .social-links a {
      transition: transform 0.2s;
    }
    .social-links a:hover {
      transform: scale(1.15);
    }
  `]
})
export class Footer {
  year = new Date().getFullYear();
} 