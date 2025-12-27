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
    private router: Router
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
      const { data: userData } =
        await this.supabase.getUserDataById(data.user.id);

      // 3️⃣ If profile exists
      if (userData) {
        localStorage.setItem(
          'gearGuardUserData',
          JSON.stringify(userData)
        );

        this.successPopup = true;

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);

        return;
      }

      // 4️⃣ SELF-HEAL: create missing profile
      const newUser = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.email?.split('@')[0] || 'User',
        role: 'Operator',
        created_at: new Date().toISOString()
      };

      await this.supabase.addUserData(newUser);

      localStorage.setItem(
        'gearGuardUserData',
        JSON.stringify(newUser)
      );

      this.successPopup = true;

      // setTimeout(() => {
      //   this.router.navigate(['/home']);
      // }, 1500);

    } finally {
      this.isLoading = false;
    }
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
