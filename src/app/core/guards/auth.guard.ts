import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  try {
    const { data } = await supabase.getSession();

    if (data.session) {
      return true;
    }

    // No session, redirect to login
    router.navigate(['/login']);
    return false;

  } catch (error) {
    console.error('Auth Guard Error:', error);
    router.navigate(['/access-denied']);
    return false;
  }
};
