import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface KPI {
  label: string;
  value: string; // e.g., "87%"
  trend?: string; // e.g., "2.4%"
  trendDirection?: 'up' | 'down'; // 'up' usually good, unless it's time
  trendLabel?: string;
  description: string;
  icon: string;
  progressValue?: number; // for progress bar
  progressColor?: string;
  targetText?: string;
  breakdown?: { label: string; count: number; color: string; }[]; // For technicians
}

interface Performer {
  name: string;
  value: number; // For bar height logic
}

@Component({
  selector: 'app-technician-performance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technician-performance.component.html',
  styleUrl: './technician-performance.component.scss'
})
export class TechnicianPerformanceComponent {

  // Overall Efficiency
  efficiencyKPI: KPI = {
    label: 'OVERALL EFFICIENCY',
    value: '87%',
    trend: '2.4%',
    trendDirection: 'up',
    description: '',
    icon: 'bolt',
    progressValue: 87,
    targetText: 'Target: 85% efficiency across all shifts'
  };

  // Avg Repair Time
  repairTimeKPI: KPI = {
    label: 'AVG. REPAIR TIME',
    value: '4h 12m',
    trend: '15m',
    trendDirection: 'down', // Down is good here (green)
    description: 'Average MTTR improved significantly this week.',
    trendLabel: 'Previous period: 4h 27m',
    icon: 'schedule'
  };

  // Active Technicians
  techKPI: KPI = {
    label: 'ACTIVE TECHNICIANS',
    value: '24',
    description: 'Shift: Day (06:00 - 18:00)',
    icon: 'engineering',
    breakdown: [
      { label: 'Available', count: 18, color: '#65a30d' }, // Green
      { label: 'Busy', count: 4, color: '#ea580c' }, // Orange
      { label: 'Offline', count: 2, color: '#dc2626' } // Red
    ]
  };

  timelinessData = {
    total: 342,
    breakdown: [
      { label: 'On Time', percent: 85, color: '#65a30d' },
      { label: 'Within Warning', percent: 10, color: '#ea580c' },
      { label: 'Late / Overdue', percent: 5, color: '#dc2626' }
    ]
  };

  topPerformers: Performer[] = [
    { name: 'J. Doe', value: 80 },
    { name: 'M. Smith', value: 95 },
    { name: 'A. Ray', value: 60 },
    { name: 'K. Lee', value: 75 },
    { name: 'T. Stark', value: 90 },
    { name: 'B. Wu', value: 65 }
  ];

  constructor() { }
}
