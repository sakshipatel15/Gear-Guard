import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentService } from '../../core/services/equipment.service';
import { ReferenceDataService } from '../../core/services/reference-data.service';


@Component({
    selector: 'app-equipment-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="modal-backdrop" (click)="close()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{ isEdit ? 'Edit Equipment' : 'Add New Equipment' }}</h3>
          <button class="btn-close" (click)="close()"><span class="material-icons">close</span></button>
        </div>
        
        <div class="modal-body">
            <div class="form-group">
                <label>Equipment Name</label>
                <input type="text" [(ngModel)]="formData.name" placeholder="Ex: Hydraulic Press A1">
            </div>
            
            <div class="form-group">
                <label>Serial Number / ID</label>
                <input type="text" [(ngModel)]="formData.serial_number" placeholder="Ex: HP-2024-001" [disabled]="isEdit">
            </div>

            <div class="form-group">
                <label>Model</label>
                <input type="text" [(ngModel)]="formData.model" placeholder="Ex: X500 Series">
            </div>

            <div class="form-group">
                <label>Manufacturer</label>
                <input type="text" [(ngModel)]="formData.manufacturer" placeholder="Ex: HeavyInd Corp">
            </div>

            <div class="form-group">
                <label>Location / Department</label>
                <select [(ngModel)]="formData.location">
                    <option *ngFor="let loc of locations" [value]="loc.name">{{ loc.name }}</option>
                </select>
            </div>

            <div class="form-group">
                <label>Status</label>
                <select [(ngModel)]="formData.status" [class]="formData.status">
                    <option *ngFor="let stat of statuses" [value]="stat">{{ stat }}</option>
                </select>
            </div>
        </div>

        <div class="modal-footer">
            <button class="btn-cancel" (click)="close()">Cancel</button>
            <button class="btn-save" (click)="save()" [disabled]="isLoading">
                {{ isLoading ? 'Saving...' : 'Save Equipment' }}
            </button>
        </div>
      </div>
    </div>
  `,
    // ... styles kept same or similar ...
    styles: [`
    .modal-backdrop {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex; justify-content: center; align-items: center;
        z-index: 1100;
        backdrop-filter: blur(4px);
    }
    .modal-content {
        background: white;
        padding: 24px;
        border-radius: 12px;
        width: 100%;
        max-width: 500px;
        box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
        animation: scaleIn 0.2s ease-out;
    }
    .modal-header {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 20px;
        h3 { margin: 0; font-size: 1.25rem; }
        .btn-close { background: none; border: none; cursor: pointer; color: #6b7280; }
    }
    .form-group {
        margin-bottom: 16px;
        label { display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.875rem; color: #374151; }
        input, select {
            width: 100%; padding: 10px;
            border: 1px solid #d1d5db; border-radius: 6px;
            font-size: 0.875rem;
            &:focus { outline: none; border-color: #3b82f6; ring: 2px solid #3b82f6; }
        }
    }
    .modal-footer {
        display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;
        button {
            padding: 8px 16px; border-radius: 6px; font-weight: 500; cursor: pointer; border: none;
        }
        .btn-cancel { background: #f3f4f6; color: #374151; }
        .btn-save { background: #2563eb; color: white; }
    }
    @keyframes scaleIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
  `]
})
export class EquipmentFormComponent implements OnInit {
    @Input() equipment: any = null;
    @Output() closeEvent = new EventEmitter<void>();
    @Output() saveEvent = new EventEmitter<void>();

    formData = {
        name: '',
        serial_number: '',
        model: '',
        manufacturer: '',
        location: '',
        status: 'Operational'
    };
    isEdit = false;
    isLoading = false;

    // Dynamic Options
    locations: any[] = [];
    statuses: string[] = ['Operational', 'Maintenance Due', 'Offline - Error', 'Inspection Needed'];
    // ^ Fallback initial, overridden by API

    constructor(
        private equipmentService: EquipmentService,
        private refService: ReferenceDataService
    ) { }

    ngOnInit() {
        this.loadOptions();

        if (this.equipment) {
            this.isEdit = true;
            this.formData = {
                name: this.equipment.name,
                serial_number: this.equipment.id,
                model: this.equipment.model || '',
                manufacturer: this.equipment.manufacturer || '',
                location: this.equipment.department,
                status: this.equipment.status
            };
        }
    }

    loadOptions() {
        this.refService.getWorkCenters().subscribe(data => {
            this.locations = data;
            // Set default if adding new and not set
            if (!this.isEdit && this.locations.length > 0) {
                this.formData.location = this.locations[0].name;
            }
        });

        // Optionally fetch statuses if we want them dynamic too
        this.refService.getEquipmentStatuses().subscribe(data => {
            if (data && data.length > 0) {
                // Merger with default important ones to ensure we don't lose key statuses if DB is empty
                const defaults = ['Operational', 'Maintenance Due', 'Offline - Error', 'Inspection Needed'];
                this.statuses = [...new Set([...defaults, ...data])];
            }
        });
    }

    close() {
        this.closeEvent.emit();
    }

    save() {
        this.isLoading = true;
        const data = {
            name: this.formData.name,
            serial_number: this.formData.serial_number,
            model: this.formData.model,
            manufacturer: this.formData.manufacturer,
            location: this.formData.location,
            status: this.formData.status,
            updated_at: new Date()
        };

        const request = this.isEdit
            ? this.equipmentService.updateEquipment(this.equipment.realId, data)
            : this.equipmentService.addEquipment(data);

        request.subscribe({
            next: () => {
                this.isLoading = false;
                this.saveEvent.emit();
            },
            error: (err) => {
                console.error('Failed to save equipment', err);
                this.isLoading = false;
            }
        });
    }
}
