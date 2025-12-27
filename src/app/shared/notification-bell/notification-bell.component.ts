import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  unread: boolean;
  icon: string;
  action?: {
    label: string;
    type: 'primary' | 'secondary';
  };
  linkId?: string; // For things like "View Logs" link behavior
}

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-bell.component.html',
  styleUrl: './notification-bell.component.scss'
})
export class NotificationBellComponent {
  isOpen = false;

  notifications: Notification[] = [
    {
      id: '1',
      title: 'Hydraulic Pump Failure',
      description: 'Critical pressure drop detected in Sector 4. Automated shutdown sequence initiated.',
      time: '2m ago',
      type: 'critical',
      unread: true,
      icon: 'warning',
      action: { label: 'Ack Alert', type: 'primary' },
      linkId: 'view-logs'
    },
    {
      id: '2',
      title: 'Low Inventory Alert',
      description: 'Spare Part #4421 is below threshold. Only 5 units remaining in stock.',
      time: '1h ago',
      type: 'warning',
      unread: true,
      icon: 'inventory_2'
    },
    {
      id: '3',
      title: 'Scheduled Maintenance',
      description: 'Conveyor Belt A routine check upcoming at 14:00. Technician assigned: J. Doe.',
      time: '3h ago',
      type: 'info',
      unread: true,
      icon: 'engineering'
    },
    {
      id: '4',
      title: 'Firmware Updated',
      description: 'Gateway Node 03 successfully updated to v2.4.1.',
      time: 'Yesterday',
      type: 'success',
      unread: false,
      icon: 'check_circle'
    }
  ];

  constructor(private elementRef: ElementRef) { }

  toggleNotifications() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  get unreadCount(): number {
    return this.notifications.filter(n => n.unread).length;
  }
}
