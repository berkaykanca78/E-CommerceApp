import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-home',
  imports: [CommonModule],
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.scss']
})
export class DashboardHome implements OnInit, AfterViewInit {
  @ViewChild('salesChart', { static: false }) salesChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ordersChart', { static: false }) ordersChartRef!: ElementRef<HTMLCanvasElement>;

  salesChart: Chart | null = null;
  ordersChart: Chart | null = null;
  salesPeriod: string = 'month';
  Math = Math;

  // Statistics Data
  stats = [
    {
      icon: 'fas fa-shopping-cart',
      value: '$45,678',
      label: 'Total Revenue',
      change: 12.5,
      color: '#3b82f6'
    },
    {
      icon: 'fas fa-box',
      value: '1,234',
      label: 'Total Orders',
      change: 8.3,
      color: '#10b981'
    },
    {
      icon: 'fas fa-users',
      value: '892',
      label: 'Active Customers',
      change: 15.7,
      color: '#f59e0b'
    },
    {
      icon: 'fas fa-chart-line',
      value: '67',
      label: 'Products Sold',
      change: -2.4,
      color: '#ef4444'
    }
  ];

  // Top Products Data
  topProducts = [
    {
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      sales: '12,450',
      units: 245
    },
    {
      name: 'Smart Fitness Watch',
      category: 'Wearables',
      sales: '8,920',
      units: 178
    },
    {
      name: 'Premium Coffee Maker',
      category: 'Appliances',
      sales: '6,780',
      units: 89
    },
    {
      name: 'Organic Cotton T-Shirt',
      category: 'Fashion',
      sales: '5,640',
      units: 156
    },
    {
      name: 'Gaming Mechanical Keyboard',
      category: 'Electronics',
      sales: '4,320',
      units: 72
    }
  ];

  // Recent Orders Data
  recentOrders = [
    {
      id: '12854',
      customer: 'John Smith',
      amount: '245.99',
      status: 'Completed',
      date: '2 hours ago'
    },
    {
      id: '12853',
      customer: 'Sarah Johnson',
      amount: '189.50',
      status: 'Processing',
      date: '4 hours ago'
    },
    {
      id: '12852',
      customer: 'Mike Wilson',
      amount: '399.99',
      status: 'Shipped',
      date: '6 hours ago'
    },
    {
      id: '12851',
      customer: 'Emily Davis',
      amount: '156.75',
      status: 'Pending',
      date: '8 hours ago'
    },
    {
      id: '12850',
      customer: 'Robert Brown',
      amount: '289.25',
      status: 'Completed',
      date: '12 hours ago'
    }
  ];

  // Revenue by Category Data
  revenueByCategory = [
    {
      name: 'Electronics',
      amount: '18,450',
      percentage: 85,
      color: '#3b82f6'
    },
    {
      name: 'Fashion',
      amount: '12,890',
      percentage: 65,
      color: '#10b981'
    },
    {
      name: 'Home & Garden',
      amount: '8,750',
      percentage: 45,
      color: '#f59e0b'
    },
    {
      name: 'Sports',
      amount: '6,230',
      percentage: 35,
      color: '#ef4444'
    },
    {
      name: 'Books',
      amount: '3,890',
      percentage: 20,
      color: '#8b5cf6'
    }
  ];

  // Recent Activity Data
  recentActivity = [
    {
      icon: 'fas fa-shopping-cart',
      text: 'New order #12854 received from John Smith',
      time: '2 minutes ago',
      color: '#10b981'
    },
    {
      icon: 'fas fa-box',
      text: 'Product "Wireless Headphones" restocked (50 units)',
      time: '15 minutes ago',
      color: '#3b82f6'
    },
    {
      icon: 'fas fa-user-plus',
      text: 'New customer Sarah Johnson registered',
      time: '1 hour ago',
      color: '#f59e0b'
    },
    {
      icon: 'fas fa-truck',
      text: 'Order #12850 has been shipped',
      time: '2 hours ago',
      color: '#6366f1'
    },
    {
      icon: 'fas fa-star',
      text: 'New 5-star review received for Coffee Maker',
      time: '3 hours ago',
      color: '#fbbf24'
    },
    {
      icon: 'fas fa-exclamation-triangle',
      text: 'Low stock alert: Gaming Keyboard (5 units left)',
      time: '4 hours ago',
      color: '#ef4444'
    }
  ];

  // Chart Data
  salesData = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [1200, 1900, 3000, 5000, 2000, 3000, 4500]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [12000, 19000, 15000, 22000]
    },
    year: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [45000, 52000, 48000, 61000, 55000, 67000, 73000, 69000, 76000, 82000, 79000, 95000]
    }
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeCharts();
  }

  setSalesPeriod(period: string): void {
    this.salesPeriod = period;
    this.updateSalesChart();
  }

  private initializeCharts(): void {
    this.initializeSalesChart();
    this.initializeOrdersChart();
  }

  private initializeSalesChart(): void {
    const ctx = this.salesChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.salesChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.salesData[this.salesPeriod as keyof typeof this.salesData].labels,
          datasets: [{
            label: 'Sales ($)',
            data: this.salesData[this.salesPeriod as keyof typeof this.salesData].data,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#3b82f6',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                callback: function(value) {
                  return '$' + value.toLocaleString();
                }
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          elements: {
            point: {
              hoverBackgroundColor: '#3b82f6'
            }
          }
        }
      });
    }
  }

  private initializeOrdersChart(): void {
    const ctx = this.ordersChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.ordersChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'Processing', 'Shipped', 'Pending', 'Cancelled'],
          datasets: [{
            data: [45, 25, 15, 10, 5],
            backgroundColor: [
              '#10b981',
              '#f59e0b',
              '#3b82f6',
              '#6366f1',
              '#ef4444'
            ],
            borderWidth: 0,
            hoverBorderWidth: 2,
            hoverBorderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                padding: 20,
                usePointStyle: true,
                pointStyle: 'circle'
              }
            }
          },
          cutout: '60%'
        }
      });
    }
  }

  private updateSalesChart(): void {
    if (this.salesChart) {
      this.salesChart.data.labels = this.salesData[this.salesPeriod as keyof typeof this.salesData].labels;
      this.salesChart.data.datasets[0].data = this.salesData[this.salesPeriod as keyof typeof this.salesData].data;
      this.salesChart.update();
    }
  }

  ngOnDestroy(): void {
    if (this.salesChart) {
      this.salesChart.destroy();
    }
    if (this.ordersChart) {
      this.ordersChart.destroy();
    }
  }
} 