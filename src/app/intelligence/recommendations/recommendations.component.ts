import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface KPI {
  label: string;
  value: string | number;
  subtext: string;
  type: 'critical' | 'warning' | 'success';
  icon?: string;
}

interface ActionItem {
  id: string;
  title: string;
  badge: { text: string; type: 'critical' | 'warning' | 'success' };
  description: string;
  detectedTime: string;
  team: string;
  type: 'critical' | 'warning' | 'success'; // For left border color and icon
  icon: string;
  primaryAction: string;
  secondaryAction?: string;
}

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss'
})
export class RecommendationsComponent {

  kpis: KPI[] = [
    {
      label: 'CRITICAL ACTIONS',
      value: 3,
      subtext: 'Requires immediate attention',
      type: 'critical',
      icon: 'warning' // Using generic name, will map to material icon 'warning' or 'error'
    },
    {
      label: 'WARNINGS',
      value: 5,
      subtext: 'Monitor closely for changes',
      type: 'warning',
      icon: 'error'
    },
    {
      label: 'EFFICIENCY POTENTIAL',
      value: '+12%',
      subtext: 'Projected optimization gain',
      type: 'success',
      icon: 'trending_up'
    }
  ];

  actions: ActionItem[] = [
    {
      id: 'P-101',
      title: 'Centrifugal Pump P-101',
      badge: { text: 'CRITICAL SEVERITY', type: 'critical' },
      description: 'High vibration detected (Level 4) on main bearing assembly. Risk of imminent failure.',
      detectedTime: 'Detected 24m ago',
      team: 'Team A',
      type: 'critical',
      icon: 'error',
      primaryAction: 'Create Work Order',
      secondaryAction: 'Details'
    },
    {
      id: 'M-3',
      title: 'Conveyor Motor M-3',
      badge: { text: 'WARNING', type: 'warning' },
      description: 'Operating temperature consistent above normal threshold (+5°C). Check lubrication levels.',
      detectedTime: 'Detected 2h ago',
      team: '', // No team listed in image for this one? actually image shows no team icon/text. Warning usually auto?
      // Wait, image: "Detected 2h ago". No Team.
      type: 'warning',
      icon: 'thermostat',
      primaryAction: 'Schedule Inspection'
    },
    {
      id: 'Unit-4',
      title: 'Hydraulic Press Unit 4',
      badge: { text: 'CRITICAL SEVERITY', type: 'critical' },
      description: 'Fluid pressure dropping intermittently below safety margins. Possible leak in main line.',
      detectedTime: 'Detected 3h ago',
      team: 'Team B',
      type: 'critical',
      icon: 'compress', // closest match for pressure
      primaryAction: 'Emergency Stop & Review'
    },
    {
      id: 'Bldg-B',
      title: 'HVAC System Building B',
      badge: { text: 'OPTIMIZATION', type: 'success' },
      description: 'Energy usage pattern suggests 15% saving potential by adjusting idle cycles during night shifts.',
      detectedTime: 'Detected 5h ago',
      team: '',
      type: 'success',
      icon: 'bolt',
      primaryAction: 'Apply Settings'
    }
  ];

  constructor() { }
}
