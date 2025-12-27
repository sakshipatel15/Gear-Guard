import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'Normal' | 'Warning' | 'Critical' | 'Routine';
  typeLabel?: string; // e.g. "NORMAL", "WARNING" - sometimes redundant if same as type
  location?: string; // e.g. "All Teams", "Area B"
  meta?: string; // e.g. "#WO-402", "Sector 4"
  day: number; // 16-22 (Mon-Sun)
  startHour: number; // 8, 9, 10
  duration: number; // in hours, for height
  colorClass: string; // for styling
}

interface KPI {
  label: string;
  value: number;
  icon: string;
  colorClass: string; // for border/icon color
}

interface TechStatus {
  name: string;
  status: 'Available' | 'Busy (Critical)' | 'On Break';
  avatar: string;
  statusColor: string;
}

interface PendingItem {
  id: string;
  title: string;
  requester: string;
  typeIcon: string; // 'precision_manufacturing' etc
}

@Component({
  selector: 'app-maintenance-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maintenance-calendar.component.html',
  styleUrl: './maintenance-calendar.component.scss'
})
export class MaintenanceCalendarComponent {

  weekDays = [
    { name: 'MON', date: 16 },
    { name: 'TUE', date: 17 },
    { name: 'WED', date: 18, active: true },
    { name: 'THU', date: 19 },
    { name: 'FRI', date: 20 },
    { name: 'SAT', date: 21 },
    { name: 'SUN', date: 22 }
  ];

  timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM'
  ];

  kpis: KPI[] = [
    { label: 'Total Scheduled', value: 24, icon: 'calendar_today', colorClass: 'neutral' },
    { label: 'Normal Maintenance', value: 15, icon: 'check_circle', colorClass: 'success' },
    { label: 'Warnings', value: 7, icon: 'warning', colorClass: 'warning' },
    { label: 'Critical Events', value: 2, icon: 'error', colorClass: 'critical' }
  ];

  events: CalendarEvent[] = [
    // Mon 16
    {
      id: 'e1', title: 'Shift Handover', type: 'Normal', typeLabel: 'NORMAL',
      location: 'All Teams', day: 16, startHour: 8, duration: 1, colorClass: 'normal'
    },
    {
      id: 'e2', title: 'Filter Replacement', type: 'Routine', typeLabel: 'ROUTINE',
      meta: '#WO-112 • HVAC Unit 3', day: 16, startHour: 11, duration: 1.5, colorClass: 'routine'
    },
    // Tue 17
    {
      id: 'e3', title: 'Hydraulic Pressure Check', type: 'Warning', typeLabel: 'WARNING',
      meta: '#WO-402 • Area B', day: 17, startHour: 8, duration: 2, colorClass: 'warning'
    },
    // Wed 18
    {
      id: 'e4', title: 'Emergency Valve Repair', type: 'Critical', typeLabel: 'CRITICAL',
      meta: '#WO-991 • Sector 4', day: 18, startHour: 9, duration: 2, colorClass: 'critical'
    },
    {
      id: 'e5', title: 'Software Update', type: 'Routine', typeLabel: 'ROUTINE',
      meta: '#WO-221 • Systems', day: 18, startHour: 14, duration: 2, colorClass: 'routine'
    },
    // Thu 19
    {
      id: 'e6', title: 'Conveyor Belt Inspection', type: 'Routine', typeLabel: 'ROUTINE',
      meta: '#WO-205 • Line A', day: 19, startHour: 10, duration: 1.5, colorClass: 'routine'
    },
    // Fri 20
    {
      id: 'e7', title: 'Sensor Calibration', type: 'Warning', typeLabel: 'WARNING',
      meta: '#WO-554 • Sensors', day: 20, startHour: 13, duration: 1.5, colorClass: 'warning'
    }
  ];

  pendingItems: PendingItem[] = [
    { id: 'p1', title: 'Robotic Arm #4', requester: 'Requested by J. Doe', typeIcon: 'precision_manufacturing' },
    { id: 'p2', title: 'Forklift FL-02', requester: 'Battery check pending', typeIcon: 'forklift' } // Using text fallback or custom icon if needed, 'forklift' might not be valid material icon, using 'local_shipping' for fallback in HTML
  ];

  technicians: TechStatus[] = [
    { name: 'Mike Ross', status: 'Available', avatar: 'assets/avatars/mike.jpg', statusColor: '#4ade80' },
    { name: 'Sarah Connor', status: 'Busy (Critical)', avatar: 'assets/avatars/sarah.jpg', statusColor: '#dc2626' },
    { name: 'Davos Seaworth', status: 'On Break', avatar: 'assets/avatars/davos.jpg', statusColor: '#facc15' }
  ];

  constructor() { }
}
