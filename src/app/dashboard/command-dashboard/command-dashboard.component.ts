import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-command-dashboard',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './command-dashboard.component.html',
  styleUrl: './command-dashboard.component.scss'
})
export class CommandDashboardComponent {
  stats = [
    {
      label: 'CRITICAL EQUIPMENT',
      value: '3',
      subtext: '1 new',
      subtextLabel: 'since last shift',
      subtextClass: 'text-danger',
      icon: 'assets/icons/alert-triangle.svg', // Placeholder, using CSS for now or text
      progress: 30, // Percentage
      colorClass: 'danger',
      indicatorIcon: '!'
    },
    {
      label: 'TECHNICIAN LOAD',
      value: '87%',
      subtext: 'High',
      subtextLabel: 'capacity utilization',
      subtextClass: 'text-warning',
      icon: 'assets/icons/users.svg',
      progress: 87,
      colorClass: 'warning',
      indicatorIcon: '⚙️'
    },
    {
      label: 'OPEN REQUESTS',
      value: '12',
      subtext: '4 closed',
      subtextLabel: 'today',
      subtextClass: 'text-success',
      icon: 'assets/icons/clipboard.svg',
      progress: 60, // approximate based on visual
      colorClass: 'success',
      indicatorIcon: '✓'
    }
  ];

  activityFeed = [
    {
      title: 'Hydraulic Pump Failure detected',
      desc: 'Unit B-42 reporting pressure drop below threshold.',
      virtualTime: '2m ago',
      type: 'alert',
      tags: ['AUTO-ALERT', 'HIGH PRIORITY']
    },
    {
      title: 'Technician assigned to Conveyor 3',
      desc: 'Sarah J. accepted ticket #4921.',
      virtualTime: '15m ago',
      type: 'user',
      userInitials: 'SJ'
    },
    {
      title: 'Routine maintenance completed',
      desc: 'Monthly checkup for Robotic Arm A1 finished successfully.',
      virtualTime: '1h ago',
      type: 'success'
    }
  ];

  recommendations = [
    {
      badge: 'IMMEDIATE',
      badgeClass: 'badge-danger',
      title: 'Review Pump Failure',
      desc: 'Unit B-42 needs immediate assessment before shift change.'
    },
    {
      badge: 'REVIEW',
      badgeClass: 'badge-warning',
      title: 'Approve Parts Order',
      desc: 'Order #9921 pending approval for 3 hours.'
    },
    {
      badge: 'PLANNING',
      badgeClass: 'badge-neutral',
      title: 'Weekly Schedule Draft',
      desc: 'Finalize technician rotation for next week.'
    }
  ];
}
