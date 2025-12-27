import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  systemStatus = [
    {
      title: 'SYSTEM UPTIME',
      value: '98.5%',
      trendBadge: '+0.2%',
      trendUp: true,
      metaLabel: 'Target: 99.0%',
      statusLabel: 'Good',
      icon: '⏱️',
      colorTheme: 'green',
      progress: 98
    },
    {
      title: 'OIL PRESSURE',
      value: '84 PSI',
      trendBadge: '~5%',
      trendUp: false, // neutral/wavy
      metaLabel: 'Range: 80-100 PSI',
      statusLabel: 'Check Soon',
      icon: '💧',
      colorTheme: 'yellow',
      progress: 75
    },
    {
      title: 'VIBRATION LEVEL',
      value: '4.2 g',
      trendBadge: '15%',
      trendUp: true, // Up is bad here, usually. But let's follow visual. It's red.
      metaLabel: 'Threshold: 3.0g',
      statusLabel: 'CRITICAL',
      icon: '⚠️',
      colorTheme: 'red',
      progress: 100 // Full red
    },
    {
      title: 'ACTIVE WORK ORDERS',
      value: '12',
      trendBadge: 'Pending',
      isBadgeText: true,
      metaLabel: 'Capacity: 20/day',
      statusLabel: 'Normal Load',
      icon: '📋',
      colorTheme: 'orange',
      progress: 60
    }
  ];

  energyData = [
    { height: 40 }, { height: 50 }, { height: 35 }, { height: 100, active: true },
    { height: 60 }, { height: 80 }, { height: 70 }, { height: 45 },
    { height: 65 }, { height: 30 }, { height: 55 }, { height: 90 }
  ];

  recentAlerts = [
    {
      title: 'Pump #4 Vibration High',
      desc: 'Threshold exceeded by 15%',
      time: '2m ago',
      color: 'red'
    },
    {
      title: 'Filter Replacement Due',
      desc: 'Unit A-12 Maintenance',
      time: '1h ago',
      color: 'yellow'
    },
    {
      title: 'System Backup Complete',
      desc: 'Automated daily task',
      time: '3h ago',
      color: 'neutral'
    },
    {
      title: 'User Login: T. Stark',
      desc: 'Remote Access',
      time: '5h ago',
      color: 'neutral'
    }
  ];
}
