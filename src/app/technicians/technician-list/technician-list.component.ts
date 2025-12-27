import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Technician {
  id: string;
  name: string;
  role: string; // e.g. HYDRAULICS A
  roleIcon: string;
  avatar: string;
  status: 'On Job' | 'Resting' | 'Available' | 'Offline' | 'Critical Task';
  statusColor: string; // hex
  efficiency: number;
  efficiencyTrend?: 'up' | 'flat' | 'down';
  accentColor: string; // Left border color
}

@Component({
  selector: 'app-technician-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './technician-list.component.html',
  styleUrl: './technician-list.component.scss'
})
export class TechnicianListComponent {

  searchQuery: string = '';

  technicians: Technician[] = [
    {
      id: 't1',
      name: 'Marcus Vhane',
      role: 'HYDRAULICS A',
      roleIcon: 'water_drop',
      avatar: 'assets/avatars/1.jpg',
      status: 'On Job',
      statusColor: '#dcfce7', // Green bg
      efficiency: 98,
      efficiencyTrend: 'up',
      accentColor: '#ea580c' // Orange
    },
    {
      id: 't2',
      name: 'Elena Rostova',
      role: 'ELECTRICAL B',
      roleIcon: 'bolt',
      avatar: 'assets/avatars/2.jpg',
      status: 'Resting',
      statusColor: '#fef9c3', // Yellow bg
      efficiency: 94,
      accentColor: '#eab308' // Yellow accent
    },
    {
      id: 't3',
      name: 'David Chen',
      role: 'MECH CORE',
      roleIcon: 'build',
      avatar: 'assets/avatars/3.jpg',
      status: 'Available',
      statusColor: '#dcfce7',
      efficiency: 89,
      accentColor: '#0ea5e9' // Blue accent. Actually image looks Greenish/Teal?
      // Image: "Available" is Green text on light green. 
      // User dot is Green.
    },
    {
      id: 't4',
      name: "Sarah O'Neil",
      role: 'HYDRAULICS B',
      roleIcon: 'water_drop',
      avatar: 'assets/avatars/4.jpg',
      status: 'Offline',
      statusColor: '#f3f4f6', // Gray
      efficiency: 92,
      accentColor: '#9ca3af' // Gray
    },
    {
      id: 't5',
      name: 'James Kirk',
      role: 'LOGISTICS',
      roleIcon: 'inventory_2',
      avatar: 'assets/avatars/5.jpg',
      status: 'Critical Task',
      statusColor: '#fee2e2', // Red bg
      efficiency: 96,
      accentColor: '#ea580c' // Orange left border
    },
    {
      id: 't6',
      name: 'Nyota Uhura',
      role: 'COMMS',
      roleIcon: 'settings_input_antenna',
      avatar: 'assets/avatars/6.jpg',
      status: 'Available',
      statusColor: '#dcfce7',
      efficiency: 99,
      accentColor: '#ea580c' // Orange
    },
    {
      id: 't7',
      name: 'Hikaru Sulu',
      role: 'PILOT MECH',
      roleIcon: 'flight',
      avatar: 'assets/avatars/7.jpg',
      status: 'Available',
      statusColor: '#dcfce7',
      efficiency: 95,
      accentColor: '#ea580c'
    }
  ];

  constructor() { }

  getStatusTextColor(bgHex: string): string {
    switch (bgHex) {
      case '#dcfce7': return '#15803d'; // Green text
      case '#fef9c3': return '#a16207'; // Yellow text (darker)
      case '#fee2e2': return '#b91c1c'; // Red text
      case '#f3f4f6': return '#4b5563'; // Gray text
      default: return '#374151';
    }
  }

  getDotColor(bgHex: string): string {
    switch (bgHex) {
      case '#dcfce7': return '#15803d';
      case '#fef9c3': return '#ca8a04';
      case '#fee2e2': return '#dc2626';
      default: return '#9ca3af';
    }
  }
}
