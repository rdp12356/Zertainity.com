import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User, ArrowLeft, Save, Loader2, Camera } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    const [profile, setProfile] = useState({
        avatar_url: "",
        phone_number: "",
        bio: "",
        location: "",
        date_of_birth: ""
    });

    useEffect(() => {
        const loadProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/auth');
                return;
            }

            setUserId(user.id);

            const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', user.id)
                .maybeSingle();

            if (data) {
                setProfile({
                    avatar_url: data.avatar_url || "",
                    phone_number: data.phone_number || "",
                    bio: data.bio || "",
                    location: data.location || "",
                    date_of_birth: data.date_of_birth || ""
                });
            }

            setLoading(false);
        };

        loadProfile();
    }, [navigate]);

    const handleSave = async () => {
        if (!userId) return;

        setSaving(true);
        try {
            const { error } = await supabase
                .from('user_profiles')
                .upsert({
                    id: userId,
                    ...profile,
                    updated_at: new Date().toISOString()
                });

            if (error) throw error;

            toast({
                title: "Profile Updated",
                description: "Your profile has been saved successfully.",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050507] flex items-center justify-center text-white">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050507] text-white font-sans p-6">

            {/* Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-3xl mx-auto relative z-10">

                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/")}
                        className="mb-4 text-zinc-400 hover:text-white"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                    <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
                    <p className="text-zinc-400">Manage your personal information and preferences</p>
                </div>

                {/* Profile Card */}
                <Card className="bg-[#111113]/60 border-white/5 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-400" />
                            Personal Information
                        </CardTitle>
                        <CardDescription>Update your profile details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* Avatar */}
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                {profile.avatar_url ? (
                                    <img
                                        src={profile.avatar_url}
                                        alt="Avatar"
                                        className="w-24 h-24 rounded-full object-cover border-2 border-white/10"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-bold border-2 border-white/10">
                                        {userId?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors">
                                    <Camera className="h-4 w-4 text-white" />
                                </button>
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="avatar_url">Avatar URL</Label>
                                <Input
                                    id="avatar_url"
                                    placeholder="https://example.com/avatar.jpg"
                                    value={profile.avatar_url}
                                    onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                                    className="mt-2 bg-zinc-900/50 border-white/10"
                                />
                                <p className="text-xs text-zinc-500 mt-1">Enter a URL to your profile picture</p>
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                value={profile.phone_number}
                                onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                                className="bg-zinc-900/50 border-white/10"
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                placeholder="San Francisco, CA"
                                value={profile.location}
                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                className="bg-zinc-900/50 border-white/10"
                            />
                        </div>

                        {/* Date of Birth */}
                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input
                                id="dob"
                                type="date"
                                value={profile.date_of_birth}
                                onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
                                className="bg-zinc-900/50 border-white/10"
                            />
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                placeholder="Tell us about yourself..."
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                rows={4}
                                className="bg-zinc-900/50 border-white/10 resize-none"
                            />
                            <p className="text-xs text-zinc-500">{profile.bio.length} / 500 characters</p>
                        </div>

                        {/* Save Button */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 h-11"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/")}
                                className="border-white/10 hover:bg-white/5"
                            >
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
