import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Categories } from './components/categories/categories';
import { Cart } from './components/cart/cart';
import { AlertDemo } from './components/shared/alert-demo/alert-demo';
import { Profile } from './components/profile/profile';
import { Checkout } from './components/checkout/checkout';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'categories', component: Categories },
  { path: 'profile', component: Profile },
  //private routes
  { path: 'alert-demo', component: AlertDemo },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: '**', redirectTo: '/home' }
];
