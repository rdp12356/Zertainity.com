import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { careerService } from "@/services/careerService";
import {
  Search,
  Briefcase,
  TrendingUp,
  DollarSign,
  GraduationCap,
  Building2,
  Code,
  User,
  Palette,
  BarChart3,
  FileText,
  Rocket,
  ArrowRight,
  Filter,
  Check,
  LucideIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getIconForTitle = (title: string): LucideIcon => {
  if (title.includes("Designer")) return Palette;
  if (title.includes("Developer") || title.includes("Engineer")) return Code;
  if (title.includes("Manager")) return User;
  if (title.includes("Writer")) return FileText;
  if (title.includes("Analyst") || title.includes("Scientist")) return BarChart3;
  if (title.includes("Researcher")) return Search;
  return Briefcase;
};

const Careers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSalaryRange, setSelectedSalaryRange] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: careers = [], isLoading } = useQuery({
    queryKey: ['careers-list'],
    queryFn: careerService.getAllCareers
  });

  const industries = Array.from(new Set(careers.flatMap(c => c.industries || [])));

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (career.description || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry = !selectedIndustry || (career.industries && career.industries.includes(selectedIndustry));

    let matchesSalary = true;
    if (selectedSalaryRange === "Entry") matchesSalary = career.salary_max <= 80000;
    if (selectedSalaryRange === "Mid") matchesSalary = career.salary_max > 80000 && career.salary_max <= 120000;
    if (selectedSalaryRange === "Senior") matchesSalary = career.salary_max > 120000;

    return matchesSearch && matchesIndustry && matchesSalary;
  });

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white">

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-lg">
              <span className="text-lg font-bold">∞</span>
            </div>
            <span className="font-bold tracking-tight">Zertainity</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-gray-500 hover:text-black transition-colors cursor-pointer" onClick={() => navigate("/pathways")}>Pathways</a>
            <a className="text-sm font-medium text-black cursor-pointer">Careers</a>
            <a className="text-sm font-medium text-gray-500 hover:text-black transition-colors cursor-pointer" onClick={() => navigate("/mentorship")}>Mentorship</a>
            <a className="text-sm font-medium text-gray-500 hover:text-black transition-colors cursor-pointer" onClick={() => navigate("/jobs")}>Jobs</a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="md:hidden" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <Filter className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
              JS
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto w-full">

        {/* Search Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight mb-4"
          >
            Explore Your Future
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 mb-8"
          >
            Discover careers that match your unique profile and interests.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative flex items-center shadow-lg shadow-gray-200/50 rounded-2xl bg-white border border-gray-200"
          >
            <Search className="absolute left-4 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by role, skill, or industry..."
              className="w-full pl-12 pr-4 h-14 border-none text-lg bg-transparent focus-visible:ring-0 placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="border-l border-gray-100 h-8 mx-2"></div>
            <Button
              variant="ghost"
              className="mr-2 text-gray-500 hover:text-black"
              onClick={() => {
                setSelectedIndustry(null);
                setSelectedSalaryRange(null);
              }}
            >
              Reset Filters <Filter className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* Filters & Grid */}
        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 space-y-8 sticky top-24 h-fit">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Industry
              </h3>
              <div className="space-y-2">
                <div
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${!selectedIndustry ? 'bg-black text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                  onClick={() => setSelectedIndustry(null)}
                >
                  <span className="text-sm font-medium">All Industries</span>
                  {!selectedIndustry && <Check className="w-4 h-4" />}
                </div>
                {industries.map((ind) => (
                  <div
                    key={ind}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${selectedIndustry === ind ? 'bg-black text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                    onClick={() => setSelectedIndustry(ind)}
                  >
                    <span className="text-sm font-medium">{ind}</span>
                    {selectedIndustry === ind && <Check className="w-4 h-4" />}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Salary Range
              </h3>
              <div className="space-y-3">
                {["Entry", "Mid", "Senior"].map((range) => (
                  <label key={range} className="flex items-center gap-3 cursor-pointer group" onClick={() => setSelectedSalaryRange(range === selectedSalaryRange ? null : range)}>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedSalaryRange === range ? 'bg-black border-black text-white' : 'border-gray-300 group-hover:border-black'}`}>
                      {selectedSalaryRange === range && <Check className="w-3 h-3" />}
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{range} ({range === 'Entry' ? '$50k+' : range === 'Mid' ? '$80k+' : '$120k+'})</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-medium text-gray-500">
                {isLoading ? "Loading..." : `Showing ${filteredCareers.length} matches`}
              </span>
              <div className="flex gap-2 text-sm text-gray-500">
                Sort by: <span className="text-black font-medium cursor-pointer">Match %</span>
              </div>
            </div>

            <motion.div layout className="grid sm:grid-cols-2 gap-6">
              <AnimatePresence>
                {isLoading ? (
                  <div className="col-span-full py-10 text-center text-gray-500">Loading careers...</div>
                ) : filteredCareers.map((career) => {
                  const Icon = getIconForTitle(career.title);
                  // Mock match percentage - could come from a sophisticated matching algorithm later
                  const matchPercentage = Math.floor(Math.random() * (99 - 80 + 1) + 80);
                  // Create tags from skills (take top 3)
                  const displayTags = (career.skills || []).slice(0, 3);

                  return (
                    <motion.div
                      layout
                      key={career.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="group bg-white rounded-2xl border border-gray-200 hover:border-black hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
                      onClick={() => navigate("/pathways", { state: { career: career.title, slug: career.slug } })}
                    >
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-900 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                            {matchPercentage}% Match
                          </div>
                        </div>

                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{career.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2">
                          {career.summary || career.description || "No description available."}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {displayTags.map(tag => (
                            <span key={tag} className="px-2 py-1 rounded bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center mt-auto">
                        <span className="text-sm font-bold text-gray-900">
                          ${(career.salary_min / 1000).toFixed(0)}k - ${(career.salary_max / 1000).toFixed(0)}k
                        </span>
                        <span className="text-xs font-bold text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                          View Pathway <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {!isLoading && filteredCareers.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-gray-500 mb-2">No careers found matching your criteria.</p>
                <Button variant="outline" onClick={() => { setSelectedIndustry(null); setSelectedSalaryRange(null); setSearchTerm(""); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default Careers;
