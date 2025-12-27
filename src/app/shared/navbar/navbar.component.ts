import { Component, EventEmitter, Output, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../../core/services/auth.service';
import { NotificationBellComponent } from '../notification-bell/notification-bell.component';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, NotificationBellComponent],
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
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.initiateLogout();
  }

  // --- Search Logic ---
  isSearchOpen = false;
  searchQuery = '';
  searchResults: any[] = [];

  // Define available pages for mock search
  availablePages = [
    { name: 'Dashboard', route: '/home' },
    { name: 'Equipment List', route: '/equipment-list' },
    { name: 'Maintenance Schedule', route: '/maintenance-calendar' },
    { name: 'Technician Command', route: '/technician-list' },
    { name: 'Team Management', route: '/team-management' },
    { name: 'Reports & Insights', route: '/insights-dashboard' },
    { name: 'Recommendations', route: '/recommendations' },
    { name: 'Activity Feed', route: '/activity-feed' }
  ];

  constructor(private router: Router, public authService: AuthService) { }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      setTimeout(() => {
        const input = document.getElementById('global-search-input');
        if (input) input.focus();
      }, 100);
    } else {
      this.searchQuery = '';
      this.searchResults = [];
    }
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchQuery = query;

    if (query.length > 1) {
      this.searchResults = this.availablePages.filter(page =>
        page.name.toLowerCase().includes(query)
      );
    } else {
      this.searchResults = [];
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.isSearchOpen = false;
    this.searchQuery = '';
  }
}
