import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-command-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './command-dashboard.component.html',
  styleUrl: './command-dashboard.component.scss'
})
export class CommandDashboardComponent implements OnInit {
  stats: any[] = [];
  activityFeed: any[] = [];
  recommendations: any[] = [];
  isLoading = true;

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;

    this.dashboardService.getDashboardMetrics().subscribe({
      next: (metrics) => {
        this.stats = [
          {
            label: 'CRITICAL EQUIPMENT',
            value: metrics.criticalEquipment.toString(),
            subtext: 'Requires Action', // Dynamic calculation hard without historical data
            subtextLabel: 'now',
            subtextClass: 'text-danger',
            icon: 'assets/icons/alert-triangle.svg',
            progress: (metrics.criticalEquipment / 10) * 100, // Arbitrary max 10
            colorClass: 'danger',
            indicatorIcon: '!'
          },
          {
            label: 'TECHNICIAN LOAD',
            value: Math.round((metrics.activeTasks / metrics.totalTechs) * 100) + '%',
            subtext: (metrics.activeTasks / metrics.totalTechs) > 0.8 ? 'High Load' : 'Optimal',
            subtextLabel: 'utilization',
            subtextClass: (metrics.activeTasks / metrics.totalTechs) > 0.8 ? 'text-danger' : 'text-warning',
            icon: 'assets/icons/users.svg',
            progress: Math.min(((metrics.activeTasks / metrics.totalTechs) * 100), 100),
            colorClass: 'warning',
            indicatorIcon: '⚙️'
          },
          {
            label: 'OPEN REQUESTS',
            value: metrics.openRequests.toString(),
            subtext: 'Active tickets',
            subtextLabel: 'tracker',
            subtextClass: 'text-success',
            icon: 'assets/icons/clipboard.svg',
            progress: 50,
            colorClass: 'success',
            indicatorIcon: '✓'
          }
        ];
      },
      error: (err) => console.error(err)
    });

    this.dashboardService.getActivityFeed().subscribe({
      next: (data) => {
        this.activityFeed = data.map(item => ({
          title: item.title || 'System Alert',
          desc: item.message || item.description || 'No description',
          virtualTime: this.timeSince(item.created_at),
          type: item.type === 'alert' ? 'alert' : 'success', // map DB types
          tags: item.tags ? item.tags.split(',') : []
        }));
      }
    });

    this.dashboardService.getRecommendations().subscribe({
      next: (data) => {
        this.recommendations = data.map(rec => ({
          badge: rec.priority || 'INFO',
          badgeClass: this.getBadgeClass(rec.priority),
          title: rec.title,
          desc: rec.description
        }));
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  private timeSince(dateString: string): string {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return "Just now";
  }

  private getBadgeClass(priority: string): string {
    const p = (priority || '').toLowerCase();
    if (p.includes('high') || p.includes('immediate')) return 'badge-danger';
    if (p.includes('medium') || p.includes('review')) return 'badge-warning';
    return 'badge-neutral';
  }
}
