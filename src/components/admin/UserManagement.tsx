import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Ban, Search, ShieldCheck, ShieldOff, Loader2 } from "lucide-react";
import { InviteUserDialog } from "./InviteUserDialog";
import { CSVImportExport } from "./CSVImportExport";
import { logActivity } from "@/lib/permissions";

interface UserManagementProps {
    currentUserRole: string;
}

type AppRole = 'owner' | 'admin' | 'manager' | 'editor' | 'user';

interface UserData {
    user_id: string;
    email: string;
    role: AppRole;
    avatar_url: string | null;
    created_at: string;
    is_suspended: boolean;
}

export const UserManagement = ({ currentUserRole }: UserManagementProps) => {
    const { toast } = useToast();
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.rpc('get_all_users_with_roles');

            if (error) throw error;
            setUsers(data || []);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to fetch users";
            toast({
                title: "Error fetching users",
                description: message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleRoleUpdate = async (userId: string, newRole: AppRole) => {
        try {
            const { error } = await supabase
                .from('user_roles')
                .upsert({ user_id: userId, role: newRole });

            if (error) throw error;

            // Log the activity
            await logActivity('change_user_role', { user_id: userId, new_role: newRole });

            toast({ title: "Role Updated", description: "User role changed successfully." });
            fetchUsers();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to update role";
            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
        }
    };

    const toggleSuspension = async (user: UserData) => {
        try {
            if (user.is_suspended) {
                // Unsuspend
                const { error } = await supabase
                    .from('suspended_users')
                    .delete()
                    .eq('user_id', user.user_id);

                if (error) throw error;

                await logActivity('unsuspend_user', { user_id: user.user_id, email: user.email });
                toast({ title: "User Unsuspended", description: "Access restored." });
            } else {
                // Suspend
                const { data: { user: currentUser } } = await supabase.auth.getUser();

                const { error } = await supabase
                    .from('suspended_users')
                    .insert({
                        user_id: user.user_id,
                        reason: 'Admin action',
                        suspended_by: currentUser?.id
                    });

                if (error) throw error;

                await logActivity('suspend_user', { user_id: user.user_id, email: user.email });
                toast({ title: "User Suspended", description: "Access revoked." });
            }

            fetchUsers();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to update suspension status";
            toast({ title: "Error", description: message, variant: "destructive" });
        }
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'owner': return "bg-purple-500/10 text-purple-400 border-purple-500/20";
            case 'admin': return "bg-red-500/10 text-red-400 border-red-500/20";
            case 'manager': return "bg-orange-500/10 text-orange-400 border-orange-500/20";
            case 'editor': return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
        }
    };

    const canManageRoles = ['owner', 'admin'].includes(currentUserRole);

    const filteredUsers = users.filter(u =>
        u.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">

            {/* Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search users..."
                        className="pl-10 bg-zinc-900/50 border-white/10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={fetchUsers} disabled={loading} className="border-white/10">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Refresh'}
                    </Button>
                    {canManageRoles && <InviteUserDialog onInviteSent={fetchUsers} />}
                </div>
            </div>

            {/* CSV Import/Export */}
            {canManageRoles && (
                <CSVImportExport />
            )}

            {/* Users Table */}
            <div className="rounded-xl border border-white/5 bg-zinc-900/30 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/5 hover:bg-white/5">
                            <TableHead className="text-zinc-400">User</TableHead>
                            <TableHead className="text-zinc-400">Role</TableHead>
                            <TableHead className="text-zinc-400">Status</TableHead>
                            <TableHead className="text-right text-zinc-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-zinc-500 py-8">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                                    Loading users...
                                </TableCell>
                            </TableRow>
                        ) : filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-zinc-500 py-8">
                                    No users found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user.user_id} className="border-white/5 hover:bg-white/5">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            {user.avatar_url ? (
                                                <img src={user.avatar_url} alt="" className="w-8 h-8 rounded-full" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold">
                                                    {user.email?.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <div>
                                                <div className="text-sm">{user.email}</div>
                                                <div className="text-xs text-zinc-500 font-mono">{user.user_id.substring(0, 8)}...</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {canManageRoles && user.role !== 'owner' ? (
                                            <Select
                                                defaultValue={user.role}
                                                onValueChange={(val) => handleRoleUpdate(user.user_id, val as AppRole)}
                                            >
                                                <SelectTrigger className="w-32 bg-zinc-900/50 border-white/10">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                    <SelectItem value="manager">Manager</SelectItem>
                                                    <SelectItem value="editor">Editor</SelectItem>
                                                    <SelectItem value="user">User</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                                                {user.role}
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {user.is_suspended ? (
                                            <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                                                Suspended
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                                                Active
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {canManageRoles && user.role !== 'owner' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleSuspension(user)}
                                                className={user.is_suspended ? "text-green-400 hover:text-green-300" : "text-orange-400 hover:text-orange-300"}
                                            >
                                                {user.is_suspended ? (
                                                    <>
                                                        <ShieldCheck className="h-4 w-4 mr-2" />
                                                        Unsuspend
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShieldOff className="h-4 w-4 mr-2" />
                                                        Suspend
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="text-xs text-zinc-500 text-center">
                Showing {filteredUsers.length} of {users.length} total users
            </div>
        </div>
    );
};
