import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private supabase: SupabaseService) { }

  // Get all equipment
  getAllEquipment(): Observable<any[]> {
    const promise = this.supabase.client
      .from('equipment')
      .select(`
        *,
        equipment_health (health_score),
        work_centers (name)
      `)
      .order('created_at', { ascending: false })
      .then(result => result.data || []);

    return from(promise);
  }

  // Get single equipment
  getEquipmentById(id: string): Observable<any> {
    const promise = this.supabase.client
      .from('equipment')
      .select('*')
      .eq('id', id)
      .single()
      .then(result => result.data);

    return from(promise);
  }

  // Add new equipment
  addEquipment(data: any): Observable<any> {
    const promise = this.supabase.client
      .from('equipment')
      .insert(data)
      .select()
      .single()
      .then(result => result.data);

    return from(promise);
  }

  // Update equipment
  updateEquipment(id: string, data: any): Observable<any> {
    const promise = this.supabase.client
      .from('equipment')
      .update(data)
      .eq('id', id)
      .select()
      .single()
      .then(result => result.data);

    return from(promise);
  }

  // Delete equipment
  deleteEquipment(id: string): Observable<any> {
    const promise = this.supabase.client
      .from('equipment')
      .delete()
      .eq('id', id)
      .then(result => result.data);

    return from(promise);
  }
}
