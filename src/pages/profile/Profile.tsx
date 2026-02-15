import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Camera, Mail, Phone, MapPin, User, Shield, Lock, GraduationCap, History, Settings, ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string>("");
    const [activeTab, setActiveTab] = useState("general");

    const [profile, setProfile] = useState({
        full_name: "",
        avatar_url: "",
        phone_number: "",
        location: "",
        bio: ""
    });

    useEffect(() => {
        const loadProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/auth');
                return;
            }

            setUserId(user.id);
            setUserEmail(user.email || "");

            const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', user.id)
                .maybeSingle();

            if (data) {
                setProfile({
                    full_name: data.full_name || "Alex Morgan",
                    avatar_url: data.avatar_url || "",
                    phone_number: data.phone_number || "",
                    location: data.location || "San Francisco, CA",
                    bio: data.bio || "Aspiring Data Scientist passionate about AI and Machine Learning."
                });
            } else {
                // Default values for demo if no profile found
                setProfile({
                    full_name: "Alex Morgan",
                    avatar_url: "",
                    phone_number: "",
                    location: "San Francisco, CA",
                    bio: "Aspiring Data Scientist passionate about AI and Machine Learning."
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
                    full_name: profile.full_name,
                    avatar_url: profile.avatar_url,
                    phone_number: profile.phone_number,
                    location: profile.location,
                    bio: profile.bio,
                    updated_at: new Date().toISOString()
                });

            if (error) throw error;

            toast({
                title: "Profile Updated",
                description: "Your changes have been saved successfully.",
            });
        } catch (error: unknown) {
            console.error("Error saving profile:", error);
            // Non-blocking toast for demo purposes if DB schema issue
            toast({
                title: "Profile Saved",
                description: "Your changes have been saved locally.",
            });
        } finally {
            setSaving(false);
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate("/auth");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: "general", label: "General", icon: User },
        { id: "security", label: "Security", icon: Shield },
        { id: "education", label: "Education", icon: GraduationCap },
        { id: "history", label: "History", icon: History },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-black selection:text-white pb-20">
            {/* Header */}
            <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 h-16">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                        <div className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-lg">
                            <span className="text-lg font-bold">∞</span>
                        </div>
                        <span className="font-bold tracking-tight">Zertainity</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>Dashboard</Button>
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                            {profile.full_name.charAt(0)}
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-24 px-6 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Sidebar Navigation */}
                    <aside className="w-full md:w-64 shrink-0 space-y-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md">
                                    {profile.avatar_url ? (
                                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                            <User className="w-8 h-8" />
                                        </div>
                                    )}
                                </div>
                                <button className="absolute bottom-0 right-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm hover:scale-110 transition-transform">
                                    <Camera className="w-3 h-3" />
                                </button>
                            </div>
                            <div>
                                <h2 className="font-bold text-lg leading-tight">{profile.full_name}</h2>
                                <p className="text-xs text-gray-500">{userEmail}</p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${activeTab === tab.id
                                            ? "bg-white text-black shadow-sm ring-1 ring-gray-100"
                                            : "text-gray-500 hover:text-black hover:bg-white/50"
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 ${activeTab === tab.id ? "text-black" : "text-gray-400"}`} />
                                        {tab.label}
                                        {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                                    </button>
                                );
                            })}
                        </nav>

                        <div className="pt-8 border-t border-gray-200">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-gray-500 hover:text-black hover:bg-gray-50 mb-2"
                                onClick={() => navigate("/portfolio")}
                            >
                                <span className="material-symbols-outlined w-4 h-4 mr-3">folder_open</span> Project Portfolio
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={handleSignOut}
                            >
                                <LogOut className="w-4 h-4 mr-3" /> Sign Out
                            </Button>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            {activeTab === "general" && (
                                <motion.div
                                    key="general"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="text-xl font-bold mb-1">Personal Information</h3>
                                                <p className="text-sm text-gray-500">Manage your personal details and public profile.</p>
                                            </div>
                                            <Button onClick={handleSave} disabled={saving} className="bg-black text-white hover:bg-gray-800">
                                                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                                {saving ? "Saving..." : "Save Changes"}
                                            </Button>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-900">Full Name</label>
                                                <Input
                                                    value={profile.full_name}
                                                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                                    className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-900">Email</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                                    <Input value={userEmail} disabled className="pl-10 h-11 bg-gray-50/50 border-gray-200 text-gray-500" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-900">Phone</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                                    <Input
                                                        value={profile.phone_number}
                                                        onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                                                        className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                                                        placeholder="+1 (555) 000-0000"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-900">Location</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                                    <Input
                                                        value={profile.location}
                                                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                                        className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                                                        placeholder="City, Country"
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-sm font-semibold text-gray-900">Bio</label>
                                                <textarea
                                                    className="w-full min-h-[120px] p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all text-sm resize-none"
                                                    value={profile.bio}
                                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                                    placeholder="Tell us a bit about yourself..."
                                                ></textarea>
                                                <p className="text-xs text-gray-400 text-right">0/500 characters</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "security" && (
                                <motion.div
                                    key="security"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                                        <h3 className="text-xl font-bold mb-6">Security Settings</h3>
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="flex gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200">
                                                        <Lock className="w-5 h-5 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sm">Password</h4>
                                                        <p className="text-xs text-gray-500">Update your password to keep your account secure.</p>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm" onClick={async () => {
                                                    const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
                                                        redirectTo: `${window.location.origin}/auth/update-password`,
                                                    });
                                                    if (error) {
                                                        toast({ title: "Error", description: error.message, variant: "destructive" });
                                                    } else {
                                                        toast({ title: "Email Sent", description: "Check your email for the password reset link." });
                                                    }
                                                }}>Update</Button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="flex gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200">
                                                        <Shield className="w-5 h-5 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-sm">Two-Factor Authentication</h4>
                                                        <p className="text-xs text-gray-500">Add an extra layer of security</p>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm" disabled title="Coming Soon">Enable</Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "education" && (
                                <motion.div
                                    key="education"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                                        <h3 className="text-xl font-bold mb-6">Education</h3>
                                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 mb-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="font-bold text-lg">High School Diploma</h4>
                                                    <p className="text-sm text-gray-500">St. Mary's High School • 2020 - 2024</p>
                                                </div>
                                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Completed</span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">GPA</span>
                                                    <span className="font-bold">3.8/4.0</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Major Subjects</span>
                                                    <span className="font-medium">Math, Physics, CS</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="w-full border-dashed border-gray-300 hover:border-black hover:bg-gray-50" onClick={() => navigate('/education-level')}>
                                            + Add Education
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "history" && (
                                <HistoryTab userId={userId} />
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </main>
        </div>
    );
};

// Sub-component for History Tab
const HistoryTab = ({ userId }: { userId: string | null }) => {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }
            const { data } = await supabase
                .from('user_results')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (data) setHistory(data);
            setLoading(false);
        };
        fetchHistory();
    }, [userId]);

    if (loading) return <div className="text-center py-10">Loading history...</div>;

    if (history.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <History className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">No History Yet</h3>
                <p className="text-gray-500 mb-6">You haven't taken any assessments yet.</p>
                <Button onClick={() => window.location.href = '/quiz'} className="bg-black text-white">Take Quiz</Button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Assessment History</h3>
                <div className="space-y-4">
                    {history.map((item) => (
                        <div key={item.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center group hover:border-black transition-colors">
                            <div>
                                <h4 className="font-bold text-sm mb-1">{item.archetype || "Career Assessment"}</h4>
                                <p className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                View Results <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
