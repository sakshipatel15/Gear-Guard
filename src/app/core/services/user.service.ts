import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private supabase: SupabaseService) { }

    // Get a single profile by ID
    getProfile(userId: string): Observable<any> {
        const promise = this.supabase.client
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()
            .then(result => result.data);

        return from(promise);
    }

    // Update a profile
    updateProfile(userId: string, data: any): Observable<any> {
        const promise = this.supabase.client
            .from('profiles')
            .update(data)
            .eq('id', userId)
            .select()
            .single()
            .then(result => result.data);

        return from(promise);
    }

    // Get all users with role 'technician'
    getTechnicians(): Observable<any[]> {
        const promise = this.supabase.client
            .from('profiles')
            .select('*')
            .eq('role', 'Technician') // Adjust case based on actual data
            .then(result => result.data || []);

        return from(promise);
    }

    // Get technicians with dynamic stats (Efficiency, Status)
    getTechniciansWithStats(): Observable<any[]> {
        // We need profiles AND their active/completed work orders
        // Note: Joining profiles -> work_orders(technician_id)
        const promise = this.supabase.client
            .from('profiles')
            .select(`
                *,
                work_orders:work_orders!technician_id (
                    status,
                    outcome
                )
            `)
            .eq('role', 'Technician')
            .then(result => {
                const data = result.data || [];
                return data.map((tech: any) => {
                    const orders = tech.work_orders || [];
                    const active = orders.some((o: any) => o.status === 'In Progress' || o.status === 'Pending');
                    const completed = orders.filter((o: any) => o.status === 'Completed').length;
                    const successful = orders.filter((o: any) => o.status === 'Completed' && o.outcome === 'Successful').length;

                    // efficiency = success rate or just assume high if no data
                    const efficiency = completed > 0 ? Math.round((successful / completed) * 100) : 100;

                    return {
                        ...tech,
                        calculatedStatus: active ? 'On Job' : 'Available',
                        calculatedEfficiency: efficiency
                    };
                });
            });

        return from(promise);
    }
}
