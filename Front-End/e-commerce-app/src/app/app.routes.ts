import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Categories } from './components/categories/categories';
import { Cart } from './components/cart/cart';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'categories', component: Categories },
  { path: 'cart', component: Cart },
  { path: '**', redirectTo: '/home' }
];
