import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AccessDeniedComponent } from './shared/components/access-denied/access-denied.component';
import { CommandDashboardComponent } from './dashboard/command-dashboard/command-dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: 'home', component: CommandDashboardComponent, canActivate: [authGuard] },
    { path: 'dashboard', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'login', pathMatch: 'full' } // Default to login to forceauth
];
