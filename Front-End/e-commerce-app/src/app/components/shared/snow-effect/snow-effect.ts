import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snow-effect',
  imports: [CommonModule],
  templateUrl: './snow-effect.html',
  styleUrl: './snow-effect.scss'
})
export class SnowEffect {
  snowflakes: Array<{ left: number; delay: number; duration: number }> = [];

  constructor() {
    // 50 kar tanesi oluştur - rastgele pozisyonlar ve gecikmeler
    this.snowflakes = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }));
  }
}

