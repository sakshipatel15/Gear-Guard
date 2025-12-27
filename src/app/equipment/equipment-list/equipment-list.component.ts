import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EquipmentService } from '../../core/services/equipment.service';
import { EquipmentFormComponent } from '../equipment-form/equipment-form.component';
import { ReferenceDataService } from '../../core/services/reference-data.service';

interface EquipmentItem {
  id: string;      // Display ID (Serial No)
  realId: string;  // UUID for DB operations
  name: string;
  model: string;
  manufacturer: string;
  department: string;
  category: string;
  team: { name: string; avatar: string };
  health: number;
  status: 'Operational' | 'Maintenance Due' | 'Offline - Error' | 'Inspection Needed';
}

@Component({
  selector: 'app-equipment-list',
  standalone: true,
  imports: [CommonModule, RouterModule, EquipmentFormComponent],
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit {

  // Pagination State
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  isLoading = true;

  equipmentList: EquipmentItem[] = [];

  showModal = false;
  selectedEquipment: any = null; // EquipmentItem or null


  // constructor moved to bottom with new injections



  loadEquipment() {
    this.isLoading = true;
    this.equipmentService.getAllEquipment().subscribe({
      next: (data) => {
        this.equipmentList = data.map(item => this.mapToEquipmentItem(item));
        this.totalItems = this.equipmentList.length;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load equipment', err);
        this.isLoading = false;
      }
    });
  }

  openNewEquipmentModal() {
    this.selectedEquipment = null;
    this.showModal = true;
  }

  openEditModal(item: EquipmentItem) {
    this.selectedEquipment = {
      ...item,
      id: item.id, // Display ID
      // Map back fields expected by form if needed, or form uses item properties directly.
      // Form expects: name, id (serial), model, manufacturer, department, status.
      // My item has: name, id, department, status. 
      // Missing in item: model, manufacturer.
      // I need to fetch them or pass the raw object? 
      // Since getAllEquipment() returned raw data, maybe I should store raw data too?
      // Simpler: Just rely on what we have or update mapToEquipmentItem to store raw if needed.
      // For now, form uses basic fields. I will verify form logic.
    };
    // Form uses: equipment.id -> serial_number, equipment.name, equipment.department -> location
    // My EquipmentItem has these mapped already.
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedEquipment = null;
  }

  onSave() {
    this.closeModal();
    this.loadEquipment();
  }

  private mapToEquipmentItem(dbItem: any): EquipmentItem {
    // Map joined data
    const healthData = dbItem.equipment_health?.[0] || dbItem.equipment_health; // Handle single/array return
    const healthScore = healthData ? healthData.health_score : 100; // Default to 100 if no health record

    const teamName = dbItem.work_centers ? dbItem.work_centers.name : (dbItem.department || 'Unassigned');

    return {
      id: dbItem.serial_number || dbItem.id.substring(0, 8).toUpperCase(),
      realId: dbItem.id,
      name: dbItem.name || 'Unknown Equipment',
      model: dbItem.model || '',
      manufacturer: dbItem.manufacturer || '',
      department: dbItem.location || 'General',
      category: dbItem.category_id || 'Heavy Machinery', // Ideally fetch category name too
      team: {
        name: teamName,
        avatar: `https://ui-avatars.com/api/?name=${teamName}&background=random`
      },
      health: healthScore,
      status: this.normalizeStatus(dbItem.status)
    };
  }

  private normalizeStatus(status: string): 'Operational' | 'Maintenance Due' | 'Offline - Error' | 'Inspection Needed' {
    if (!status) return 'Operational';
    const s = status.toLowerCase();
    if (s.includes('maintenance')) return 'Maintenance Due';
    if (s.includes('error') || s.includes('offline')) return 'Offline - Error';
    if (s.includes('inspection')) return 'Inspection Needed';
    return 'Operational';
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

  departments: any[] = [];
  statuses: string[] = ['Operational', 'Maintenance Due', 'Offline - Error', 'Inspection Needed'];

  constructor(
    private equipmentService: EquipmentService,
    private refService: ReferenceDataService
  ) { }

  ngOnInit() {
    this.loadEquipment();
    this.loadFilters();
  }

  loadFilters() {
    this.refService.getWorkCenters().subscribe(data => this.departments = data.map(d => d.name));
    // can also load statuses if needed, or keep default set for coloring logic, 
    // but let's ensure we have at least the critical ones.
    this.refService.getEquipmentStatuses().subscribe(data => {
      if (data && data.length) {
        const defaults = this.statuses;
        this.statuses = [...new Set([...defaults, ...data])];
      }
    });
  }

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
