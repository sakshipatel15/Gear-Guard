import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Current User State (Mocked default for now, or null if strict auth)
  // For demo purposes, initializing with a default user so the UI is populated immediately.
  currentUser = signal<User | null>(this.getUserFromStorage());

  // Logout Confirmation State
  showLogoutConfirmation = signal<boolean>(false);

  // Profile Popup State
  showProfilePopup = signal<boolean>(false);

  constructor(private router: Router) { }

  private getUserFromStorage(): User | null {
    const userData = localStorage.getItem('gearGuardUserData');
    return userData ? JSON.parse(userData) : null;
  }

  // Called by Login Component after successful Supabase auth
  setSession(user: User) {
    localStorage.setItem('gearGuardUserData', JSON.stringify(user));
    this.currentUser.set(user);
    this.router.navigate(['/home']);
  }

  openProfile() {
    this.showProfilePopup.set(true);
  }

  closeProfile() {
    this.showProfilePopup.set(false);
  }

  initiateLogout() {
    this.showLogoutConfirmation.set(true);
  }

  cancelLogout() {
    this.showLogoutConfirmation.set(false);
  }

  confirmLogout() {
    this.showLogoutConfirmation.set(false);
    localStorage.removeItem('gearGuardUserData');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }
}
