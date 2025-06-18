import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Category } from '../../models';
import { CommonModule } from '@angular/common';
import { Category as CategoryService } from '../../services/category';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories {
  categories = signal<Category[]>([]);
  private readonly dataService = inject(CategoryService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.dataService.getCategories(1, 10).subscribe({
      next: (response) => {
        if (response && response["$values"].length > 0) {
          this.categories.set(response["$values"]);
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
