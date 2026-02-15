import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Brain, TrendingUp, Sparkles, GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "Interest Assessment",
      description: "Discover your true passions across various subjects and domains"
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Get personalized recommendations based on advanced AI algorithms"
    },
    {
      icon: TrendingUp,
      title: "Career Pathways",
      description: "Explore detailed roadmaps from school to your dream career"
    },
    {
      icon: Sparkles,
      title: "Smart Recommendations",
      description: "Find the best colleges and professions matching your profile"
    }
  ];

  const benefits = [
    "Comprehensive subject interest analysis",
    "AI-driven career matching",
    "Detailed career progression roadmaps",
    "Academic performance evaluation",
    "College recommendations tailored to you",
    "From school to job guidance"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-sans">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Zertainity</span>
          </div>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/auth")}
              className="text-gray-700 hover:text-gray-900"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/admin")}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Admin
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your<br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Perfect Career Path
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            AI-powered platform to guide students from school to their dream career with personalized recommendations and detailed pathways
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/education-level")}
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 h-14 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate("/careers")}
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8 h-14 text-lg"
            >
              Explore Careers
            </Button>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our intelligent platform guides you through a comprehensive assessment to unlock your potential
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Zertainity */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Zertainity?</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 rounded-3xl p-10 text-white shadow-2xl"
            >
              <h3 className="text-3xl font-bold mb-4">Ready to Begin?</h3>
              <p className="text-gray-300 mb-8 text-lg">
                Take the first step towards your future
              </p>
              <Button
                onClick={() => navigate("/education-level")}
                size="lg"
                className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-full h-14 text-lg font-semibold"
              >
                Take the Quiz
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>© 2025 Zertainity. Empowering students to find their path.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
