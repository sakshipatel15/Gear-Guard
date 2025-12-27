import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private supabase: SupabaseService) { }

  // Get all maintenance requests
  getRequests(): Observable<any[]> {
    const promise = this.supabase.client
      .from('maintenance_requests')
      .select(`
        *,
        equipment:equipment_id (name, model)
      `)
      .order('scheduled_date', { ascending: true })
      .then(result => result.data || []);

    return from(promise);
  }

  // Add request
  addRequest(data: any): Observable<any> {
    const promise = this.supabase.client
      .from('maintenance_requests')
      .insert(data)
      .select()
      .single()
      .then(result => result.data);

    return from(promise);
  }

  // Update request
  updateRequest(id: string, data: any): Observable<any> {
    const promise = this.supabase.client
      .from('maintenance_requests')
      .update(data)
      .eq('id', id)
      .select()
      .single()
      .then(result => result.data);

    return from(promise);
  }

  // Get Calendar Events
  getCalendarEvents(): Observable<any[]> {
    const promise = this.supabase.client
      .from('maintenance_calendar')
      .select('*')
      .order('start_time', { ascending: true })
      .then(result => result.data || []);

    return from(promise);
  }

  // Get Pending Requests (approvals)
  getPendingRequests(): Observable<any[]> {
    const promise = this.supabase.client
      .from('maintenance_requests')
      .select(`
            *,
            equipment:equipment_id (name)
        `)
      .eq('status', 'Pending')
      .order('created_at', { ascending: false })
      .then(result => result.data || []);

    return from(promise);
  }
}
