import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  activeLink: string = 'Overview'; // Default active link
  isDropdownOpen: boolean = false;

  @Input() isSidebarOpen: boolean = false;

  @HostBinding('class.sidebar-open') get sidebarOpenClass() {
    return this.isSidebarOpen;
  }

  setActive(link: string): void {
    this.activeLink = link;
  }

  @Output() menuToggle = new EventEmitter<void>();

  toggleSidebar(): void {
    this.menuToggle.emit();
  }

  toggleDropdown(): void {
    console.log('Toggling dropdown. Current state:', this.isDropdownOpen);
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('New state:', this.isDropdownOpen);
  }
}
