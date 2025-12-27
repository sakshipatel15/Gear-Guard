import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router, public authService: AuthService) { }

  @HostBinding('class.open') get isOpenClass() {
    return this.isOpen;
  }

  closeSidebar() {
    this.close.emit();
  }

  activeItem: string = 'Dashboard';

  operationItems = [
    { name: 'Dashboard', icon: 'dashboard', route: '/home' },
    { name: 'Equipment', icon: 'build', route: '/equipment-list' },
    { name: 'Maintenance', icon: 'handyman', route: '/workcenter-management' },
    { name: 'Intelligence', icon: 'psychology', route: '/insights-dashboard' },
    { name: 'Calendar', icon: 'calendar_today', route: '/maintenance-calendar' },
  ];

  managementItems = [
    { name: 'Teams', icon: 'groups', route: '/team-management' },
    { name: 'Settings', icon: 'settings', route: '/category-management' },
  ];

  logout() {
    this.authService.initiateLogout();
  }
}
