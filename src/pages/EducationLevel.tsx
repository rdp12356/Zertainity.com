import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const EducationLevel = () => {
  const navigate = useNavigate();

  const handleSelection = (level: string) => {
    // Skip marks entry, go directly to Quiz with minimal data
    navigate("/quiz", {
      state: {
        educationLevel: level,
        interests: "General interests", // Default value
        class9Marks: [],
        class10Marks: [],
        class11Subjects: [],
        class12Subjects: []
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Where Are You Headed?
          </h1>
          <p className="text-xl text-gray-600">
            Select your current educational stage to get personalized guidance
          </p>
        </motion.div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">

          {/* After 10th Grade */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card
              className="bg-white border-2 border-gray-200 hover:border-indigo-400 transition-all cursor-pointer group hover:shadow-lg"
              onClick={() => handleSelection('after-10th')}
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">After 10th Grade</h3>
                <p className="text-gray-600 mb-6">
                  I'm planning to choose my stream for 11th and 12th
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Enter 9th and 10th grade marks</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Share your interests and passion</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Get stream recommendations</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg h-12"
                >
                  Continue <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* After 12th Grade */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card
              className="bg-white border-2 border-gray-200 hover:border-purple-400 transition-all cursor-pointer group hover:shadow-lg"
              onClick={() => handleSelection('after-12th')}
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">After 12th Grade</h3>
                <p className="text-gray-600 mb-6">
                  I'm planning to choose my college course
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Enter 11th and 12th grade marks</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Share your interests and passion</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Get college and course recommendations</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg h-12"
                >
                  Continue <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-gray-500 mt-12 max-w-2xl"
        >
          Our AI will analyze your academic performance and interests to provide personalized career guidance
        </motion.p>
      </div>
    </div>
  );
};

export default EducationLevel;
