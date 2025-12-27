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
    }
];
