import { Routes } from '@angular/router';
import { ActivityFeedComponent } from './dashboard/activity-feed/activity-feed.component';
import { NextActionPanelComponent } from './dashboard/next-action-panel/next-action-panel.component';
import { EquipmentTimelineComponent } from './dashboard/equipment-timeline/equipment-timeline.component';
import { MaintenanceFormComponent } from './maintenance/maintenance-form/maintenance-form.component';

export const routes: Routes = [
    {
        path: 'activity-feed',
        component: ActivityFeedComponent
    },
    {
        path: 'next-action-panel',
        component: NextActionPanelComponent
    },
    {
        path: 'equipment-timeline',
        component: EquipmentTimelineComponent
    },
    {
        path: 'maintenance-form',
        component: MaintenanceFormComponent
    },
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
    },
];
