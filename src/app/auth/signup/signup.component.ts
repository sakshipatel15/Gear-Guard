import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  showPassword = false;
  showConfirmPassword = false;

  successPopup = false;
  errorPopup = false;
  mismatchPopup = false;
  isLoading = false;

  errorMessage = 'Something went wrong';

  // 🔐 Password strength (USED BY HTML)
  strengthScore = 0;
  strengthText = 'Weak';
  strengthColor = '#E5E7EB';

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm.get('password')?.valueChanges.subscribe(value => {
      this.calculateStrength(value || '');
    });
  }

  openMailApp() {
    window.open('https://mail.google.com', '_blank');
  }

  navigateToLogin() {
    this.closeSuccessPopup();
    this.router.navigate(['/login']);
  }

  signupForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl('', Validators.required)
  });

  async onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    if (
      this.signupForm.value.password !==
      this.signupForm.value.confirmPassword
    ) {
      this.mismatchPopup = true;
      return;
    }

    this.isLoading = true;

    try {
      // 1️⃣ Supabase Auth Signup
      const { data, error } = await this.supabase.signup({
        email: this.signupForm.value.email!,
        password: this.signupForm.value.password!
      });

      if (error || !data?.user) {
        this.errorMessage = error?.message || 'Signup failed';
        this.errorPopup = true;
        return;
      }

      // 2️⃣ Insert into users table (MATCHES NEW SCHEMA)
      const userData = {
        id: data.user.id,
        email: data.user.email,
        name: this.signupForm.value.fullName!,
        role: 'Operator',
        created_at: new Date().toISOString()
      };

      const { error: insertError } =
        await this.supabase.addUserData(userData);

      // allow duplicate / RLS
      // Relaxed check: code 42501, 23505 OR check message text for RLS policy
      if (
        insertError &&
        insertError.code != '23505' &&
        insertError.code != '42501' &&
        !insertError.message?.includes('row-level security')
      ) {
        this.errorMessage = insertError.message;
        this.errorPopup = true;
        return;
      }

      // 3️⃣ Save locally
      localStorage.setItem(
        'gearGuardUserData',
        JSON.stringify(userData)
      );

      // Show Success
      this.successPopup = true;
      this.signupForm.reset();

      // Removed auto-navigation to allow user to see "Check Mail" popup
      // setTimeout(() => {
      //   this.router.navigate(['/login']);
      // }, 1500);

    } finally {
      this.isLoading = false;
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // 🔐 PASSWORD STRENGTH LOGIC
  calculateStrength(password: string) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    this.strengthScore = score;

    if (score <= 1) {
      this.strengthText = 'Weak';
      this.strengthColor = '#EF4444';
    } else if (score <= 3) {
      this.strengthText = 'Medium';
      this.strengthColor = '#F59E0B';
    } else {
      this.strengthText = 'Strong';
      this.strengthColor = '#10B981';
    }
  }

  closeSuccessPopup() { this.successPopup = false; }
  closeErrorPopup() { this.errorPopup = false; }
  closeMismatchPopup() { this.mismatchPopup = false; }
}
