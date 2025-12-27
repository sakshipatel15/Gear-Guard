import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface KPI {
  label: string;
  value: string;
  icon: string; // Material icon name
  iconBg: string; // hex color
  iconColor: string; // hex color
}

interface Team {
  id: string;
  name: string;
  unit: string; // Subtitle e.g. "Heavy Machinery Unit"
  letter: string; // A, B, R etc.
  letterBg: string; // hex
  letterColor: string; // hex
  members: {
    avatars: string[];
    count: number; // e.g. 4 for (+4)
  };
  company: {
    name: string;
    department: string;
  };
}

@Component({
  selector: 'app-team-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-management.component.html',
  styleUrl: './team-management.component.scss'
})
export class TeamManagementComponent {

  kpis: KPI[] = [
    {
      label: 'TOTAL TEAMS',
      value: '12',
      icon: 'groups',
      iconBg: '#fff7ed', // Light Orange
      iconColor: '#ea580c' // Orange
    },
    {
      label: 'ACTIVE PERSONNEL',
      value: '84',
      icon: 'engineering',
      iconBg: '#fff7ed',
      iconColor: '#ea580c'
    },
    {
      label: 'ON SHIFT',
      value: '56',
      icon: 'schedule',
      iconBg: '#fff7ed',
      iconColor: '#ea580c'
    }
  ];

  teams: Team[] = [
    {
      id: 't1',
      name: 'Alpha Maintenance',
      unit: 'Heavy Machinery Unit',
      letter: 'A',
      letterBg: '#ffedd5', // Orange-100
      letterColor: '#c2410c', // Orange-700
      members: {
        avatars: [
          'assets/avatars/1.jpg',
          'assets/avatars/2.jpg',
          'assets/avatars/3.jpg'
        ],
        count: 4
      },
      company: {
        name: 'NorthStar Industries',
        department: 'Sector 4'
      }
    },
    {
      id: 't2',
      name: 'Bravo Electrical',
      unit: 'Grid Systems',
      letter: 'B',
      letterBg: '#f3f4f6', // Gray-100
      letterColor: '#374151', // Gray-700
      members: {
        avatars: [
          'assets/avatars/4.jpg',
          'assets/avatars/5.jpg'
        ],
        count: 0
      },
      company: {
        name: 'Global Energy Corp',
        department: 'HQ - Main'
      }
    },
    {
      id: 't3',
      name: 'Rapid Response',
      unit: 'Emergency Unit',
      letter: 'R',
      letterBg: '#ffedd5',
      letterColor: '#c2410c',
      members: {
        avatars: [
          'assets/avatars/6.jpg',
          'assets/avatars/7.jpg',
          'assets/avatars/8.jpg'
        ],
        count: 0
      },
      company: {
        name: 'Safety First Ltd',
        department: 'External Contractor'
      }
    },
    {
      id: 't4',
      name: 'Logistics Support',
      unit: 'Supply Chain',
      letter: 'L',
      letterBg: '#f3f4f6',
      letterColor: '#374151',
      members: {
        avatars: [
          'assets/avatars/9.jpg',
          'assets/avatars/10.jpg'
        ],
        count: 0
      },
      company: {
        name: 'NorthStar Industries',
        department: 'Warehouse B'
      }
    },
    {
      id: 't5',
      name: 'Facility Ops',
      unit: 'Building Management',
      letter: 'F',
      letterBg: '#f3f4f6',
      letterColor: '#374151',
      members: {
        avatars: [
          'assets/avatars/11.jpg'
        ],
        count: 8
      },
      company: {
        name: 'Global Energy Corp',
        department: 'Campus Wide'
      }
    }
  ];

  constructor() { }
}
