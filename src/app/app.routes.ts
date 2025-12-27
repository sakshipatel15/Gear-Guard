import { Routes } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CommandDashboardComponent } from './dashboard/command-dashboard/command-dashboard.component';
import { StatCardComponent } from './shared/stat-card/stat-card.component';
import { EquipmentDetailComponent } from './equipment/equipment-detail/equipment-detail.component';

export const routes: Routes = [
    {
        path: 'commondashboard',
        component: CommandDashboardComponent
    },
    {
        path: 'statcard',
        component: StatCardComponent
    },
    {
        path: 'detail',
        component: EquipmentDetailComponent
    },
    {
        path: 'navbar', // Keeping for specific testing if needed, but usually redundant now
        component: NavbarComponent
    }
];
