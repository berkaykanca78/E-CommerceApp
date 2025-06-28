import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Categories } from './components/categories/categories';
import { Cart } from './components/cart/cart';
import { AlertDemo } from './components/shared/alerts/alert-demo';
import { Profile } from './components/profile/profile';
import { Checkout } from './components/checkout/checkout';
import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';
import { ForgotPassword } from './components/auth/forgot-password/forgot-password';
import { Dashboard } from './layouts/dashboard/dashboard';
import { MainLayout } from './layouts/main/main-layout';
import { PaginationDemo } from './components/shared/pagination/pagination-demo';
import { ModalDemo } from './components/shared/modal-demo/modal-demo';
import { Faq } from './components/customer-services/faq/faq';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { ShippingInfo } from './components/customer-services/shipping-info/shipping-info';
import { Returns } from './components/customer-services/returns/returns';
import { TrackOrder } from './components/customer-services/track-order/track-order';
import { DashboardProducts } from './components/dashboard/products/dashboard-products';
import { DashboardCategories } from './components/dashboard/categories/dashboard-categories';

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
      { path: 'about', component: About },
      { path: 'contact', component: Contact },
      { path: 'customer-services/faq', component: Faq },
      { path: 'customer-services/shipping-info', component: ShippingInfo },
      { path: 'customer-services/returns', component: Returns },
      { path: 'customer-services/track-order', component: TrackOrder },
    ]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    //canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: DashboardProducts },
      { path: 'categories', component: DashboardCategories },
      { path: 'alert-demo', component: AlertDemo },
      { path: 'pagination-demo', component: PaginationDemo },
      { path: 'modal-demo', component: ModalDemo },
    ]
  },
  { path: '**', redirectTo: 'home' }
];
