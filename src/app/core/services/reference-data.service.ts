import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReferenceDataService {

    constructor(private supabase: SupabaseService) { }

    // Get all work centers for 'Department/Location' dropdowns
    getWorkCenters(): Observable<any[]> {
        const promise = this.supabase.client
            .from('work_centers')
            .select('id, name')
            .order('name', { ascending: true })
            .then(result => result.data || []);

        return from(promise);
    }

    // Get all categories for filter dropdowns
    getCategories(): Observable<any[]> {
        const promise = this.supabase.client
            .from('categories')
            .select('id, name')
            .order('name', { ascending: true })
            .then(result => result.data || []);

        return from(promise);
    }

    // Get distinct statuses from equipment table as a fallback for dynamic status list
    // Or return a standard list if the DB constraint enforces it, but fetching used ones is dynamic.
    getEquipmentStatuses(): Observable<string[]> {
        const promise = this.supabase.client
            .from('equipment')
            .select('status')
            .order('status')
            .then(result => {
                const data = result.data || [];
                // Unique statuses
                return [...new Set(data.map((item: any) => item.status))];
            });

        return from(promise);
    }
}
