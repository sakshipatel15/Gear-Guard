import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get client() {
    return this.supabase;
  }

  // AUTH
  signup({ email, password, options }: any) {
    return this.supabase.auth.signUp({
      email,
      password,
      options
    });
  }

  login({ email, password }: any) {
    return this.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  getUser() {
    return this.supabase.auth.getUser();
  }

  getSession() {
    return this.supabase.auth.getSession();
  }

  updatePassword(password: string) {
    return this.supabase.auth.updateUser({ password });
  }

  resetPasswordForEmail(email: string) {
    return this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password'
    });
  }

  // ✅ IMPORTANT FIX
  addUserData(userData: any) {
    return this.supabase
      .from('users')
      .insert(userData); // 🔥 NO single(), NO select()
  }

  getUserDataById(userId: string) {
    return this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle(); // ✅ SAFE
  }
}
