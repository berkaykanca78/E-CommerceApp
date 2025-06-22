import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Categories } from './components/categories/categories';
import { Cart } from './components/cart/cart';
import { AlertDemo } from './components/shared/alerts/alert-demo';
import { Profile } from './components/profile/profile';
import { Checkout } from './components/checkout/checkout';
import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup';
import { ForgotPassword } from './components/auth/forgot-password';
import { AuthGuard } from './guards/auth.guard';
import { Dashboard } from './components/dashboard/dashboard';
import { MainLayout } from './layouts/main-layout';
import { PaginationDemo } from './components/shared/pagination/pagination-demo';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'products', component: Products },
      { path: 'categories', component: Categories },
      { path: 'profile', component: Profile}, //, canActivate: [AuthGuard] },
      { path: 'login', component: Login },
      { path: 'signup', component: Signup },
      { path: 'forgot-password', component: ForgotPassword },
      { path: 'cart', component: Cart },
      { path: 'checkout', component: Checkout}, //, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    //canActivate: [AuthGuard],
    children: [
      { path: 'alert-demo', component: AlertDemo },
      { path: 'pagination-demo', component: PaginationDemo },
    ]
  },
  { path: '**', redirectTo: 'home' }
];
