import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var Chart: any;

@Component({
  selector: 'app-charts-demo',
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <h2 class="mb-4">Charts Demo</h2>
      <p class="text-muted mb-4">Various chart types using Chart.js library.</p>
      
      <div class="row g-4">
        <!-- Line Chart -->
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Sales Over Time</h5>
            </div>
            <div class="card-body">
              <canvas id="lineChart" width="400" height="200"></canvas>
            </div>
          </div>
        </div>

        <!-- Bar Chart -->
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Products by Category</h5>
            </div>
            <div class="card-body">
              <canvas id="barChart" width="400" height="200"></canvas>
            </div>
          </div>
        </div>

        <!-- Doughnut Chart -->
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Order Status Distribution</h5>
            </div>
            <div class="card-body">
              <canvas id="doughnutChart" width="400" height="200"></canvas>
            </div>
          </div>
        </div>

        <!-- Area Chart -->
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Revenue Growth</h5>
            </div>
            <div class="card-body">
              <canvas id="areaChart" width="400" height="200"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
  `]
})
export class ChartsDemo implements OnInit, AfterViewInit {

  ngOnInit() {
    // Load Chart.js if not already loaded
    if (typeof Chart === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => {
        this.initializeCharts();
      };
      document.head.appendChild(script);
    }
  }

  ngAfterViewInit() {
    if (typeof Chart !== 'undefined') {
      setTimeout(() => {
        this.initializeCharts();
      }, 100);
    }
  }

  private initializeCharts() {
    this.createLineChart();
    this.createBarChart();
    this.createDoughnutChart();
    this.createAreaChart();
  }

  private createLineChart() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales ($)',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private createBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Electronics', 'Fashion', 'Sports', 'Books', 'Home'],
        datasets: [{
          label: 'Products',
          data: [45, 78, 32, 25, 55],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private createDoughnutChart() {
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        datasets: [{
          data: [15, 25, 30, 85, 10],
          backgroundColor: [
            'rgba(255, 193, 7, 0.8)',
            'rgba(13, 202, 240, 0.8)',
            'rgba(111, 66, 193, 0.8)',
            'rgba(25, 135, 84, 0.8)',
            'rgba(220, 53, 69, 0.8)'
          ],
          borderColor: [
            'rgba(255, 193, 7, 1)',
            'rgba(13, 202, 240, 1)',
            'rgba(111, 66, 193, 1)',
            'rgba(25, 135, 84, 1)',
            'rgba(220, 53, 69, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  private createAreaChart() {
    const ctx = document.getElementById('areaChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Revenue',
          data: [85000, 125000, 95000, 150000],
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.3)',
          fill: true,
          tension: 0.4
        }, {
          label: 'Expenses',
          data: [65000, 85000, 75000, 95000],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.3)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
} 