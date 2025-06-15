import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { DataService, Product, User } from './services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'e-commerce-app';
  private readonly dataService = inject(DataService);
  private readonly titleService = inject(Title);
  private readonly router = inject(Router);
  public readonly currentYear = new Date().getFullYear();
  users: User[] = [];
  products: Product[] = [];

  ngOnInit() {
    //this.loadUsers();
    this.setupTitleChange();
  }

  private setupTitleChange(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateTitle(event.urlAfterRedirects);
      });
    
    // İlk sayfa yüklendiğinde title'ı ayarla
    this.updateTitle(this.router.url);
  }

  private updateTitle(url: string): void {
    let pageTitle = 'E-Ticaret';
    
    if (url.includes('/home') || url === '/') {
      pageTitle = 'Ana Sayfa - E-Ticaret';
    } else if (url.includes('/products')) {
      pageTitle = 'Ürünler - E-Ticaret';
    }
    
    this.titleService.setTitle(pageTitle);
  }

  private loadUsers(): void {
    this.dataService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Kullanıcılar yüklendi:', users);
      },
      error: (error) => {
        console.error('Kullanıcılar yüklenirken hata oluştu:', error);
      }
    });
  }
}
