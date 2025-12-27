import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Badge {
  label: string;
  value: number;
  status: 'Optimal' | 'Warning' | 'Critical';
  subtext: string;
  icon: string;
}

interface Equipment {
  id: string;
  name: string;
  location: string;
  status: 'Online' | 'Warning';
  healthScore: number;
  image: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

interface LogEntry {
  id: string;
  name: string;
  location: string;
  lastSync: string;
  health: number;
  status: 'Optimal' | 'Critical' | 'Check';
  icon: string;
}

@Component({
  selector: 'app-health-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health-indicator.component.html',
  styleUrl: './health-indicator.component.scss'
})
export class HealthIndicatorComponent {
  badges: Badge[] = [
    { label: 'OPTIMAL STATE', value: 98, status: 'Optimal', subtext: 'Optimal', icon: 'check_circle' },
    { label: 'WARNING STATE', value: 74, status: 'Warning', subtext: 'Maintenance Due', icon: 'warning' },
    { label: 'CRITICAL STATE', value: 45, status: 'Critical', subtext: 'Critical Failure', icon: 'error' }
  ];

  equipmentList: Equipment[] = [
    {
      id: 'A-42',
      name: 'Robotic Arm Unit A-42',
      location: 'Assembly Line 04 • Sector 7G',
      status: 'Online',
      healthScore: 98,
      image: 'https://placehold.co/400x300/e2e8f0/475569?text=Robotic+Arm',
      metrics: [
        { label: 'Temperature', value: '42°C' },
        { label: 'Vibration', value: '0.2 mm/s' }
      ]
    },
    {
      id: 'CP-02',
      name: 'Coolant Pump System',
      location: 'HVAC Unit 02 • Basement',
      status: 'Warning',
      healthScore: 74,
      image: 'https://placehold.co/400x300/e2e8f0/475569?text=Coolant+Pump',
      metrics: [
        { label: 'Pressure', value: '120 PSI' },
        { label: 'Flow Rate', value: 'Warning' }
      ]
    }
  ];

  logs: LogEntry[] = [
    { id: '#TRB-992', name: 'Turbine X-100', location: 'Sector 3 - North', lastSync: '2 mins ago', health: 99, status: 'Optimal', icon: 'wind_power' },
    { id: '#CNV-401', name: 'Main Conveyor', location: 'Loading Bay', lastSync: '1 hour ago', health: 45, status: 'Critical', icon: 'conveyor_belt' },
    { id: '#HYD-221', name: 'Hydraulic Lift B', location: 'Warehouse 2', lastSync: 'Just now', health: 72, status: 'Check', icon: 'forklift' }
  ];

  getBadgeClass(status: string): string {
    switch (status) {
      case 'Optimal': return 'badge-optimal';
      case 'Warning': return 'badge-warning';
      case 'Critical': return 'badge-critical';
      case 'Check': return 'badge-check';
      default: return '';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Optimal': return '#10b981';
      case 'Online': return '#10b981';
      case 'Warning': return '#f59e0b';
      case 'Critical': return '#ef4444';
      case 'Check': return '#eab308';
      default: return '#6b7280';
    }
  }
}
