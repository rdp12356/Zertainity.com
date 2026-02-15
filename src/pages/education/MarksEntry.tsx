import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Info, CheckCircle, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const MarksEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Get education level from location state or default
  const educationLevel = location.state?.educationLevel || 'class12';

  // Simplified state for 4 core subjects + 1 optional
  const [physics, setPhysics] = useState("");
  const [chemistry, setChemistry] = useState("");
  const [math, setMath] = useState("");
  const [english, setEnglish] = useState("");
  const [optionalSubject, setOptionalSubject] = useState("");
  const [optionalMarks, setOptionalMarks] = useState("");

  const steps = [
    { title: "Education", status: "completed" },
    { title: "Academics", status: "current" },
    { title: "Interests", status: "upcoming" },
    { title: "Results", status: "upcoming" },
  ];

  // Calculate aggregate percentage
  const aggregateData = useMemo(() => {
    const coreMarks = [physics, chemistry, math, english]
      .map(m => parseFloat(m) || 0);
    const optMarks = parseFloat(optionalMarks) || 0;

    const totalMarks = coreMarks.reduce((sum, m) => sum + m, 0) + optMarks;
    const maxMarks = 500;
    const percentage = (totalMarks / maxMarks) * 100;

    let eligibilityStatus = "High";
    if (percentage < 60) eligibilityStatus = "Low";
    else if (percentage < 75) eligibilityStatus = "Medium";

    return {
      totalMarks,
      maxMarks,
      percentage: percentage.toFixed(1),
      eligibilityStatus
    };
  }, [physics, chemistry, math, english, optionalMarks]);

  const validateAndSubmit = () => {
    // Validate all 4 core subjects are filled
    if (!physics || !chemistry || !math || !english) {
      toast({
        title: "Missing Information",
        description: "Please enter marks for all core subjects.",
        variant: "destructive"
      });
      return;
    }

    // Validate marks are in range
    const allMarks = [physics, chemistry, math, english];
    if (optionalMarks) allMarks.push(optionalMarks);

    for (const mark of allMarks) {
      const num = parseFloat(mark);
      if (isNaN(num) || num < 0 || num > 100) {
        toast({
          title: "Invalid Marks",
          description: "Marks must be between 0 and 100.",
          variant: "destructive"
        });
        return;
      }
    }

    // Navigate to next step (quiz)
    navigate("/quiz", {
      state: {
        educationLevel,
        academicMarks: {
          physics: parseFloat(physics),
          chemistry: parseFloat(chemistry),
          math: parseFloat(math),
          english: parseFloat(english),
          optional: optionalSubject ? {
            subject: optionalSubject,
            marks: parseFloat(optionalMarks)
          } : null,
          aggregate: aggregateData
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white">

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <div className="h-full bg-black w-[50%] transition-all duration-500"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-lg">
              <span className="text-lg font-bold">∞</span>
            </div>
            <span className="font-bold tracking-tight">Zertainity</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {steps.map((step, i) => (
              <div key={i} className={`flex items-center gap-2 text-sm font-medium ${step.status === 'current' ? 'text-black' : step.status === 'completed' ? 'text-black/50' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${step.status === 'current' ? 'border-black bg-black text-white' : step.status === 'completed' ? 'border-black bg-black text-white' : 'border-gray-200'}`}>
                  {step.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span>{step.title}</span>
              </div>
            ))}
          </div>

          <Button variant="ghost" onClick={() => navigate("/")} className="text-gray-500 hover:text-black">
            Save & Exit
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">

        <div className="grid lg:grid-cols-12 gap-12">

          {/* Left Column: Form */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-gray-100 text-xs font-semibold uppercase tracking-wider mb-4">Step 2 of 4</span>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Academic Performance
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed">
                Enter your marks to help us analyze your academic strengths and verify eligibility for top colleges.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Core Subjects */}
                <div className="space-y-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span className="w-1 h-6 bg-black rounded-full"></span> Core Subjects
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="physics" className="text-gray-700">Physics</Label>
                      <div className="relative">
                        <Input
                          id="physics"
                          type="number"
                          placeholder="0-100"
                          value={physics}
                          onChange={(e) => setPhysics(e.target.value)}
                          className="pl-4 pr-12 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all text-lg font-medium"
                          min="0" max="100"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">/100</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="chemistry" className="text-gray-700">Chemistry</Label>
                      <div className="relative">
                        <Input
                          id="chemistry"
                          type="number"
                          placeholder="0-100"
                          value={chemistry}
                          onChange={(e) => setChemistry(e.target.value)}
                          className="pl-4 pr-12 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all text-lg font-medium"
                          min="0" max="100"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">/100</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="math" className="text-gray-700">Mathematics</Label>
                      <div className="relative">
                        <Input
                          id="math"
                          type="number"
                          placeholder="0-100"
                          value={math}
                          onChange={(e) => setMath(e.target.value)}
                          className="pl-4 pr-12 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all text-lg font-medium"
                          min="0" max="100"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">/100</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Languages & Optional */}
                <div className="space-y-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span className="w-1 h-6 bg-gray-300 rounded-full"></span> Additional Subjects
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="english" className="text-gray-700">English</Label>
                      <div className="relative">
                        <Input
                          id="english"
                          type="number"
                          placeholder="0-100"
                          value={english}
                          onChange={(e) => setEnglish(e.target.value)}
                          className="pl-4 pr-12 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all text-lg font-medium"
                          min="0" max="100"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">/100</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <Label className="text-sm font-medium text-gray-700 mb-3 block">Optional Subject (e.g. CS, PE)</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Subject Name"
                          value={optionalSubject}
                          onChange={(e) => setOptionalSubject(e.target.value)}
                          className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                        />
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="Marks"
                            value={optionalMarks}
                            onChange={(e) => setOptionalMarks(e.target.value)}
                            className="pl-4 pr-12 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all text-lg font-medium"
                            min="0" max="100"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">/100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-100">
                <Button
                  variant="outline"
                  className="h-12 px-6 rounded-xl border-gray-200 hover:bg-gray-50 hover:text-black font-medium transition-all"
                  onClick={() => navigate("/education-level")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button
                  className="h-12 px-8 rounded-xl bg-black text-white hover:bg-gray-800 font-bold shadow-lg shadow-black/10 transition-all flex items-center gap-2"
                  onClick={validateAndSubmit}
                >
                  Continue to Interests <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Live Stats */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-32"
            >
              <div className="bg-black text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-black/20">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-800 rounded-full blur-3xl -ml-12 -mb-12 opacity-50"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 text-gray-400 text-sm font-medium uppercase tracking-wider">
                    <Calculator className="w-4 h-4" /> Live Analysis
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-6xl font-bold tracking-tighter">
                      {aggregateData.percentage}
                    </span>
                    <span className="text-2xl font-medium text-gray-400">%</span>
                  </div>
                  <p className="text-gray-400 mb-8">Aggregate Percentage</p>

                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Score</span>
                      <span className="font-mono text-xl">{aggregateData.totalMarks} <span className="text-gray-500 text-base">/ 500</span></span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Eligibility</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${aggregateData.eligibilityStatus === 'High' ? 'bg-green-500/20 text-green-400' :
                          aggregateData.eligibilityStatus === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                        {aggregateData.eligibilityStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Why do we need this?</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Your academic profile helps us filter out unrealistic options and suggest colleges where you have a high chance of admission.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default MarksEntry;
