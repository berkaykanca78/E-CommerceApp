import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Category, DataService } from '../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories {
  categories = signal<Category[]>([]);
  private readonly dataService = inject(DataService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.dataService.getCategories().subscribe({
      next: (categories) => {
        if (categories && categories.length > 0) {
          this.categories.set(categories);
        }
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  trackByCategoryId = (index: number, category: Category): number => {
    return category.id;
  }
}
