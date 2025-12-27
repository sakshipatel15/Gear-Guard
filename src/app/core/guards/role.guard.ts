import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

export const roleGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  // 1. Check if user is authenticated first (redundant if chained after authGuard, but safe)
  const { data: sessionData } = await supabase.getSession();
  if (!sessionData.session) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Get User Role (Assuming stored in userData/profile or metadata)
  // We can fetch from DB 'users' table or local storage cache to save a call
  // For robustness, let's fetch or use a service method that caches
  // Here we'll try to get it from local storage first for speed, then verify if needed
  // But strictly, we should fetch from Supabase 'users' table using user ID

  const userId = sessionData.session.user.id;

  // Try fetching user profile from service (which might be cached or needs a call)
  const { data: userData, error } = await supabase.getUserDataById(userId);

  if (error || !userData) {
    console.error('Role Guard: Could not fetch user role', error);
    router.navigate(['/access-denied']); // Or login
    return false;
  }

  const userRole = userData.role; // e.g., 'admin', 'user', 'manager'

  // 3. Check against Route Data
  const expectedRoles = route.data['roles'] as Array<string>;

  if (expectedRoles && expectedRoles.includes(userRole)) {
    return true;
  }

  // 4. Unauthorized
  console.warn(`Role Guard: Access denied. User role '${userRole}' not in [${expectedRoles}]`);
  router.navigate(['/access-denied']); // Redirect to access denied page
  return false;
};
