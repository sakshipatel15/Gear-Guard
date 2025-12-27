import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EquipmentItem {
  id: string;
  name: string;
  department: string;
  category: string;
  team: { name: string; avatar: string };
  health: number;
  status: 'Operational' | 'Maintenance Due' | 'Offline - Error' | 'Inspection Needed';
}

@Component({
  selector: 'app-equipment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent {

  // Pagination State
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  equipmentList: EquipmentItem[] = []; // Will be populated in constructor/onInit

  constructor() {
    this.generateMockData();
  }

  generateMockData() {
    // Base data
    const baseData: EquipmentItem[] = [
      { name: 'Hydraulic Press A1', id: 'HP-2024-001', department: 'Manufacturing', category: 'Heavy Machinery', team: { name: 'Alpha', avatar: 'https://i.pravatar.cc/150?u=alpha' }, health: 98, status: 'Operational' },
      { name: 'Conveyor Belt M4', id: 'CB-2023-089', department: 'Logistics', category: 'Transport', team: { name: 'Beta', avatar: 'https://i.pravatar.cc/150?u=beta' }, health: 75, status: 'Maintenance Due' },
      { name: 'CNC Lathe X5', id: 'CNC-2022-012', department: 'Machining', category: 'Precision', team: { name: 'Alpha', avatar: 'https://i.pravatar.cc/150?u=alpha2' }, health: 40, status: 'Offline - Error' },
      { name: 'Robotic Arm R2', id: 'RA-2024-103', department: 'Assembly', category: 'Automation', team: { name: 'Gamma', avatar: 'https://i.pravatar.cc/150?u=gamma' }, health: 95, status: 'Operational' },
      { name: 'Cooling System C1', id: 'CS-2023-011', department: 'Facility', category: 'HVAC', team: { name: 'Delta', avatar: 'https://i.pravatar.cc/150?u=delta' }, health: 78, status: 'Inspection Needed' }
    ];

    // Generate 25 items for demo purposes
    for (let i = 0; i < 5; i++) {
      baseData.forEach((item, index) => {
        this.equipmentList.push({
          ...item,
          // Append index to ID to ensure uniqueness for all items
          id: `${item.id}-${i * 5 + index + 1}`,
          name: `${item.name} (${i + 1})`
        });
      });
    }
    this.totalItems = this.equipmentList.length;
  }

  get paginatedList(): EquipmentItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.equipmentList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get startItemIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItemIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  departments: string[] = ['Manufacturing', 'Logistics', 'Machining', 'Assembly', 'Facility'];
  statuses: string[] = ['Operational', 'Maintenance Due', 'Offline - Error', 'Inspection Needed'];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Operational': return 'bg-success-subtle text-success border-success-subtle';
      case 'Maintenance Due': return 'bg-warning-subtle text-warning border-warning-subtle'; // Specific yellow for maintenance
      case 'Offline - Error': return 'bg-danger-subtle text-danger border-danger-subtle';
      case 'Inspection Needed': return 'bg-inspection-subtle text-inspection border-inspection-subtle'; // Custom orange-ish
      default: return 'bg-light text-secondary';
    }
  }

  getHealthColor(health: number): string {
    if (health >= 90) return 'text-success';
    if (health >= 70) return 'text-warning';
    return 'text-danger';
  }

}
