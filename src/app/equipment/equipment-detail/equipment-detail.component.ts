import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipment-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipment-detail.component.html',
  styleUrl: './equipment-detail.component.scss'
})
export class EquipmentDetailComponent {
  equipment = {
    name: 'CNC Milling Machine X-500',
    id: 'SN-9982-AC',
    status: 'OPERATIONAL',
    location: 'Zone B, Sector 4',
    healthScore: 94,
    healthTrend: '+2%',
    specs: [
      { label: 'MANUFACTURER', value: 'Kyoto Industrial' },
      { label: 'MODEL', value: 'X-Series 500' },
      { label: 'SERIAL NUMBER', value: 'SN-9982-AC' },
      { label: 'YEAR', value: '2021' },
      { label: 'POWER RATING', value: '45 kW' },
      { label: 'VOLTAGE', value: '480V / 3-Phase' }
    ],
    certification: {
      name: 'ISO 9001 Compliant',
      date: 'Oct 12, 2023'
    },
    quickStats: [
      { label: 'Uptime (30d)', value: '99.2%', subValue: '+0.5% vs last month', icon: 'uptime' },
      { label: 'Next Service', value: 'Nov 15', subValue: '12 days remaining', icon: 'service' },
      { label: 'Open Issues', value: '0', subValue: 'System is healthy', icon: 'issues' }
    ],
    maintenanceHistory: [
      { date: 'Oct 20, 2023', type: 'Preventative', technician: 'J. Doe', avatar: 'https://i.pravatar.cc/150?u=jdoe', outcome: 'Complete', reference: '#WO-2049' },
      { date: 'Aug 15, 2023', type: 'Repair', technician: 'M. Smith', avatar: 'https://i.pravatar.cc/150?u=msmith', outcome: 'Complete', reference: '#WO-1892' },
      { date: 'Jun 02, 2023', type: 'Preventative', technician: 'A. Ray', avatar: 'https://i.pravatar.cc/150?u=aray', outcome: 'Complete', reference: '#WO-1544' }
    ],
    liveActivity: [
      { title: 'Pressure stabilized', description: 'Hydraulic pressure normalized to 2400 PSI after startup cycle.', time: '10:42 AM', type: 'success' },
      { title: 'Shift Started', description: 'Operator ID: #8821 logged in. Auto-sequence initiated.', time: '08:08 AM', type: 'default' },
      { title: 'Minor Warning: Oil Level', description: 'Oil level dropped to 15% momentarily. Corrected by auto-fill.', time: 'Yesterday, 4:15 PM', type: 'warning' },
      { title: 'Firmware Update', description: 'System patch v4.2.1 installed successfully.', time: 'Oct 28, 9:00 AM', type: 'default' }
    ]
  };
}
