import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  @HostBinding('class.open') get isOpenClass() {
    return this.isOpen;
  }

  closeSidebar() {
    this.close.emit();
  }

  activeItem: string = 'Dashboard';

  operationItems = [
    { name: 'Dashboard', icon: 'dashboard' },
    { name: 'Equipment', icon: 'build' },
    { name: 'Maintenance', icon: 'handyman' },
    { name: 'Intelligence', icon: 'psychology' },
    { name: 'Calendar', icon: 'calendar_today' },
  ];

  managementItems = [
    { name: 'Teams', icon: 'groups' },
    { name: 'Settings', icon: 'settings' },
  ];

  setActive(item: string): void {
    this.activeItem = item;
  }
}
