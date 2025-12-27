import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterModule],
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
    forgotForm: FormGroup;
    required: boolean = false;
    successPopup: boolean = false;
    errorPopup: boolean = false;
    isLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        privateVc: SupabaseService, // Typo in thinking? No, just private supabase
        private supabase: SupabaseService,
        private location: Location
    ) {
        this.forgotForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]]
        });
    }

    async onSubmit() {
        if (this.forgotForm.invalid) {
            this.required = true;
            setTimeout(() => {
                this.required = false;
            }, 3000);
            return;
        }

        this.isLoading = true;
        this.errorPopup = false;
        this.successPopup = false;

        try {
            const { email } = this.forgotForm.value;
            const { error } = await this.supabase.resetPasswordForEmail(email);

            if (error) {
                this.errorPopup = true;
            } else {
                this.successPopup = true;
                this.forgotForm.reset();
            }
        } catch (error) {
            this.errorPopup = true;
        } finally {
            this.isLoading = false;
        }
    }

    goBack() {
        this.location.back();
    }

    closeErrorPopup() {
        this.errorPopup = false;
    }

    closeSuccessPopup() {
        this.successPopup = false;
    }

    openMailApp() {
        window.open('https://mail.google.com', '_blank');
    }
}
