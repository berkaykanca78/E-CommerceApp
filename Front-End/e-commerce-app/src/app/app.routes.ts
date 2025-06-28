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
import { DataGridDemo } from './components/shared/data-grid/data-grid-demo';
import { ModalDemo } from './components/shared/modal-demo/modal-demo';
import { ChartsDemo } from './components/shared/charts/charts-demo';
import { FormsDemo } from './components/shared/forms/forms-demo';
import { UploadDemo } from './components/shared/upload/upload-demo';
import { CardsDemo } from './components/shared/cards/cards-demo';
import { CarouselDemo } from './components/shared/carousel/carousel-demo';
import { Faq } from './components/customer-services/faq/faq';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { ShippingInfo } from './components/customer-services/shipping-info/shipping-info';
import { Returns } from './components/customer-services/returns/returns';
import { TrackOrder } from './components/customer-services/track-order/track-order';
import { DashboardProducts } from './components/dashboard/products/dashboard-products';
import { DashboardCategories } from './components/dashboard/categories/dashboard-categories';
import { DashboardHome } from './components/dashboard/home/dashboard-home';

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
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardHome },
      { path: 'products', component: DashboardProducts },
      { path: 'categories', component: DashboardCategories },
      { path: 'alert-demo', component: AlertDemo },
      { path: 'data-grid-demo', component: DataGridDemo },
      { path: 'modal-demo', component: ModalDemo },
      { path: 'charts-demo', component: ChartsDemo },
      { path: 'forms-demo', component: FormsDemo },
      { path: 'upload-demo', component: UploadDemo },
      { path: 'cards-demo', component: CardsDemo },
      { path: 'carousel-demo', component: CarouselDemo },
    ]
  },
  { path: '**', redirectTo: 'home' }
];
