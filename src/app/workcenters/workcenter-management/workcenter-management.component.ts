import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WorkCenter {
  id: string;
  name: string;
  code: string;
  costPerHr: number;
  capacity: string; // e.g., "40 hrs/wk"
  capacityType: string; // e.g., "hrs/wk" or "On Demand"
  efficiency: number | null; // null for "Not tracked"
  efficiencyStatus: 'good' | 'average' | 'poor' | 'none'; // for color coding
  oeeTarget: number | null;
  statusBadge?: string; // e.g., "Below Target"
  icon: string;
  iconBg: string; // hex color for icon background
  iconColor: string; // hex color for icon type identification
}

@Component({
  selector: 'app-workcenter-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workcenter-management.component.html',
  styleUrl: './workcenter-management.component.scss'
})
export class WorkcenterManagementComponent {

  activeTab: string = 'All Centers';

  workCenters: WorkCenter[] = [
    {
      id: 'wc-001',
      name: 'CNC Milling Station A',
      code: 'WC-001',
      costPerHr: 120.00,
      capacity: '40',
      capacityType: 'hrs/wk',
      efficiency: 92,
      efficiencyStatus: 'good',
      oeeTarget: 85,
      icon: 'precision_manufacturing', // robotic arm or similar
      iconBg: '#fff7ed', // Orange-ish light
      iconColor: '#ea580c' // Orange
    },
    {
      id: 'wc-004',
      name: '3D Printing Array',
      code: 'WC-004',
      costPerHr: 45.00,
      capacity: '168',
      capacityType: 'hrs/wk',
      efficiency: 78,
      efficiencyStatus: 'average', // Slightly lower but still ok visually based on image (orange bar)
      oeeTarget: 80,
      icon: 'print',
      iconBg: '#fff7ed',
      iconColor: '#ea580c'
    },
    {
      id: 'wc-012',
      name: 'Assembly Line 1',
      code: 'WC-012',
      costPerHr: 210.00,
      capacity: '80',
      capacityType: 'hrs/wk',
      efficiency: 96,
      efficiencyStatus: 'good',
      oeeTarget: 90,
      icon: 'conveyor_belt', // generic factory icon
      iconBg: '#fff7ed',
      iconColor: '#ea580c'
    },
    {
      id: 'wc-015',
      name: 'Maintenance Bay 2',
      code: 'WC-015',
      costPerHr: 85.00,
      capacity: 'On',
      capacityType: 'Demand',
      efficiency: null,
      efficiencyStatus: 'none',
      oeeTarget: null,
      icon: 'build',
      iconBg: '#f3f4f6', // Gray light
      iconColor: '#6b7280' // Gray
    },
    {
      id: 'wc-008',
      name: 'Paint Booth Delta',
      code: 'WC-008',
      costPerHr: 150.00,
      capacity: '40',
      capacityType: 'hrs/wk',
      efficiency: 64,
      efficiencyStatus: 'poor', // Red bar
      oeeTarget: 88,
      statusBadge: 'Below Target',
      icon: 'format_paint', // drop or droplet
      iconBg: '#fff7ed',
      iconColor: '#ea580c'
    }
  ];

  constructor() { }
}
