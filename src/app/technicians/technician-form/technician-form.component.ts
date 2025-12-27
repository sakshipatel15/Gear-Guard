import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

@Component({
    selector: 'app-technician-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="modal-backdrop" (click)="close()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{ isEdit ? 'Edit Technician' : 'Recruit Technician' }}</h3>
          <button class="btn-close" (click)="close()"><span class="material-icons">close</span></button>
        </div>
        
        <div class="modal-body">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" [(ngModel)]="formData.full_name" placeholder="Ex: John Doe">
            </div>
            
            <div class="form-group">
                <label>Role</label>
                <select [(ngModel)]="formData.role">
                    <option value="Technician">Technician</option>
                    <option value="Hydraulics A">Hydraulics A</option>
                    <option value="Hydraulics B">Hydraulics B</option>
                    <option value="Electrical A">Electrical A</option>
                    <option value="Electrical B">Electrical B</option>
                    <option value="Mech Core">Mech Core</option>
                    <option value="Logistics">Logistics</option>
                </select>
            </div>

            <div class="form-group">
                <label>Department</label>
                <input type="text" [(ngModel)]="formData.department" placeholder="Ex: Engineering">
            </div>

             <!-- Note: Cannot create Auth User from here easily without Admin API. 
                  So we might just be creating a Profile record or assuming separate Auth process. -->
        </div>

        <div class="modal-footer">
            <button class="btn-cancel" (click)="close()">Cancel</button>
            <button class="btn-save" (click)="save()" [disabled]="isLoading">
                {{ isLoading ? 'Saving...' : 'Save' }}
            </button>
        </div>
      </div>
    </div>
  `,
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
        max-width: 400px;
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
export class TechnicianFormComponent {
    @Input() technician: any = null;
    @Output() closeEvent = new EventEmitter<void>();
    @Output() saveEvent = new EventEmitter<void>();

    formData = {
        full_name: '',
        role: 'Technician',
        department: ''
    };
    isEdit = false;
    isLoading = false;

    constructor(private userService: UserService) { }

    ngOnInit() {
        if (this.technician) {
            this.isEdit = true;
            this.formData = {
                full_name: this.technician.name, // technician interface has 'name'
                role: this.technician.role,
                department: 'Engineering'
            };
        }
    }

    close() {
        this.closeEvent.emit();
    }

    save() {
        this.isLoading = true;
        if (this.isEdit && this.technician) {
            this.userService.updateProfile(this.technician.id, this.formData).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.saveEvent.emit();
                },
                error: (err) => {
                    console.error(err);
                    this.isLoading = false;
                }
            });
        } else {
            // CREATE: This is tricky without Auth.
            // For now, we simulate success or try to insert if allowed.
            this.isLoading = false;
            alert("To add a new technician, they must Sign Up with an email. This feature requires Admin Auth API.");
            this.close();
        }
    }
}
