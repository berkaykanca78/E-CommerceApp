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
- **Features:**
  - Modern TypeScript 5.8
  - Responsive tasarım
  - Production-ready build konfigürasyonu

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
- **RxJS 7.8** - Reactive programming ve HTTP client
- **Express.js 5.1** - SSR server
- **Karma + Jasmine** - Unit test framework
- **TypeScript strict mode** - Tip güvenliği ve kod kalitesi

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
