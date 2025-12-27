import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile.component';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent, CommonModule, UserProfileComponent],
  template: `
    <div class="app-layout">
      <app-sidebar class="app-sidebar" [isOpen]="isSidebarOpen" (close)="toggleSidebar()"></app-sidebar>
      <main class="main-content" [class.sidebar-open]="isSidebarOpen">
        <app-navbar [isSidebarOpen]="isSidebarOpen" (menuToggle)="toggleSidebar()"></app-navbar>
        <div class="content-scrollable">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- User Profile Popup -->
      <app-user-profile *ngIf="authService.showProfilePopup()"></app-user-profile>

      <!-- Logout Confirmation Modal -->
      <div class="modal-backdrop" *ngIf="authService.showLogoutConfirmation()" (click)="authService.cancelLogout()">
        <div class="logout-modal" (click)="$event.stopPropagation()">
            <div class="modal-header">
                <div class="warning-icon">
                    <span class="material-icons">priority_high</span>
                </div>
            </div>
            <div class="modal-body">
                <h3>Log Out</h3>
                <p>Are you sure you want to log out? You will need to sign in again to access the command center.</p>
            </div>
            <div class="modal-actions">
                <button class="btn-cancel" (click)="authService.cancelLogout()">Cancel</button>
                <button class="btn-confirm" (click)="authService.confirmLogout()">Log Out</button>
            </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      background-color: #f9fafb;
    }

    .app-sidebar {
      flex-shrink: 0;
      /* Sidebar component handles its own width/visibility usually, 
         but we ensure it's part of the flex flow or fixed if needed. 
         Existing implementation seemed to rely on it being in flow or absolute. */
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      transition: margin-left 0.3s;
      position: relative;
    }

    .content-scrollable {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 1.5rem;
    }

    /* Modal Styles */
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.2s ease-out;
    }

    .logout-modal {
        background: white;
        width: 100%;
        max-width: 360px;
        padding: 24px;
        border-radius: 16px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        text-align: center;
        animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-header {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;

        .warning-icon {
            width: 56px;
            height: 56px;
            background: #fef2f2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ef4444;

            .material-icons {
                font-size: 28px;
            }
        }
    }

    .modal-body {
        margin-bottom: 24px;

        h3 {
            margin: 0 0 8px;
            color: #111827;
            font-size: 1.125rem;
            font-weight: 600;
        }

        p {
            margin: 0;
            color: #6b7280;
            font-size: 0.875rem;
            line-height: 1.5;
        }
    }

    .modal-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;

        button {
            padding: 10px 16px;
            border-radius: 8px;
            font-weight: 500;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
        }

        .btn-cancel {
            background: white;
            border: 1px solid #e5e7eb;
            color: #374151;

            &:hover {
                background: #f9fafb;
                border-color: #d1d5db;
            }
        }

        .btn-confirm {
            background: #ef4444;
            color: white;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

            &:hover {
                background: #dc2626;
            }
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes scaleUp {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
  `]
})
export class AppLayoutComponent {
  isSidebarOpen = false; // Default closed or open depending on desktop? 
  // User Rule: "Sidebar Always fixed on the left ... Same width on all pages"
  // If desktop, sidebar is likely always open. The 'isSidebarOpen' prop might be for mobile toggle.
  // I'll keep the logic generic.

  constructor(public authService: AuthService) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
