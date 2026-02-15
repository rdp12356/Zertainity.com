import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, CheckCircle, TrendingUp, Sparkles, Home, MapPin, GraduationCap } from "lucide-react";
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="h-10 w-10 animate-pulse text-indigo-600 mx-auto" />
          <p className="text-gray-600">AI is analyzing your profile and generating recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 border border-green-200 text-sm font-semibold mb-4">
              <CheckCircle className="h-4 w-4" /> Assessment Complete
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Your Personalized Career Path</h1>
            <p className="text-gray-600 text-lg">Based on your academic performance and assessment responses, here are our AI-powered recommendations</p>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-6xl">

        {/* Strengths Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
              Your Strengths
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {strengths}
            </p>
          </div>
        </motion.div>

        {/* Recommended Courses */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Recommended Courses & Colleges</h2>

          <div className="space-y-6">
            {recommendations.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{course.courseName}</h3>
                    <p className="text-indigo-600 font-medium">{course.stream}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-5xl font-bold text-gray-900">{course.match}%</div>
                      <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Match</div>
                    </div>
                  </div>
                </div>

                {/* Match Progress */}
                <Progress value={course.match} className="h-2 mb-6 bg-gray-200" />

                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {course.description}
                </p>

                {/* Why This is Great */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-indigo-600">Why this is great for you:</h4>
                  <ul className="space-y-2">
                    {course.whyGreat.map((reason, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best Colleges */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-indigo-600" />
                    Best Colleges for This Course:
                  </h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {course.colleges.map((college, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100"
                      >
                        <h5 className="font-bold text-gray-900 mb-1">{college.name}</h5>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                          <MapPin className="h-3 w-3" />
                          {college.location}
                        </p>
                        <p className="text-xs text-indigo-700 font-medium">
                          Cutoff: {college.cutoff}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Options */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">Career Options:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.careerOptions.map((career, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-10 border border-indigo-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h3>
            <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
              Research these colleges and courses. Talk to your teachers and counselors to make an informed decision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/careers")}
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 h-14 text-lg"
              >
                Explore More Careers
              </Button>
              <Button
                onClick={() => navigate("/pathways")}
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-white rounded-full px-8 h-14 text-lg"
              >
                View Career Roadmaps
              </Button>
            </div>
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="mt-6 text-gray-600 hover:text-gray-900"
            >
              <Home className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Results;
