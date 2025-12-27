import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AccessDeniedComponent } from './shared/components/access-denied/access-denied.component';
import { CommandDashboardComponent } from './dashboard/command-dashboard/command-dashboard.component';
import { authGuard } from './core/guards/auth.guard';

import { ActivityFeedComponent } from './dashboard/activity-feed/activity-feed.component';
import { NextActionPanelComponent } from './dashboard/next-action-panel/next-action-panel.component';
import { EquipmentTimelineComponent } from './dashboard/equipment-timeline/equipment-timeline.component';
import { MaintenanceFormComponent } from './maintenance/maintenance-form/maintenance-form.component';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';

export const routes: Routes = [
    // Auth Routes
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
            { path: 'access-denied', component: AccessDeniedComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },

    // App Routes (Guarded)
    {
        path: '',
        component: AppLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'home', component: CommandDashboardComponent },
            { path: 'dashboard', redirectTo: 'home', pathMatch: 'full' },
            { path: 'activity-feed', component: ActivityFeedComponent },
            { path: 'next-action-panel', component: NextActionPanelComponent },
            { path: 'equipment-timeline', component: EquipmentTimelineComponent },
            { path: 'maintenance-form', component: MaintenanceFormComponent },
            {
                path: 'equipment-list',
                loadComponent: () => import('./equipment/equipment-list/equipment-list.component').then(m => m.EquipmentListComponent)
            },
            {
                path: 'health-indicator',
                loadComponent: () => import('./shared/health-indicator/health-indicator.component').then(m => m.HealthIndicatorComponent)
            },
            {
                path: 'notification-bell',
                loadComponent: () => import('./shared/notification-bell/notification-bell.component').then(m => m.NotificationBellComponent)
            },
            {
                path: 'recommendations',
                loadComponent: () => import('./intelligence/recommendations/recommendations.component').then(m => m.RecommendationsComponent)
            },
            {
                path: 'insights-dashboard',
                loadComponent: () => import('./intelligence/insights-dashboard/insights-dashboard.component').then(m => m.InsightsDashboardComponent)
            },
            {
                path: 'workcenter-management',
                loadComponent: () => import('./workcenters/workcenter-management/workcenter-management.component').then(m => m.WorkcenterManagementComponent)
            },
            {
                path: 'category-management',
                loadComponent: () => import('./categories/category-management/category-management.component').then(m => m.CategoryManagementComponent)
            },
            {
                path: 'team-management',
                loadComponent: () => import('./teams/team-management/team-management.component').then(m => m.TeamManagementComponent)
            },
            {
                path: 'technician-performance',
                loadComponent: () => import('./technicians/technician-performance/technician-performance.component').then(m => m.TechnicianPerformanceComponent)
            },
            {
                path: 'technician-list',
                loadComponent: () => import('./technicians/technician-list/technician-list.component').then(m => m.TechnicianListComponent)
            },
            {
                path: 'maintenance-calendar',
                loadComponent: () => import('./maintenance/maintenance-calendar/maintenance-calendar.component').then(m => m.MaintenanceCalendarComponent)
            }
        ]
    },

    // Fallback
    { path: '**', redirectTo: 'login' }
];
