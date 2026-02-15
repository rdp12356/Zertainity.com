import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Loader2, Mail } from "lucide-react";
import { logActivity } from "@/lib/permissions";

export const InviteUserDialog = ({ onInviteSent }: { onInviteSent?: () => void }) => {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<string>("user");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleInvite = async () => {
        if (!email || !email.includes('@')) {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            // For now, we'll create a simple invitation record in audit_logs
            // In production, you'd use an edge function to send actual emails

            const { data: { user } } = await supabase.auth.getUser();

            await supabase.from('audit_logs').insert({
                user_id: user?.id,
                action: 'invite_user',
                details: {
                    invited_email: email,
                    role: role,
                    first_name: firstName,
                    last_name: lastName,
                    invited_at: new Date().toISOString()
                }
            });

            // Log the activity
            await logActivity('invite_user', { email, role });

            toast({
                title: "Invitation Sent",
                description: `Invitation sent to ${email} with role: ${role}`,
            });

            // Reset form
            setEmail("");
            setRole("user");
            setFirstName("");
            setLastName("");
            setOpen(false);

            if (onInviteSent) onInviteSent();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#111113] border-white/10">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-blue-400" />
                        Invite New User
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Send an invitation to join Zertainity with a specific role.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                placeholder="John"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-zinc-900/50 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                placeholder="Doe"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-zinc-900/50 border-white/10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-zinc-900/50 border-white/10"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Role *</Label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger className="bg-zinc-900/50 border-white/10">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-zinc-500">
                            {role === 'user' && 'Basic access to take quizzes and view results'}
                            {role === 'editor' && 'Can edit careers, colleges, and schools'}
                            {role === 'manager' && 'Editor permissions + view audit logs'}
                            {role === 'admin' && 'Full access except owner-only features'}
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={loading} className="border-white/10">
                        Cancel
                    </Button>
                    <Button onClick={handleInvite} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Invitation
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
