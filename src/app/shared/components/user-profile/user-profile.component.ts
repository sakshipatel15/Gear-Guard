import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
    isEditing = signal(false);
    editData = {
        name: '',
        department: ''
    };
    isLoading = signal(false);

    constructor(
        public authService: AuthService,
        private userService: UserService
    ) { }

    startEdit() {
        const user = this.authService.currentUser();
        if (user) {
            this.editData = {
                name: user.name,
                department: user.department || ''
            };
            this.isEditing.set(true);
        }
    }

    cancelEdit() {
        this.isEditing.set(false);
    }

    saveProfile() {
        const user = this.authService.currentUser();
        if (!user) return;

        this.isLoading.set(true);
        this.userService.updateProfile(user.id, {
            full_name: this.editData.name,
            department: this.editData.department
        }).subscribe({
            next: (updated) => {
                // Update local session
                this.authService.setSession({
                    ...user,
                    name: this.editData.name,
                    department: this.editData.department
                });
                this.isEditing.set(false);
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to update profile', err);
                this.isLoading.set(false);
            }
        });
    }
}
