import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, BarChart, Map, GraduationCap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col selection:bg-black selection:text-white">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-lg shadow-lg shadow-black/10">
              <span className="text-xl font-bold">∞</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-black">Zertainity</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="text-sm font-medium text-black hover:opacity-70 transition-opacity cursor-pointer" onClick={() => navigate("/auth")}>Login</a>
            <Button
              onClick={() => navigate("/education-level")}
              className="bg-black text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-16">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center py-24 md:py-32 px-6 text-center max-w-5xl mx-auto overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-50 to-purple-50 rounded-full blur-[100px] -z-10 opacity-60"></div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-600 mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Version 2.0 is now live</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-6 max-w-4xl leading-[1.1]">
            Navigate your future <br className="hidden md:block" /> with certainty.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mb-10 font-normal leading-relaxed">
            Harness the power of AI to analyze your strengths, interests, and potential. Make data-driven career decisions without the guesswork.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-10">
            <Button
              onClick={() => navigate("/education-level")}
              className="bg-black text-white px-8 py-6 rounded-xl text-lg font-bold hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20 flex items-center gap-2"
            >
              Start Assessment <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => navigate("/careers")}
              variant="outline"
              className="bg-white text-black border border-gray-200 px-8 py-6 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all hover:border-gray-300"
            >
              Explore Careers
            </Button>
          </div>

          {/* Demo Card / Visual */}
          <div className="mt-20 w-full max-w-4xl bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-slate-50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>

            <div className="p-2 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
              <div className="flex gap-1.5 ml-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/50"></div>
              </div>
              <div className="mx-auto bg-white border border-gray-200 rounded-md px-3 py-0.5 text-[10px] text-gray-400 font-medium font-mono">
                zertainity.com/dashboard
              </div>
            </div>

            <div className="p-8 md:p-12 bg-white">
              <div className="grid md:grid-cols-3 gap-8 text-left">
                {/* Card 1 */}
                <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    <BarChart className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">98% Match</h3>
                  <p className="text-sm text-gray-500">Software Engineering based on your logic scores.</p>
                </div>
                {/* Card 2 */}
                <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-6">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                    <Map className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Clear Roadmap</h3>
                  <p className="text-sm text-gray-500">Step-by-step path from Grade 12 to your first job.</p>
                </div>
                {/* Card 3 */}
                <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-6">
                  <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-4">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Top Colleges</h3>
                  <p className="text-sm text-gray-500">Curated list of institutes matching your profile.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4">
                Precision guidance.
              </h2>
              <p className="text-lg text-gray-500">
                Our algorithms don't just guess. They understand your academic history, cognitive patterns, and personal aspirations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BarChart className="w-6 h-6 text-black" />,
                  title: "Deep Analysis",
                  desc: "Comprehensive evaluation of your academic performance and extracurricular achievements."
                },
                {
                  icon: <Map className="w-6 h-6 text-black" />,
                  title: "Custom Roadmaps",
                  desc: "Get a tailored step-by-step plan for your next 5 years, including course recommendations."
                },
                {
                  icon: <GraduationCap className="w-6 h-6 text-black" />,
                  title: "Institute Matching",
                  desc: "Connect with universities and colleges that perfectly align with your career goals."
                }
              ].map((feature, i) => (
                <div key={i} className="group p-8 rounded-2xl border border-gray-200 bg-white hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-300 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-black group-hover:text-white group-hover:border-black">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-6 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight text-black mb-6">
                Designed for clarity in a complex world.
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Choosing a career path is one of the most significant decisions you will make. We bring scientific rigor to the process.
              </p>
              <ul className="space-y-4">
                {[
                  "AI-driven psychometric assessment",
                  "Real-time job market trend analysis",
                  "Personalized mentorship matching"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-5 h-5 text-black" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:-translate-y-1 transition-transform duration-300">
                <div className="text-4xl font-bold text-black mb-1">50k+</div>
                <div className="text-sm text-gray-500 font-medium">Students Guided</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:-translate-y-1 transition-transform duration-300">
                <div className="text-4xl font-bold text-black mb-1">94%</div>
                <div className="text-sm text-gray-500 font-medium">Placement Rate</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 col-span-2 hover:-translate-y-1 transition-transform duration-300">
                <div className="text-4xl font-bold text-black mb-1">1200+</div>
                <div className="text-sm text-gray-500 font-medium">Partner Universities & Companies</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-gray-50 to-white rounded-full blur-[100px] -z-10"></div>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
              Ready to define your path?
            </h2>
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
              Join thousands of students who found their true calling with Zertainity. Start your free assessment today.
            </p>
            <Button
              onClick={() => navigate("/education-level")}
              className="bg-black text-white px-10 py-6 rounded-xl text-lg font-bold hover:bg-gray-800 transition-colors shadow-xl shadow-black/20"
            >
              Get Started Free
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">∞</span>
            <span className="font-bold text-black">Zertainity</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2026 Zertainity Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a className="text-gray-400 hover:text-black transition-colors cursor-pointer text-sm font-medium">Twitter</a>
            <a className="text-gray-400 hover:text-black transition-colors cursor-pointer text-sm font-medium">LinkedIn</a>
            <a className="text-gray-400 hover:text-black transition-colors cursor-pointer text-sm font-medium">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
