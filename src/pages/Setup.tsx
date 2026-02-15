import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { ShieldCheck, User as UserIcon, LogOut, ArrowLeft, CreditCard } from "lucide-react";

const Setup = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string>("loading...");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { navigate('/auth'); return; }
      setUser(session.user);
      const { data: roles } = await supabase.from('user_roles').select('role').eq('user_id', session.user.id).maybeSingle();
      if (roles) setRole(roles.role); else setRole("user");
    };
    checkUserStatus();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#050507] text-white font-sans">

      <div className="absolute inset-0 bg-blue-900/10 blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-sm">

        {/* Apple Wallet Style Card */}
        <div className="glass-panel relative overflow-hidden rounded-[24px] border border-white/10 bg-[#151517]/60 backdrop-blur-2xl shadow-2xl transition-all hover:scale-[1.02] duration-500">

          <div className="h-32 bg-gradient-to-br from-blue-600 to-purple-600 p-6 flex items-start justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">Zertainity ID</span>
            </div>
            <div className="relative z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="p-8 space-y-8 -mt-6">

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#1A1A1C] border-4 border-[#151517] flex items-center justify-center shadow-lg -mt-16 z-20">
                <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-zinc-800">
                  <span className="text-2xl font-bold">{user?.email?.charAt(0).toUpperCase()}</span>
                </div>
              </div>
              <h2 className="mt-4 text-xl font-semibold tracking-tight">{user?.email?.split('@')[0]}</h2>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{role} Pass</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400"><ShieldCheck className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase font-medium">Clearance</div>
                  <div className="text-sm font-semibold capitalize">{role} Access</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                <div className="p-2 bg-zinc-700/50 rounded-lg text-zinc-400"><CreditCard className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase font-medium">Member Since</div>
                  <div className="text-sm font-semibold">2025</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {(role === 'owner' || role === 'admin') && (
                <Button onClick={() => navigate('/admin')} className="w-full h-11 rounded-xl bg-white text-black hover:bg-zinc-200 font-medium">
                  Open Admin Console
                </Button>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => navigate('/')} variant="outline" className="h-11 rounded-xl border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white">
                  Home
                </Button>
                <Button
                  onClick={() => supabase.auth.signOut().then(() => navigate('/'))}
                  variant="outline"
                  className="h-11 rounded-xl border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/30"
                >
                  Log Out
                </Button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Setup;
