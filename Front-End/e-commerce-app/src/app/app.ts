import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService, User } from './services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'e-commerce-app';
  private readonly dataService = inject(DataService);
  public readonly currentYear = new Date().getFullYear();
  users: User[] = [];

  ngOnInit() {
    this.loadUsers();
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
