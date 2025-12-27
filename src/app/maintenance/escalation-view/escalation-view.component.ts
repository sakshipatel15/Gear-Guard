import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EscalationItem {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'WARNING' | 'ROUTINE';
  equipment: { name: string; icon: string }; // simple icon class shim
  responsible: { name: string; avatar: string };
  time: string;
  timeColor: string; // 'text-danger' etc
}

interface SummaryCard {
  title: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  trendColor: 'text-success' | 'text-danger' | 'text-warning'; // For the small badge bg actually
  icon: string;
}

@Component({
  selector: 'app-escalation-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './escalation-view.component.html',
  styleUrls: ['./escalation-view.component.scss']
})
export class EscalationViewComponent {

  summaryCards: SummaryCard[] = [
    { title: 'Critical Alerts', value: '3', trend: '~20%', trendDirection: 'up', trendColor: 'text-danger', icon: 'warning' },
    { title: 'Pending Review', value: '12', trend: '~5%', trendDirection: 'up', trendColor: 'text-warning', icon: 'pending_actions' },
    { title: 'Avg Response Time', value: '45m', trend: '~10%', trendDirection: 'down', trendColor: 'text-success', icon: 'timer' }
  ];

  escalationList: EscalationItem[] = [
    {
      id: 'ESC-2024-001',
      title: 'Hydraulic Pump Failure',
      severity: 'CRITICAL',
      equipment: { name: 'Press #4', icon: 'precision_manufacturing' },
      responsible: { name: 'J. Doe', avatar: 'https://i.pravatar.cc/150?u=jdoe' },
      time: '1h 12m',
      timeColor: 'text-danger'
    },
    {
      id: 'ESC-2024-002',
      title: 'Safety Guard Breach',
      severity: 'CRITICAL',
      equipment: { name: 'Line B', icon: 'conveyor_belt' }, // using material icons text
      responsible: { name: 'S. Lee', avatar: 'https://i.pravatar.cc/150?u=slee' },
      time: '45m',
      timeColor: 'text-danger'
    },
    {
      id: 'ESC-2024-008',
      title: 'Overheating Sensor',
      severity: 'WARNING',
      equipment: { name: 'Conveyor Belt A', icon: 'sensors' },
      responsible: { name: 'M. Smith', avatar: 'https://i.pravatar.cc/150?u=msmith' },
      time: '2h 15m',
      timeColor: 'text-dark'
    },
    {
      id: 'ESC-2024-012',
      title: 'Pressure Valve Leaking',
      severity: 'WARNING',
      equipment: { name: 'Mixer Tank 3', icon: 'sensors' }, // 'valve' might not be standard, using 'plumbing' or similar visually in HTML if needed, but text is fine
      responsible: { name: 'R. Ray', avatar: 'https://i.pravatar.cc/150?u=rray' },
      time: '3h 05m',
      timeColor: 'text-dark'
    },
    {
      id: 'ESC-2024-015',
      title: 'Filter Change Due',
      severity: 'ROUTINE',
      equipment: { name: 'Air Compressor', icon: 'air' },
      responsible: { name: 'A. User', avatar: 'https://i.pravatar.cc/150?u=auser' },
      time: '5h 20m',
      timeColor: 'text-muted'
    }
  ];

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'CRITICAL': return 'bg-danger-subtle text-danger border-danger-subtle';
      case 'WARNING': return 'bg-warning-subtle text-warning border-warning-subtle';
      case 'ROUTINE': return 'bg-light text-secondary border-light-subtle';
      default: return 'bg-light';
    }
  }

  // Helper for trend badge background
  getTrendClass(colorClass: string): string {
    if (colorClass.includes('danger')) return 'bg-danger-subtle text-danger';
    if (colorClass.includes('warning')) return 'bg-warning-subtle text-warning';
    return 'bg-success-subtle text-success';
  }

}
