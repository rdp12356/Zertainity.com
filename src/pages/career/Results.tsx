import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, CheckCircle, TrendingUp, Sparkles, Home, MapPin, GraduationCap, Briefcase, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { generateRecommendations } from "@/services/ai";

interface College {
  name: string;
  location: string;
  cutoff: string;
}

interface CourseRecommendation {
  courseName: string;
  stream: string;
  match: number;
  description: string;
  whyGreat: string[];
  colleges: College[];
  careerOptions: string[];
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [strengths, setStrengths] = useState("");
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const {
          answers,
          educationLevel,
          class9Marks,
          class10Marks,
          class11Subjects,
          class12Subjects,
          interests
        } = location.state || {};

        // Generate AI recommendations
        const aiRecommendations = await generateRecommendations(
          educationLevel || 'General',
          interests || '',
          {
            class9Marks,
            class10Marks,
            class11Subjects,
            class12Subjects
          },
          answers || {}
        );

        setStrengths(aiRecommendations.strengths);
        setRecommendations(aiRecommendations.recommendedCourses);

        // Save to database
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('user_results').upsert({
            user_id: user.id,
            archetype: 'ANALYZED',
            top_careers: {
              strengths: aiRecommendations.strengths,
              recommendations: aiRecommendations.recommendedCourses,
              timestamp: new Date().toISOString()
            }
          });
        }
      } catch (error) {
        console.error('Error loading results:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [location.state]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-gray-100 border-t-black animate-spin mb-8"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🧠</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Profile</h2>
        <p className="text-gray-500">Connecting your strengths to opportunities...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white pb-20">

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-lg">
              <span className="text-lg font-bold">∞</span>
            </div>
            <span className="font-bold tracking-tight">Zertainity</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")} className="text-gray-500 hover:text-black">
              Save & Exit
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200 text-xs font-bold uppercase tracking-wider mb-6">
              <CheckCircle className="h-3 w-3" /> Analysis Complete
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Your Future Blueprint</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              We've identified your key strengths and matched them with high-potential career paths tailored just for you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl -mt-8">

        {/* Strengths Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl shadow-gray-200/50 mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold">Your Core Strengths</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {strengths}
            </p>
          </div>
        </motion.div>

        {/* Recommendations Grid */}
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-500" /> Top Recommendations
        </h2>

        <div className="space-y-8">
          {recommendations.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group"
            >
              {/* Card Header */}
              <div className="p-8 border-b border-gray-100 bg-gray-50/30 flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider">
                      Rank {index + 1}
                    </span>
                    <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                      {course.stream}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{course.courseName}</h3>
                  <p className="text-gray-500 leading-relaxed max-w-2xl">{course.description}</p>
                </div>

                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm md:w-auto w-full justify-between md:justify-start">
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-100" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-green-500" strokeDasharray={175.93} strokeDashoffset={175.93 - (175.93 * course.match) / 100} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                      {course.match}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Match Score</div>
                    <div className="text-xs text-gray-500">Based on your profile</div>
                  </div>
                </div>
              </div>

              <div className="p-8 grid md:grid-cols-2 gap-12">
                {/* Why Great */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" /> Why this fits you
                  </h4>
                  <ul className="space-y-3">
                    {course.whyGreat.map((reason, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Career Options */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-500" /> Future Careers
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.careerOptions.map((career, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700">
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Colleges Section */}
              <div className="bg-gray-50 p-8 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-500" /> Top Colleges
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {course.colleges.map((college, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-black transition-colors group/college cursor-pointer">
                      <h5 className="font-bold text-gray-900 mb-1 group-hover/college:text-blue-600 transition-colors">{college.name}</h5>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3" /> {college.location}
                      </div>
                      <div className="inline-flex px-2 py-0.5 rounded bg-gray-100 text-[10px] font-bold text-gray-600 uppercase tracking-wide">
                        Cutoff: {college.cutoff}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center mb-20">
          <div className="bg-black text-white rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gray-800 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Start Building Your Future</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Explore detailed roadmaps for these careers or browse mentorship opportunities to get real-world advice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/pathways")}
                  className="bg-white text-black hover:bg-gray-100 h-14 px-8 rounded-xl font-bold text-lg"
                >
                  View Career Roadmap
                </Button>
                <Button
                  onClick={() => navigate("/mentorship")}
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800 hover:text-white h-14 px-8 rounded-xl font-bold text-lg"
                >
                  Find a Mentor
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Results;
