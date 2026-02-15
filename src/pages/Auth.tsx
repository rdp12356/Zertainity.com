import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, ArrowRight, Loader2 } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/");
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate("/");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleEmailAuth = async (isSignUp: boolean) => {
    if (!email || !password) {
      toast({ title: "Incomplete", description: "Please enter both email and password.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { first_name: firstName, last_name: lastName } },
        });
        if (error) throw error;
        toast({ title: "Account created!", description: "Check your email to confirm." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (error: any) {
      toast({ title: "Authentication Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#050507] text-white overflow-hidden">

      {/* Left: Brand / Hero (Hidden on Mobile) */}
      <div className="relative hidden lg:flex flex-col justify-between p-16 bg-[#0A0A0C] border-r border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[30%] left-[20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-20">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Zertainity</span>
          </div>

          <h1 className="text-6xl font-semibold tracking-tighter leading-[1.1] mb-6">
            Welcome to <br />
            the future.
          </h1>
          <p className="text-xl text-zinc-400 max-w-sm leading-relaxed">
            Your entire career journey, optimized by intelligence.
          </p>
        </div>

        <div className="relative z-10 text-sm text-zinc-600 font-medium">
          © 2025 Zertainity Inc.
        </div>
      </div>

      {/* Right: Login Form (Apple ID Style) */}
      <div className="flex flex-col justify-center items-center p-8 bg-[#050507]">
        <div className="w-full max-w-[380px] animate-in fade-in slide-in-from-bottom-8 duration-700">

          <div className="text-center mb-10 lg:hidden block">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-6 w-6 text-black" />
            </div>
            <h1 className="text-2xl font-semibold">Zertainity</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">Sign In</h2>
            <p className="text-zinc-500 mt-2 text-sm">Use your Zertainity ID to continue.</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-zinc-900 border border-white/5 rounded-lg p-1">
              <TabsTrigger value="login" className="rounded-[6px] text-zinc-400 data-[state=active]:bg-[#1A1A1C] data-[state=active]:text-white">Log In</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-[6px] text-zinc-400 data-[state=active]:bg-[#1A1A1C] data-[state=active]:text-white">Create ID</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-zinc-900/50 border-white/10 rounded-xl text-base px-4 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-zinc-900/50 border-white/10 rounded-xl text-base px-4 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
                <Button
                  className="w-full h-12 rounded-xl bg-white text-black hover:bg-zinc-200 font-medium text-base transition-all"
                  onClick={() => handleEmailAuth(false)}
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight className="ml-2 h-4 w-4" /></>}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-12 bg-zinc-900/50 border-white/10 rounded-xl" />
                <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-12 bg-zinc-900/50 border-white/10 rounded-xl" />
              </div>
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 bg-zinc-900/50 border-white/10 rounded-xl" />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 bg-zinc-900/50 border-white/10 rounded-xl" />
              <Button
                className="w-full h-12 rounded-xl bg-blue-600 text-white hover:bg-blue-500 font-medium text-base transition-all"
                onClick={() => handleEmailAuth(true)}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create Zertainity ID"}
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center text-xs text-zinc-600">
            Protected by Zertainity Secure Auth. <br />
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Forgot Password?</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Auth;
