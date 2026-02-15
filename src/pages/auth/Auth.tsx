import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, ArrowRight, Loader2, PlayCircle } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate(from, { replace: true });
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate(from, { replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate, from]);

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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Authentication Failed";
      toast({ title: "Authentication Failed", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Google Login Failed";
      toast({ title: "Google Login Failed", description: message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white text-gray-900 overflow-hidden font-sans">

      {/* Left: Brand / Hero (Hidden on Mobile) */}
      <div className="relative hidden lg:flex flex-col justify-between p-16 bg-gray-50 border-r border-gray-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-purple-100/50 rounded-full blur-[100px] animate-pulse delay-1000"></div>
          {/* Abstract Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-lg shadow-black/10">
              <span className="text-xl font-bold">∞</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-black">Zertainity</span>
          </div>

          <div className="space-y-6 max-w-lg">
            <h1 className="text-5xl font-bold tracking-tight leading-[1.1] text-black">
              Unlock your <br />
              true potential.
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed font-normal">
              Join thousands of students discovering their perfect career path with our AI-driven guidance platform.
            </p>
          </div>

          {/* Testimonial / Social Proof */}
          <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl shadow-sm max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                ))}
              </div>
              <div className="text-sm font-medium text-gray-600">
                <span className="text-black font-bold">50k+</span> students guided
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="flex text-yellow-400">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span>4.9/5 Average Rating</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-sm text-gray-400 font-medium">
          <span>© 2026 Zertainity Inc.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">

          <div className="text-center mb-10 lg:hidden block">
            <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/10">
              <span className="text-2xl font-bold">∞</span>
            </div>
            <h1 className="text-2xl font-bold text-black">Zertainity</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Welcome back</h2>
            <p className="text-gray-500 mt-2 text-sm">Enter your details to access your account.</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100/50 p-1 rounded-xl">
              <TabsTrigger
                value="login"
                className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm transition-all"
              >
                Log In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm transition-all"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <div className="space-y-3 mb-6">
              <Button
                variant="outline"
                className="w-full h-11 rounded-xl border-gray-200 hover:bg-gray-50 hover:text-black font-medium text-gray-700 justify-center gap-3 transition-colors bg-white"
                onClick={handleGoogleLogin}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M12.0003 20.45c4.656 0 8.557-3.23 9.972-7.55H12v-4.09h12.564c.168.85.27 1.77.27 2.76 0 7.22-4.83 12.33-12.834 12.33-7.24 0-13.064-5.91-13.064-13.2 0-7.29 5.824-13.2 13.064-13.2 3.486 0 6.57 1.29 8.94 3.48l-3.35 3.25c-1.35-1.26-3.39-2.22-5.59-2.22-4.89 0-8.99 3.86-8.99 8.69 0 4.83 4.1 8.69 8.99 8.69z"
                    fill="currentColor"
                  />
                </svg>
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 rounded-xl border-gray-200 hover:bg-gray-50 hover:text-black font-medium text-gray-700 justify-center gap-3 transition-colors bg-white"
                onClick={() => toast({ title: "Coming Soon", description: "GitHub login is under development." })}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Continue with GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 rounded-xl border-gray-200 hover:bg-gray-50 hover:text-black font-medium text-gray-700 justify-center gap-3 transition-colors bg-white"
                onClick={() => toast({ title: "Coming Soon", description: "Microsoft login is under development." })}
              >
                <svg viewBox="0 0 23 23" className="h-5 w-5" fill="currentColor">
                  <path d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z" />
                </svg>
                Continue with Microsoft
              </Button>
              <div className="relative pt-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-100" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-white px-2 text-gray-400 font-medium tracking-wider">Or continue with email</span>
                </div>
              </div>
            </div>

            <TabsContent value="login" className="space-y-4 focus-visible:outline-none">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login" className="text-gray-700 font-medium text-sm ml-1">Email</Label>
                  <Input
                    id="email-login"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 bg-gray-50 border-gray-200 rounded-xl text-base px-4 focus:bg-white focus:border-black focus:ring-0 transition-all placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-login" className="text-gray-700 font-medium text-sm ml-1">Password</Label>
                    <a href="#" className="text-xs text-gray-500 hover:text-black font-medium transition-colors">Forgot?</a>
                  </div>
                  <Input
                    id="password-login"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 bg-gray-50 border-gray-200 rounded-xl text-base px-4 focus:bg-white focus:border-black focus:ring-0 transition-all placeholder:text-gray-400"
                  />
                </div>
                <Button
                  className="w-full h-12 rounded-xl bg-black text-white hover:bg-gray-800 font-semibold text-base transition-all shadow-lg shadow-black/5 mt-2"
                  onClick={() => handleEmailAuth(false)}
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 focus-visible:outline-none">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-gray-700 font-medium text-sm ml-1">First Name</Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-11 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-0 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-gray-700 font-medium text-sm ml-1">Last Name</Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-0 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup" className="text-gray-700 font-medium text-sm ml-1">Email</Label>
                <Input
                  id="email-signup"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-0 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup" className="text-gray-700 font-medium text-sm ml-1">Password</Label>
                <Input
                  id="password-signup"
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-0 transition-all"
                />
                <p className="text-[10px] text-gray-500 ml-1">Must be at least 8 characters long</p>
              </div>
              <Button
                className="w-full h-12 rounded-xl bg-black text-white hover:bg-gray-800 font-semibold text-base transition-all shadow-lg shadow-black/5 mt-2"
                onClick={() => handleEmailAuth(true)}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
              </Button>
            </TabsContent>
          </Tabs>

          <p className="text-center text-xs text-gray-400 mt-6 font-medium">
            By continuing, you agree to our <a href="#" className="text-gray-600 hover:text-black hover:underline">Terms of Service</a> and <a href="#" className="text-gray-600 hover:text-black hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
