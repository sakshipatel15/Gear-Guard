export interface UserProfile {
    id: string;
    email: string;
    name?: string;
    role?: 'admin' | 'manager' | 'operator' | 'user';
    avatar_url?: string;
    created_at?: string;
}
