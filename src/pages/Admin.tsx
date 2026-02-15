import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Database,
  Settings,
  LogOut,
  Briefcase,
  FileText,
  Menu
} from "lucide-react";
import { UserManagement } from "@/components/admin/UserManagement";
import { DataManagement } from "@/components/admin/DataManagement";
import { SystemSettings } from "@/components/admin/SystemSettings";
import { JobOpportunities } from "@/components/admin/JobOpportunities";
import { AuditLogViewer } from "@/components/admin/AuditLogViewer";
import { Input } from "@/components/ui/input";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (roles) setRole(roles.role);
      else setRole('user');
      setLoading(false);
    };
    checkUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center text-zinc-500">
        Loading Workspace...
      </div>
    );
  }

  if (!role || role === 'user') {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-2">Restricted Access</h2>
          <p className="text-zinc-500 mb-6">This area is reserved for administrators.</p>
          <Button onClick={() => navigate("/")} variant="secondary" className="rounded-full">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: "users", label: "User Management", icon: Users, roleReq: ['owner', 'admin'] },
    { id: "data", label: "Data Management", icon: Database },
    { id: "jobs", label: "Job Opportunities", icon: Briefcase },
    { id: "audit", label: "Audit Logs", icon: FileText, roleReq: ['owner', 'admin'] },
    { id: "settings", label: "System Settings", icon: Settings, roleReq: ['owner'] },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-[#0A0A0C]/80 backdrop-blur-xl border-r border-white/5">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <div>
            <h1 className="font-semibold text-white leading-none">Console</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 font-medium">{role}</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            if (item.roleReq && !item.roleReq.includes(role!)) return null;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 
                  ${activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/5">
        <Button
          variant="ghost"
          className="w-full justify-start text-zinc-500 hover:text-red-400 hover:bg-red-500/5 px-2"
          onClick={() => supabase.auth.signOut().then(() => navigate("/auth"))}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050507] flex font-sans text-white overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Sidebar */}
      <aside className="hidden md:block w-64 fixed inset-y-0 z-20">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 md:p-12 relative overflow-y-auto h-screen scrollbar-hide">
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">

          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold">
                {menuItems.find(i => i.id === activeTab)?.label}
              </h1>
            </div>
          </header>

          {/* Panel Content */}
          <div className="glass-panel bg-[#111113]/40 border border-white/5 rounded-[24px] p-8 min-h-[600px] backdrop-blur-xl">
            {activeTab === 'users' && <UserManagement currentUserRole={role} />}
            {activeTab === 'data' && <DataManagement currentUserRole={role} />}
            {activeTab === 'jobs' && <JobOpportunities />}
            {activeTab === 'audit' && <AuditLogViewer />}
            {activeTab === 'settings' && <SystemSettings role={role} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
