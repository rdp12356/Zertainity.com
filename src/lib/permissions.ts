import { supabase } from "@/integrations/supabase/client";

export type Permission =
    | 'manage_users'
    | 'edit_careers'
    | 'edit_colleges'
    | 'edit_schools'
    | 'edit_pathways'
    | 'edit_quiz'
    | 'view_audit_log'
    | 'view_analytics'
    | 'manage_permissions'
    | 'delete_users'
    | 'invite_users'
    | 'export_data';

export type Role = 'owner' | 'admin' | 'manager' | 'editor' | 'user';

/**
 * Check if current user has a specific permission
 */
export async function hasPermission(permission: Permission): Promise<boolean> {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { data, error } = await supabase.rpc('has_permission', {
            _user_id: user.id,
            _permission: permission
        } as any);

        if (error) throw error;
        return data || false;
    } catch (error) {
        console.error('Permission check failed:', error);
        return false;
    }
}

/**
 * Check if current user has a specific role
 */
export async function hasRole(role: Role): Promise<boolean> {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { data } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single();

        return data?.role === role;
    } catch (error) {
        console.error('Role check failed:', error);
        return false;
    }
}

/**
 * Get current user's role
 */
export async function getCurrentUserRole(): Promise<Role | null> {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .maybeSingle();

        return (data?.role as Role) || 'user';
    } catch (error) {
        console.error('Get role failed:', error);
        return null;
    }
}

/**
 * Log user activity
 */
export async function logActivity(action: string, details?: Record<string, unknown>) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        await supabase.rpc('log_user_activity', {
            p_user_id: user.id,
            p_action: action,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any

            p_details: (details as any) || null
        });
    } catch (error) {
        console.error('Activity logging failed:', error);
    }
}

/**
 * Permission requirements for each role
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    owner: [
        'manage_users',
        'edit_careers',
        'edit_colleges',
        'edit_schools',
        'edit_pathways',
        'edit_quiz',
        'view_audit_log',
        'view_analytics',
        'manage_permissions',
        'delete_users',
        'invite_users',
        'export_data'
    ],
    admin: [
        'manage_users',
        'edit_careers',
        'edit_colleges',
        'edit_schools',
        'edit_pathways',
        'edit_quiz',
        'view_audit_log',
        'invite_users',
        'export_data'
    ],
    manager: [
        'edit_careers',
        'edit_colleges',
        'edit_schools',
        'view_audit_log'
    ],
    editor: [
        'edit_careers',
        'edit_colleges',
        'edit_schools'
    ],
    user: []
};
