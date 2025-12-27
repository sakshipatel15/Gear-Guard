import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../core/services/supabase.service';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showPassword = false;
  successPopup = false;
  errorPopup = false;
  isLoading = false;

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', Validators.required)
  });

  async onLoginFormSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorPopup = false;

    try {
      // 1️⃣ Auth login
      const { data, error } = await this.supabase.login({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      });

      if (error || !data?.user) {
        this.errorPopup = true;
        return;
      }

      // 2️⃣ Fetch profile
      this.userService.getProfile(data.user.id).subscribe({
        next: (profile) => {
          if (profile) {
            this.successPopup = true;
            setTimeout(() => {
              this.authService.setSession({
                id: profile.id,
                name: profile.full_name || data.user.email?.split('@')[0] || 'User',
                email: data.user.email!,
                role: profile.role || 'Operator',
                avatar: profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.full_name || 'User'}&background=random`,
                department: profile.department || 'General',
                status: profile.status || 'Active'
              });
            }, 1000);
          } else {
            // Profile missing? Create one or handle error.
            // For now, let's create a default one via a self-heal if possible, or just fail safe.
            this.handleMissingProfile(data.user);
          }
        },
        error: (err) => {
          // Handle 406 or missing profile
          this.handleMissingProfile(data.user);
        }
      });
      return;

    } finally {
      this.isLoading = false;
    }
  }

  async handleMissingProfile(user: any) {
    // 4️⃣ SELF-HEAL: create missing profile
    const newProfile = {
      id: user.id,
      full_name: user.email?.split('@')[0] || 'User',
      role: 'Operator', // Default role
      avatar_url: '',
      department: 'General'
    };

    this.userService.updateProfile(user.id, newProfile).subscribe({
      next: (profile) => {
        this.successPopup = true;
        setTimeout(() => {
          this.authService.setSession({
            id: profile.id,
            name: profile.full_name,
            email: user.email!,
            role: profile.role,
            avatar: `https://ui-avatars.com/api/?name=${profile.full_name}&background=random`,
            department: profile.department,
            status: profile.status || 'Active'
          });
        }, 1000);
      },
      error: () => {
        this.errorPopup = true; // Failed to create profile
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  closeErrorPopup() {
    this.errorPopup = false;
  }

  closeSuccessPopup() {
    this.successPopup = false;
  }
}
