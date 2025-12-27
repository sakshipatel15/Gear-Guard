import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceService } from '../../core/services/maintenance.service';
import { UserService } from '../../core/services/user.service';

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
export class MaintenanceCalendarComponent implements OnInit {

  weekDays: { name: string; date: number; fullDate: Date; active: boolean }[] = [];

  generateWeek() {
    const today = new Date();
    // Start from start of week (Monday?) or 3 days back?
    // Let's do a sliding window: today - 2 days to today + 4 days, or standard week?
    // Standard Mon-Sun week containing today:
    const day = today.getDay(); // 0 (Sun) - 6 (Sat)
    const diff = today.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    const monday = new Date(today.setDate(diff));

    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      this.weekDays.push({
        name: this.getDayName(d.getDay()),
        date: d.getDate(),
        fullDate: d,
        active: d.getDate() === new Date().getDate() // Highlight today
      });
    }
  }

  getDayName(d: number): string {
    return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][d];
  }

  timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM'
  ];

  kpis: KPI[] = [
    { label: 'Total Scheduled', value: 0, icon: 'calendar_today', colorClass: 'neutral' },
    { label: 'Normal Maintenance', value: 0, icon: 'check_circle', colorClass: 'success' },
    { label: 'Warnings', value: 0, icon: 'warning', colorClass: 'warning' },
    { label: 'Critical Events', value: 0, icon: 'error', colorClass: 'critical' }
  ];

  events: CalendarEvent[] = [];
  pendingItems: PendingItem[] = [];
  technicians: TechStatus[] = [];
  isLoading = true;

  constructor(
    private maintenanceService: MaintenanceService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.generateWeek();
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    // Load Calendar Events
    this.maintenanceService.getCalendarEvents().subscribe({
      next: (data) => {
        this.events = data.map(evt => this.mapToCalendarEvent(evt));
        this.updateKPIs(this.events);
      },
      error: (err) => console.error('Failed to load events', err)
    });

    // Load Pending Requests
    this.maintenanceService.getPendingRequests().subscribe({
      next: (data) => {
        this.pendingItems = data.map(req => ({
          id: req.id,
          title: req.equipment?.name || 'Unknown Equipment',
          requester: `Requested by ${req.requested_by || 'System'}`,
          typeIcon: 'precision_manufacturing' // Default icon
        }));
      },
      error: (err) => console.error('Failed to load pending', err)
    });

    // Load Technicians for Sidebar
    this.userService.getTechnicians().subscribe({
      next: (data) => {
        this.technicians = data.map(tech => ({
          name: tech.full_name,
          status: this.mapTechStatus(tech.status), // assuming status exists on profile or we mock it
          avatar: tech.avatar_url,
          statusColor: this.getTechStatusColor(tech.status)
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load techs', err);
        this.isLoading = false;
      }
    });
  }

  private mapToCalendarEvent(dbEvent: any): CalendarEvent {
    const date = new Date(dbEvent.start_time);
    const day = date.getDate();
    const startHour = date.getHours(); // Assumes 24h, we map to 8-15

    // Calculate duration
    const end = new Date(dbEvent.end_time);
    const duration = (end.getTime() - date.getTime()) / (1000 * 60 * 60);

    const type = this.normalizeType(dbEvent.severity);

    return {
      id: dbEvent.id,
      title: dbEvent.title || 'Untitled Task',
      type: type,
      typeLabel: type.toUpperCase(),
      location: 'Facility', // Placeholder or fetch
      day: day, // This assumes the mock week 16-22 matches DB dates. 
      // In real app, we'd filter matching week. 
      // For demo, we might need to "fake" the day to fit the UI grid if DB dates vary.
      // Or we assume DB seeded with current week.
      startHour: startHour,
      duration: duration || 1,
      colorClass: type.toLowerCase()
    };
  }

  private normalizeType(severity: string): 'Normal' | 'Warning' | 'Critical' | 'Routine' {
    if (!severity) return 'Normal';
    const s = severity.toLowerCase();
    if (s === 'critical' || s === 'high') return 'Critical';
    if (s === 'warning' || s === 'medium') return 'Warning';
    if (s === 'routine' || s === 'low') return 'Routine';
    return 'Normal';
  }

  private mapTechStatus(status: string): 'Available' | 'Busy (Critical)' | 'On Break' {
    // Map whatever string DB has to UI union
    // If db has 'active', 'offline' etc.
    return 'Available'; // Default for safety
  }

  private getTechStatusColor(status: string): string {
    return '#4ade80'; // Green default
  }

  private updateKPIs(events: CalendarEvent[]) {
    this.kpis[0].value = events.length;
    this.kpis[1].value = events.filter(e => e.type === 'Normal' || e.type === 'Routine').length;
    this.kpis[2].value = events.filter(e => e.type === 'Warning').length;
    this.kpis[3].value = events.filter(e => e.type === 'Critical').length;
  }
}
