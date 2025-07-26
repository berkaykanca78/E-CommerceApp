# 🛒 E-Commerce Uygulaması

Modern web teknolojileri kullanılarak geliştirilmiş kapsamlı bir e-ticaret platformu. Bu proje, kullanıcı dostu arayüz ve güçlü backend API'si ile tam özellikli bir online alışveriş deneyimi sunar.

## 🏗️ Proje Mimarisi

Bu proje, **Full-Stack** mimarisinde geliştirilmiş olup iki ana bileşenden oluşmaktadır:

### 🔧 Backend (.NET 9 Web API)
- **Framework:** .NET 9.0
- **Architecture:** RESTful Web API
- **Features:**
  - OpenAPI/Scalar desteği
  - CORS yapılandırması
  - Modern C# özellikleri (Nullable Reference Types, Implicit Usings)
  - Güvenli HTTPS yönlendirmesi

### 🎨 Frontend (Angular 20)
- **Framework:** Angular 20.0.0
- **Architecture:** Standalone Components
- **Features:**
  - Modern TypeScript 5.8
  - Responsive tasarım (Bootstrap 5)
  - Production-ready build konfigürasyonu
  - Server-Side Rendering (SSR)
  - Component-based modular architecture

## 📁 Proje Yapısı

```
E-CommerceApp/
├── 📂 Back-End/
│   └── 📂 E-Commerce/
│       ├── 📄 ECommerce.sln
│       └── 📂 ECommerce.WebAPI/
│           ├── 📂 Controllers/
│           ├── 📂 Entities/
│           ├── 📄 Program.cs
│           ├── 📄 ECommerce.WebAPI.csproj
│           └── 📄 appsettings.json
├── 📂 Front-End/
│   └── 📂 e-commerce-app/
│       ├── 📂 src/
│       │   ├── 📂 app/
│       │   │   ├── 📂 components/
│       │   │   │   ├── 📂 shared/
│       │   │   │   │   ├── 📂 data-grid/ (Pagination → Data Grid)
│       │   │   │   │   ├── 📂 charts/ (Chart.js demo)
│       │   │   │   │   ├── 📂 forms/ (Form demos)
│       │   │   │   │   ├── 📂 upload/ (File upload)
│       │   │   │   │   ├── 📂 cards/ (Card layouts)
│       │   │   │   │   ├── 📂 carousel/ (Gallery & carousel)
│       │   │   │   │   ├── 📂 alerts/
│       │   │   │   │   └── 📂 modals/
│       │   │   │   ├── 📂 products/
│       │   │   │   ├── 📂 dashboard/
│       │   │   │   └── 📂 home/
│       │   │   ├── 📂 layouts/
│       │   │   ├── 📂 services/
│       │   │   └── 📂 models/
│       │   └── 📂 assets/
│       ├── 📂 public/
│       ├── 📄 package.json
│       ├── 📄 angular.json
│       └── 📄 tsconfig.json
├── 📂 images/
│   ├── 🖼️ homepage.png
│   ├── 🖼️ product-list.png
│   ├── 🖼️ product-detail.png
│   ├── 🖼️ shopping-cart.png
│   ├── 🖼️ checkout.png
│   ├── 🖼️ user-profile.png
│   ├── 🖼️ admin-dashboard.png
│   ├── 🖼️ mobile-view.png
│   └── 🖼️ swagger-api.png
├── 📄 .gitignore
└── 📄 README.md
```

## 🚀 Kurulum ve Çalıştırma

### Ön Gereksinimler

- **.NET 9 SDK** - [İndir](https://dotnet.microsoft.com/download/dotnet/9.0)
- **Node.js** (v18 veya üzeri) - [İndir](https://nodejs.org/)
- **Angular CLI** - `npm install -g @angular/cli`

### Backend Kurulumu

1. Backend dizinine gidin:
```bash
cd Back-End/E-Commerce
```

2. Projeyi derleyin ve çalıştırın:
```bash
dotnet restore
dotnet build
dotnet run --project ECommerce.WebAPI
```

API şu adreste çalışacak: `https://localhost:5001` veya `http://localhost:5000`

### Frontend Kurulumu

1. Frontend dizinine gidin:
```bash
cd Front-End/e-commerce-app
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Development server'ı başlatın:
```bash
npm start
```

Uygulama şu adreste çalışacak: `http://localhost:4200`

## 🛠️ Geliştirme Komutları

### Backend Komutları
```bash
# Projeyi çalıştır
dotnet run

# Test modunda çalıştır
dotnet watch run

# Production build
dotnet publish -c Release
```

### Frontend Komutları
```bash
# Development server
npm start

# Production build
npm run build:prod

# Test çalıştır
npm test

# SSR server çalıştır
npm run serve:ssr:e-commerce-app
```

## ✨ Yeni Özellikler ve Geliştirmeler

### 🆕 Frontend Yenilikleri (Son Güncellemeler)

#### 🔄 Pagination → Data Grid Dönüşümü
- Tüm pagination component'lari `data-grid` olarak yeniden adlandırıldı
- Daha esnek ve genişletilebilir veri görüntüleme sistemi
- Grid ve tablo görünümü arasında geçiş imkanı
- Gelişmiş filtreleme ve arama özellikleri

#### 🎨 Yeni Demo Component'ları
- **Charts Demo**: Chart.js entegrasyonu ile dinamik grafikler
  - Line, Bar, Doughnut, Area chart örnekleri
  - Responsive ve interaktif grafikler
- **Forms Demo**: Comprehensive form examples
  - Template-driven forms
  - Reactive forms with validation
  - Dynamic forms (FormArray)
- **File Upload Demo**: Modern dosya yükleme sistemi
  - Drag & drop functionality
  - Multiple file selection
  - Image preview gallery
  - Progress tracking
- **Cards Demo**: Çeşitli kart layout'ları
  - Statistics cards, Product cards
  - Pricing cards, Feature cards
  - Team member cards
- **Carousel & Gallery Demo**: Medya görüntüleme
  - Basic carousel with navigation
  - Product carousel
  - Image gallery with lightbox
  - Filter functionality

#### 🎯 UI/UX İyileştirmeleri
- **Minimal Design**: Data grid header'ları için minimal tasarım
- **Real Images**: Unsplash entegrasyonu ile gerçek resimler
- **Responsive Design**: Bootstrap 5 ile tam responsive tasarım
- **Modern Animations**: Smooth transitions ve hover efektleri
- **Improved Navigation**: Dashboard sidebar'da gelişmiş menü sistemi

#### 🏗️ Teknik Geliştirmeler
- **Standalone Components**: Angular 20'nin yeni component yapısı
- **TypeScript Strict Mode**: Enhanced type safety
- **Modular Architecture**: Yeniden kullanılabilir component yapısı
- **Performance Optimization**: Lazy loading ve code splitting

## 🌐 API Endpoints

Backend API şu temel endpoint'leri sağlar:

- **Base URL:** `https://localhost:5001/api`
- **Swagger UI:** `https://localhost:5001/swagger` (Development modunda)

### Kullanılabilir Endpoint'ler
- `GET /api/products` - Ürün listesi
- `GET /api/products/{id}` - Tekil ürün
- `POST /api/products` - Yeni ürün ekleme
- `PUT /api/products/{id}` - Ürün güncelleme  
- `DELETE /api/products/{id}` - Ürün silme

## 🔒 Güvenlik Özellikleri

- **CORS Politikaları:** Angular frontend için özel CORS yapılandırması
- **HTTPS Yönlendirmesi:** Güvenli bağlantı zorlaması
- **Environment-based Configuration:** Geliştirme ve production ortamları için ayrı ayarlar

## 🌍 Deployment

### Production URL'leri
- **Frontend:** `https://e-ticaret.berkaykanca.com`
- **Backend API:** Yapılandırılmış CORS ile desteklenir

### Demo Pages
- **Dashboard Home:** `/dashboard`
- **Data Grid Demo:** `/dashboard/data-grid-demo`
- **Charts Demo:** `/dashboard/charts-demo`
- **Forms Demo:** `/dashboard/forms-demo`
- **File Upload Demo:** `/dashboard/upload-demo`
- **Cards Demo:** `/dashboard/cards-demo`
- **Carousel & Gallery:** `/dashboard/carousel-demo`
- **Products Management:** `/dashboard/products`
- **Categories Management:** `/dashboard/categories`

### Build Komutları 
```bash
# Backend production build
dotnet publish -c Release -o ./publish

# Frontend production build  
ng build --configuration production
```

## 🧪 Test

### Backend Testleri
```bash
dotnet test
```

### Frontend Testleri
```bash
# Unit testleri çalıştır
ng test

# E2E testleri çalıştır
ng e2e
```

## 🚀 Performans ve Optimizasyon

### Frontend Performans
- **Lazy Loading** - Route-based code splitting
- **OnPush Change Detection** - Optimized component updates
- **Trackby Functions** - Efficient list rendering
- **Image Optimization** - WebP format ve lazy loading
- **Bundle Size Optimization** - Tree shaking ve minification

### Best Practices
- **Angular Style Guide** - Consistent code structure
- **TypeScript Strict Mode** - Type safety
- **ESLint + Prettier** - Code quality ve formatting
- **Component Architecture** - Reusable ve maintainable components
- **Error Handling** - Global error handling strategy

## 🎯 Gelecek Planlar

### Kısa Vadeli Hedefler
- [ ] **Dark Mode** - Theme switching functionality
- [ ] **i18n Support** - Multi-language support
- [ ] **PWA Features** - Offline support ve push notifications
- [ ] **Advanced Filtering** - Multi-criteria product filtering
- [ ] **Payment Integration** - Stripe/PayPal integration

### Orta Vadeli Hedefler
- [ ] **Real-time Updates** - SignalR integration
- [ ] **Database Integration** - Entity Framework Core
- [ ] **Authentication & Authorization** - JWT + Identity
- [ ] **API Rate Limiting** - Backend security enhancements
- [ ] **Microservices Architecture** - Service decomposition

### Uzun Vadeli Vizyon
- [ ] **Mobile App** - React Native/Flutter
- [ ] **Analytics Dashboard** - Business intelligence
- [ ] **AI Recommendations** - Machine learning integration
- [ ] **Cloud Deployment** - Azure/AWS containerization
- [ ] **Performance Monitoring** - APM tools integration

## 📦 Kullanılan Teknolojiler ve Versiyonlar

### 🔧 Backend Stack (.NET 9.0)

#### Framework ve Runtime
- **.NET 9.0** - Modern web framework
- **ASP.NET Core Web API** - RESTful API geliştirme
- **C# 12** - Nullable Reference Types, Implicit Usings

#### NuGet Paketleri
```xml
<PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="9.0.5" />
```

#### Özellikler
- **OpenAPI/Swagger** - API dokümantasyonu ve test arayüzü
- **CORS** - Cross-Origin Resource Sharing desteği
- **HTTPS Redirection** - Güvenli bağlantı zorlaması
- **Controller-based API** - MVC pattern ile endpoint yönetimi

### 🎨 Frontend Stack (Angular 20.0.0)

#### Framework ve Araçlar
- **Angular 20.0.0** - Modern web framework
- **TypeScript 5.8.2** - Type-safe JavaScript
- **Angular CLI 20.0.1** - Geliştirme araçları
- **Node.js** - JavaScript runtime environment

#### NPM Dependencies (Production)
```json
{
  "@angular/common": "^20.0.0",
  "@angular/compiler": "^20.0.0", 
  "@angular/core": "^20.0.0",
  "@angular/forms": "^20.0.0",
  "@angular/platform-browser": "^20.0.0",
  "@angular/platform-server": "^20.0.0",
  "@angular/router": "^20.0.0",
  "@angular/ssr": "^20.0.1",
  "bootstrap": "^5.3.0",
  "chart.js": "^4.4.0",
  "express": "^5.1.0",
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0"
}
```

#### NPM DevDependencies (Development)
```json
{
  "@angular/build": "^20.0.1",
  "@angular/cli": "^20.0.1",
  "@angular/compiler-cli": "^20.0.0",
  "@types/express": "^5.0.1",
  "@types/jasmine": "~5.1.0",
  "@types/node": "^20.17.19",
  "jasmine-core": "~5.7.0",
  "karma": "~6.4.0",
  "karma-chrome-launcher": "~3.2.0",
  "karma-coverage": "~2.2.0",
  "karma-jasmine": "~5.1.0",
  "karma-jasmine-html-reporter": "~2.1.0",
  "typescript": "~5.8.2"
}
```

#### Frontend Özellikleri
- **Server-Side Rendering (SSR)** - @angular/ssr ile SEO optimizasyonu
- **Standalone Components** - Angular 20'nin modern component yapısı
- **Bootstrap 5.3** - Responsive UI framework ve utility classes
- **Chart.js 4.4** - Interactive data visualization
- **RxJS 7.8** - Reactive programming ve HTTP client
- **Express.js 5.1** - SSR server
- **Karma + Jasmine** - Unit test framework
- **TypeScript strict mode** - Tip güvenliği ve kod kalitesi
- **Unsplash Integration** - High-quality real images
- **Font Awesome** - Icon library
- **CSS Grid & Flexbox** - Modern layout systems

### 🛠️ Geliştirme Araçları

#### Backend Tools
- **Visual Studio 2022** / **VS Code** - IDE desteği
- **Swagger UI** - API test arayüzü
- **IIS Express** - Development server
- **dotnet CLI** - Command line interface

#### Frontend Tools  
- **Angular CLI** - Proje yönetimi ve build araçları
- **Webpack** - Modül bundler (Angular CLI içinde)
- **TypeScript Compiler** - ES6+ transpilation
- **Chrome DevTools** - Debugging ve profiling

### 📋 Sistem Gereksinimleri
- **.NET 9 SDK** - Backend geliştirme için
- **Node.js 18+** - Frontend geliştirme için
- **Visual Studio 2022** / **VS Code** - Önerilen IDE
- **Git** - Versiyon kontrol sistemi

## 🤝 Katkıda Bulunma

1. Bu repo'yu fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 👨‍💻 Geliştirici

**Berkay Kanca**
- GitHub: [@berkaykanca](https://github.com/berkaykanca78)
- Website: [berkaykanca.com](https://berkaykanca.com)
- Demo: [e-ticaret.berkaykanca.com](https://e-ticaret.berkaykanca.com)

## 📞 İletişim

Proje hakkında sorularınız için:
- Email: [berkaykanca@hotmail.com](mailto:berkaykanca@hotmail.com)
- LinkedIn: [Berkay Kanca](https://linkedin.com/in/berkay-kanca)

---

⭐ Bu projeyi beğendiyseniz, lütfen yıldız vermeyi unutmayın! 
