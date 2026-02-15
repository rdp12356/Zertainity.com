import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, CheckCircle, BookOpen, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const EducationLevel = () => {
  const navigate = useNavigate();

  const handleSelection = (level: string) => {
    // Navigate to marks entry with selected level
    navigate("/marks-entry", {
      state: { educationLevel: level }
    });
  };

  const steps = [
    { title: "Education", status: "current" },
    { title: "Academics", status: "upcoming" },
    { title: "Interests", status: "upcoming" },
    { title: "Results", status: "upcoming" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white">

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <div className="h-full bg-black w-[25%] transition-all duration-500"></div>
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
              <div key={i} className={`flex items-center gap-2 text-sm font-medium ${step.status === 'current' ? 'text-black' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${step.status === 'current' ? 'border-black bg-black text-white' : 'border-gray-200'}`}>
                  {i + 1}
                </div>
                <span>{step.title}</span>
              </div>
            ))}
          </div>

          <Button variant="ghost" onClick={() => navigate("/")} className="text-gray-500 hover:text-black">
            Exit
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-2xl"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-gray-100 text-xs font-semibold uppercase tracking-wider mb-4">Step 1 of 4</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Where are you in your journey?
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Select your current education level so we can tailor the assessment to your specific needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full">
          {/* Card 1: 10th Grade */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card
              className="h-full border border-gray-200 hover:border-black transition-all cursor-pointer group hover:shadow-xl hover:shadow-gray-200/50 relative overflow-hidden bg-white"
              onClick={() => handleSelection('class10')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="p-8 relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-black group-hover:text-white group-hover:border-black">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Class 10th Student</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">
                  Planning to choose the right stream (Science, Commerce, Arts) for your optimal career path.
                </p>

                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <CheckCircle className="h-3.5 w-3.5 text-black" /> Stream Selection
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <CheckCircle className="h-3.5 w-3.5 text-black" /> Subject Combinations
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2: 12th Grade */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card
              className="h-full border border-gray-200 hover:border-black transition-all cursor-pointer group hover:shadow-xl hover:shadow-gray-200/50 relative overflow-hidden bg-white"
              onClick={() => handleSelection('class12')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="p-8 relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-black group-hover:text-white group-hover:border-black">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Class 12th Student</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">
                  Looking for the best colleges and undergraduate courses aligned with your strengths.
                </p>

                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <CheckCircle className="h-3.5 w-3.5 text-black" /> College Majors
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <CheckCircle className="h-3.5 w-3.5 text-black" /> Entrance Exams
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 3: Graduate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card
              className="h-full border border-gray-200 hover:border-black transition-all cursor-pointer group hover:shadow-xl hover:shadow-gray-200/50 relative overflow-hidden bg-white"
              onClick={() => handleSelection('graduate')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="p-8 relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-black group-hover:text-white group-hover:border-black">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Graduate</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">
                  Exploring career pivots, master's programs, or job opportunities in your field.
                </p>

                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <CheckCircle className="h-3.5 w-3.5 text-black" /> Job Roles
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <CheckCircle className="h-3.5 w-3.5 text-black" /> Upskilling
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default EducationLevel;
