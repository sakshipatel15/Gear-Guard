import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface KPI {
  label: string;
  value: string | number;
  subtext: string; // e.g., "Critical" or "Medium"
  trend: string; // e.g. "+2 from yesterday"
  trendType: 'up' | 'down' | 'neutral'; // determines color of trend
  type: 'critical' | 'warning' | 'info'; // determines visuals
  icon?: string;
}

interface MonitorItem {
  id: string;
  title: string;
  badge: { text: string; type: 'critical' | 'risk' | 'optimization' | 'patch' };
  headline: string;
  description: string;
  icon: string;
  visualType: 'bar-chart' | 'progress-bar' | 'text-highlight' | 'none';
  visualData?: any; // e.g. { value: 80, label: '80% Wear' } or array for bars
  primaryAction: string;
  secondaryAction: string;
}

@Component({
  selector: 'app-insights-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insights-dashboard.component.html',
  styleUrl: './insights-dashboard.component.scss'
})
export class InsightsDashboardComponent {

  kpis: KPI[] = [
    {
      label: 'ACTIVE WARNINGS',
      value: 3,
      subtext: 'Critical',
      trend: '+2 from yesterday',
      trendType: 'up', // in this context, up is bad often, but visually we want red
      type: 'critical',
      icon: 'warning'
    },
    {
      label: 'PREDICTED RISKS',
      value: 5,
      subtext: 'Medium',
      trend: '- Stable',
      trendType: 'neutral',
      type: 'warning', // Risk/Medium
      icon: 'report_problem'
    },
    {
      label: 'PENDING ACTIONS',
      value: 12,
      subtext: 'Total',
      trend: '-10% vs last week',
      trendType: 'down', // Improvement
      type: 'info',
      icon: 'assignment'
    }
  ];

  monitors: MonitorItem[] = [
    {
      id: 'pump-b',
      title: 'Hydraulic Pump B',
      badge: { text: 'CRITICAL', type: 'critical' },
      headline: 'Overheating Detected',
      description: 'Temperature exceeded 85°C threshold for 15 minutes. Continued operation risks seal failure.',
      icon: 'thermostat',
      visualType: 'bar-chart',
      visualData: [2, 3, 3, 4, 5, 4, 6, 7, 7, 8], // Mock levels
      primaryAction: 'Initiate Cooling',
      secondaryAction: 'Details'
    },
    {
      id: 'conveyor-3',
      title: 'Conveyor Belt 3',
      badge: { text: 'RISK', type: 'risk' }, // Risk = Warning visual
      headline: 'Wear Detected',
      description: 'Vibration analysis suggests 80% wear. Failure probability increases by 5% daily.',
      icon: 'conveyor_belt',
      visualType: 'progress-bar',
      visualData: { value: 80, label: '80% Wear' },
      primaryAction: 'Schedule Inspection',
      secondaryAction: 'Ignore'
    },
    {
      id: 'turbine',
      title: 'Turbine System',
      badge: { text: 'OPTIMIZATION', type: 'optimization' },
      headline: 'Efficiency Opportunity',
      description: 'Shift load to Turbine 2 to save approx 12% energy based on current ambient temperature.',
      icon: 'wind_power',
      visualType: 'text-highlight',
      visualData: { text: 'Est. Savings: $450/day', icon: 'savings' },
      primaryAction: 'Apply Config',
      secondaryAction: 'Dismiss'
    },
    {
      id: 'breaker-box',
      title: 'Main Breaker Box',
      badge: { text: 'CRITICAL', type: 'critical' },
      headline: 'Voltage Irregularity',
      description: 'Spikes detected in Sector 4 feed. Potential short circuit risk if not addressed immediately.',
      icon: 'electric_bolt',
      visualType: 'none',
      primaryAction: 'Isolate Circuit', // Guessed based on cut off image, looks specific
      secondaryAction: 'Details'
    },
    {
      id: 'lubricant',
      title: 'Lubricant Storage',
      badge: { text: 'RISK', type: 'risk' },
      headline: 'Low Inventory',
      description: 'Grade A Oil levels below 15%. Resupply needed within 48 hours to maintain operations.',
      icon: 'oil_barrel',
      visualType: 'none',
      primaryAction: 'Order Refill', // Guessed
      secondaryAction: 'Ignore'
    },
    {
      id: 'firmware',
      title: 'Firmware Update',
      badge: { text: 'PATCH', type: 'patch' },
      headline: 'Security Patch Available',
      description: 'Update v2.4.1 available for Controller Units. Includes critical security fixes.',
      icon: 'update',
      visualType: 'none',
      primaryAction: 'Install Now', // Guessed
      secondaryAction: 'Later'
    }
  ];

  constructor() { }
}
