import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private supabase: SupabaseService) { }

  getDashboardMetrics(): Observable<any> {
    // 1. Critical Equipment Count
    const critical$ = from(
      this.supabase.client
        .from('equipment')
        .select('*', { count: 'exact', head: true })
        .or('status.ilike.%offline%,status.ilike.%error%')
    ).pipe(map(res => res.count || 0));

    // 2. Open Requests Count
    const openRequests$ = from(
      this.supabase.client
        .from('maintenance_requests')
        .select('*', { count: 'exact', head: true })
        .neq('status', 'Completed')
    ).pipe(map(res => res.count || 0));

    // 3. Technician Load (Active Work Orders / Total Techs)
    const activeTasks$ = from(
      this.supabase.client
        .from('work_orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'In Progress')
    ).pipe(map(res => res.count || 0));

    const totalTechs$ = from(
      this.supabase.client
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'Technician')
    ).pipe(map(res => res.count || 1)); // Avoid div/0

    return forkJoin({
      criticalEquipment: critical$,
      openRequests: openRequests$,
      totalTechs: totalTechs$,
      activeTasks: activeTasks$
    });
  }

  getActivityFeed(): Observable<any[]> {
    // Fetch from 'alerts' table
    const promise = this.supabase.client
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
      .then(result => result.data || []);

    return from(promise);
  }

  getRecommendations(): Observable<any[]> {
    // Fetch from 'recommendations' table
    const promise = this.supabase.client
      .from('recommendations')
      .select('*')
      .limit(3)
      .then(result => result.data || []);

    return from(promise);
  }
}
