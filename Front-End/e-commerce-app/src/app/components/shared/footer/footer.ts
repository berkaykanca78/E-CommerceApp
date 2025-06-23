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
            <div class="footer-payments d-inline-flex align-items-center gap-2 gap-md-3">
              <span class="footer-payments-label text-secondary me-2">We Accept</span>
              <span class="payment-icon visa" title="Visa"><i class="fab fa-cc-visa fa-2x"></i></span>
              <span class="payment-icon mastercard" title="Mastercard"><i class="fab fa-cc-mastercard fa-2x"></i></span>
              <span class="payment-icon paypal" title="PayPal"><i class="fab fa-cc-paypal fa-2x"></i></span>
              <span class="payment-icon amex" title="American Express"><i class="fab fa-cc-amex fa-2x"></i></span>
            </div>
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
    .footer-payments {
      background: rgba(255,255,255,0.04);
      border-radius: 2rem;
      padding: 0.35rem 1.1rem 0.35rem 0.9rem;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      border: 1px solid rgba(255,255,255,0.07);
      gap: 0.7rem;
    }
    .footer-payments-label {
      font-size: 1.02rem;
      font-weight: 500;
      letter-spacing: 0.01em;
      color: #bfc3c9 !important;
      margin-right: 0.7rem;
      opacity: 0.85;
      transition: color 0.2s;
    }
    .footer-payments:hover .footer-payments-label {
      color: #fff !important;
      opacity: 1;
    }
    .footer-payments:hover .payment-icon {
      color: #fff !important;
      filter: none;
    }
    .payment-icon {
      color: #bfc3c9;
      transition: color 0.2s, transform 0.2s;
      cursor: pointer;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.12));
      &:hover { transform: translateY(-4px) scale(1.12); }
    }
    .payment-icon.visa:hover { color: #1a1f71; }
    .payment-icon.mastercard:hover { color: #eb001b; }
    .payment-icon.paypal:hover { color: #003087; }
    .payment-icon.amex:hover { color: #2e77bb; }
    @media (max-width: 900px) {
      .footer-payments { padding: 0.25rem 0.7rem; gap: 0.5rem; }
      .footer-payments-label { font-size: 0.97rem; margin-right: 0.4rem; }
    }
    @media (max-width: 600px) {
      .footer-payments { padding: 0.18rem 0.3rem; gap: 0.3rem; }
      .footer-payments-label { font-size: 0.92rem; margin-right: 0.2rem; }
      .payment-icon i { font-size: 1.3rem !important; }
    }
  `]
})
export class Footer {
  year = new Date().getFullYear();
} 