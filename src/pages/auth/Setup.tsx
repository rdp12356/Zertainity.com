import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ChevronRight, User, Shield, Briefcase, Sparkles, ArrowRight } from "lucide-react";

const Setup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string>("user");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/auth'); return; }

      // Fetch role
      const { data: roles } = await supabase.from('user_roles').select('role').eq('user_id', session.user.id).maybeSingle();
      if (roles) setRole(roles.role);
    };
    checkUser();
  }, [navigate]);

  const handleContinue = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      // Simulate setup completion
      setTimeout(() => {
        setLoading(false);
        setCompleted(true);
        setTimeout(() => navigate('/'), 1500);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-black' : 'bg-gray-100'}`}></div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-6"
        >
          {step === 1 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-black text-white rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-black/10">
                <Sparkles className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Zertainity</h1>
                <p className="text-gray-500">Let's set up your personalized experience in just a few steps.</p>
              </div>
              <Button onClick={handleContinue} className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-xl font-bold">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Confirm your Role</h2>
                <p className="text-gray-500">We've detected your account type.</p>
              </div>

              <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm">
                  {role === 'admin' || role === 'owner' ? <Shield className="w-6 h-6 text-black" /> : <User className="w-6 h-6 text-black" />}
                </div>
                <div className="text-left">
                  <h3 className="font-bold capitalize">{role} Account</h3>
                  <p className="text-xs text-gray-500">Full access to {role === 'user' ? 'student' : 'administrative'} features</p>
                </div>
                <div className="ml-auto">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <Button onClick={handleContinue} className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-xl font-bold">
                Confirm & Continue
              </Button>
            </div>
          )}

          {step === 3 && !completed && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Finalizing Setup</h2>
                <p className="text-gray-500">We are preparing your dashboard.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Check className="w-3 h-3" /></div>
                  <span className="font-medium text-gray-700">Account Verified</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Check className="w-3 h-3" /></div>
                  <span className="font-medium text-gray-700">Role Assigned</span>
                </div>
                <div className="flex items-center gap-3 p-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center animate-pulse"><div className="w-2 h-2 bg-gray-400 rounded-full"></div></div>
                  <span className="font-medium text-gray-700">Generating Workspace...</span>
                </div>
              </div>

              <Button onClick={handleContinue} disabled={loading} className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-xl font-bold flex items-center justify-center gap-2">
                {loading ? 'Finishing...' : 'Complete Setup'}
              </Button>
            </div>
          )}

          {completed && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/20 animate-scale-in">
                <Check className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">You're all set!</h1>
                <p className="text-gray-500">Redirecting to your dashboard...</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Setup;
