import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Search, Lock, Map, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePermission } from "@/hooks/usePermission";
import { Alert, AlertDescription } from "@/components/ui/alert";

// ... [Keep careerPathways constant exactly as is] ...
// (Omitting large constant for brevity, assuming it remains unchanged)
const careerPathways: Record<string, any[]> = {
  // Technology Careers
  "Software Engineer": [
    { phase: "School", title: "Foundation (Class 6-10)", duration: "5 years", description: "Focus on Mathematics, Science, and basic computer skills", requirements: ["Strong math foundation", "Logical thinking", "Computer basics"] },
    { phase: "School", title: "Higher Secondary (Class 11-12)", duration: "2 years", description: "Take PCM stream with Computer Science", requirements: ["Min 75% in PCM", "Learn programming basics (Python/Java)", "Participate in coding competitions"] },
    { phase: "College", title: "B.Tech Computer Science", duration: "4 years", description: "Engineering degree from recognized university", requirements: ["Clear JEE Main/Advanced", "Build projects & portfolio", "Internships", "DSA mastery"] },
    { phase: "Career", title: "Junior Developer → Senior Engineer", duration: "5+ years", description: "Start as junior developer, progress to senior roles", requirements: ["Strong coding skills", "System design knowledge", "Continuous learning", "Certifications"] }
  ],
  // ... [Other careers] ...
  "Doctor (MBBS)": [
    { phase: "School", title: "Foundation", duration: "5 years", description: "Strong foundation in all subjects, especially Science", requirements: ["Excellence in all subjects", "Science focus", "Biology interest"] },
    { phase: "School", title: "Class 11-12 (PCB)", duration: "2 years", description: "Physics, Chemistry, Biology with high marks", requirements: ["Min 90%+ in PCB", "NEET preparation", "Medical aptitude"] },
    { phase: "College", title: "MBBS", duration: "5.5 years", description: "Medical degree including 1 year internship", requirements: ["Clear NEET with high rank", "Dedication", "Empathy", "Long study hours"] },
    { phase: "Career", title: "PG/Practice", duration: "Lifetime", description: "MD/MS specialization or medical practice", requirements: ["NEET PG for specialization", "Clinical experience", "Continuous learning", "Patient care"] }
  ],
  "Default": [
    { phase: "School", title: "Foundation Years", duration: "5 years", description: "Build strong academic foundation in relevant subjects", requirements: ["Good academic record", "Subject interest", "Extracurricular activities"] },
    { phase: "School", title: "Higher Secondary", duration: "2 years", description: "Choose appropriate stream based on career goal", requirements: ["Relevant stream selection", "60%+ marks", "Entrance exam preparation"] },
    { phase: "College", title: "Undergraduate Degree", duration: "3-4 years", description: "Complete relevant bachelor's degree", requirements: ["Clear entrance exams", "Good GPA", "Internships", "Skill development"] },
    { phase: "Career", title: "Entry & Growth", duration: "Ongoing", description: "Start career and progress professionally", requirements: ["Entry-level job", "Certifications", "Experience", "Networking"] }
  ]
};

const Pathways = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCareer, setSelectedCareer] = useState<string | null>(
    location.state?.career || null
  );
  const { hasPermission, isLoading, userRole } = usePermission('edit_pathways');

  const availableCareers = Object.keys(careerPathways).filter(c => c !== "Default");
  const filteredCareers = availableCareers.filter(career =>
    career.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedPath = selectedCareer
    ? (careerPathways[selectedCareer] || careerPathways["Default"])
    : null;

  if (isLoading) return <div className="text-white text-center p-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-purple-500/30 text-white relative">

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <header className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
          <Button variant="ghost" className="text-zinc-400 hover:text-white" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Home
          </Button>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Map className="h-6 w-6 text-blue-400" /> Career Roadmap
          </h1>
        </header>

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar: Search & List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Search (e.g., Doctor)"
                className="pl-10 bg-white/5 border-white/10 text-white focus:bg-white/10 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="glass-panel rounded-xl overflow-hidden max-h-[600px] overflow-y-auto border-white/5 bg-zinc-900/50">
              {filteredCareers.length === 0 && <div className="p-4 text-zinc-500 text-sm text-center">No careers found</div>}
              {filteredCareers.map(career => (
                <button
                  key={career}
                  onClick={() => setSelectedCareer(career)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-white/5 transition-colors hover:bg-white/5 
                       ${selectedCareer === career ? 'bg-blue-500/20 text-blue-300 border-l-2 border-l-blue-500' : 'text-zinc-300'}`}
                >
                  {career}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content: Roadmap */}
          <div className="lg:col-span-3">
            {selectedPath ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                    {selectedCareer}
                  </h2>
                  <p className="text-zinc-400">Complete execution plan from 0 to 1.</p>
                </div>

                <div className="relative border-l-2 border-white/10 ml-4 md:ml-8 space-y-12 pb-12">
                  {selectedPath.map((step: any, index: number) => (
                    <div key={index} className="relative pl-8 md:pl-12 group">
                      {/* Timeline Node */}
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-950 border-2 border-blue-500 group-hover:bg-blue-500 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.6)] transition-all duration-300"></div>

                      <div className="glass-panel p-6 rounded-2xl border-white/5 bg-zinc-900/40 hover:bg-zinc-800/60 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                            <Badge variant="outline" className="border-blue-500/30 text-blue-300 bg-blue-500/10 hover:bg-blue-500/20">
                              {step.phase}
                            </Badge>
                          </div>
                          <div className="flex items-center text-zinc-500 text-sm gap-1 bg-white/5 px-3 py-1 rounded-full">
                            <Clock className="h-3 w-3" /> {step.duration}
                          </div>
                        </div>

                        <p className="text-zinc-300 mb-4 leading-relaxed">{step.description}</p>

                        <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Key Milestones</h4>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {step.requirements.map((req: string, i: number) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 shrink-0"></div>
                                {req}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 border-2 border-dashed border-white/10 rounded-2xl p-12 bg-white/5">
                <Map className="h-16 w-16 mb-4 opacity-20" />
                <p className="text-xl font-medium">Select a career path to view the roadmap</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pathways;
