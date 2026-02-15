import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  School,
  Code,
  Award,
  Briefcase,
  Rocket,
  ChevronRight,
  Share2,
  Bookmark,
  Clock,
  TrendingUp,
  DollarSign,
  Brain,
  BookOpen,
  CheckCircle,
  Lock,
  PlayCircle,
  FileText,
  Terminal,
  Search,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface RoadmapStep {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'locked';
  details?: string;
  skills?: { name: string; progress: number }[];
}

interface CareerPathway {
  title: string;
  duration: string;
  difficulty: 'Low' | 'Medium' | 'High';
  avgSalary: string;
  steps: RoadmapStep[];
  keySkills: string[];
  resources: {
    title: string;
    type: 'article' | 'code' | 'video';
    duration: string;
    icon: React.ReactNode;
  }[];
}

const Pathways: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get career from location state or default to Data Scientist
  const selectedCareer = location.state?.career || 'Data Scientist';

  const pathway: CareerPathway = {
    title: selectedCareer,
    duration: '~4 Years',
    difficulty: 'High',
    avgSalary: '$120k',
    steps: [
      {
        id: 1,
        title: 'Undergraduate Degree',
        icon: <School className="w-5 h-5" />,
        description: 'Foundational education in Computer Science, Statistics, or Mathematics. Focus on calculus, linear algebra, and introductory programming.',
        duration: '4 Years',
        status: 'completed',
        details: 'GPA 3.5+ Recommended'
      },
      {
        id: 2,
        title: 'Skill Acquisition',
        icon: <Code className="w-5 h-5" />,
        description: 'Mastering core technical skills required for data manipulation and analysis. Currently focusing on Python libraries and SQL query optimization.',
        duration: '6 Months',
        status: 'in-progress',
        skills: [
          { name: 'Python (Pandas, NumPy)', progress: 80 },
          { name: 'SQL & Databases', progress: 45 }
        ]
      },
      {
        id: 3,
        title: 'Certifications',
        icon: <Award className="w-5 h-5" />,
        description: 'Obtain specialized certifications in Machine Learning or Deep Learning from recognized providers (Coursera, AWS, Google).',
        duration: '3-6 Months',
        status: 'locked'
      },
      {
        id: 4,
        title: 'Internships',
        icon: <Briefcase className="w-5 h-5" />,
        description: 'Apply theoretical knowledge in real-world scenarios through summer internships or co-op programs at tech companies.',
        duration: '3-6 Months',
        status: 'locked'
      },
      {
        id: 5,
        title: 'Entry-Level Role',
        icon: <Rocket className="w-5 h-5" />,
        description: 'Secure a Junior Data Scientist or Data Analyst position. Begin building a professional portfolio and network.',
        duration: 'Ongoing',
        status: 'locked'
      }
    ],
    keySkills: [
      'Data Wrangling',
      'Statistical Analysis',
      'Machine Learning',
      'Data Visualization'
    ],
    resources: [
      {
        title: 'Intro to Data Science PDF',
        type: 'article',
        duration: 'Free • 45 min read',
        icon: <FileText className="w-4 h-4" />
      },
      {
        title: 'LeetCode SQL Practice',
        type: 'code',
        duration: 'Interactive • Intermediate',
        icon: <Terminal className="w-4 h-4" />
      },
      {
        title: 'Neural Networks 101',
        type: 'video',
        duration: 'Video Course • 2h 15m',
        icon: <PlayCircle className="w-4 h-4" />
      }
    ]
  };

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

          <div className="hidden md:flex relative w-full max-w-sm mx-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search other career paths..."
              className="w-full bg-gray-50 border-none rounded-full py-2 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")} className="text-gray-500 hover:text-black">
              Dashboard
            </Button>
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
              JS
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto w-full">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <span className="hover:text-black cursor-pointer" onClick={() => navigate("/")}>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black font-medium">{pathway.title} Roadmap</span>
        </div>

        {/* Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-gray-100">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              {pathway.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700">
                <Clock className="w-4 h-4" /> {pathway.duration}
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${pathway.difficulty === 'High' ? 'bg-red-50 border-red-100 text-red-700' : 'bg-green-50 border-green-100 text-green-700'
                }`}>
                <TrendingUp className="w-4 h-4" /> {pathway.difficulty} Difficulty
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700">
                <DollarSign className="w-4 h-4" /> {pathway.avgSalary} Avg. Salary
              </div>
            </motion.div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="h-12 border-gray-200 text-gray-600 hover:text-black">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button className="h-12 bg-black text-white hover:bg-gray-800 shadow-lg shadow-black/10">
              <Bookmark className="w-4 h-4 mr-2" /> Save Roadmap
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">

          {/* Timeline Column */}
          <div className="lg:col-span-8">
            <div className="relative pl-8 border-l border-gray-100 space-y-12">
              {pathway.steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[41px] top-0 w-[18px] h-[18px] rounded-full border-4 border-white ${step.status === 'completed' ? 'bg-green-500' :
                      step.status === 'in-progress' ? 'bg-black ring-4 ring-black/10' : 'bg-gray-200'
                    }`}></div>

                  <div className={`rounded-2xl border transition-all duration-300 ${step.status === 'in-progress' ? 'bg-white border-black/10 shadow-xl shadow-black/5 scale-[1.02]' :
                      step.status === 'completed' ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-100 opacity-60'
                    }`}>

                    {/* Card Header */}
                    <div className="p-6 flex gap-5">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${step.status === 'completed' ? 'bg-green-100 text-green-700' :
                          step.status === 'in-progress' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
                        }`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold">{step.title}</h3>
                          {step.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                          {step.status === 'locked' && <Lock className="w-4 h-4 text-gray-300" />}
                          {step.status === 'in-progress' && <span className="text-xs font-bold px-2 py-1 rounded bg-black text-white uppercase tracking-wider">Current</span>}
                        </div>
                        <p className="text-gray-500 leading-relaxed mb-4">{step.description}</p>

                        {step.status === 'in-progress' && step.skills && (
                          <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                            <h4 className="text-sm font-semibold mb-3">Skills in progress</h4>
                            <div className="space-y-3">
                              {step.skills.map((skill, i) => (
                                <div key={i}>
                                  <div className="flex justify-between text-xs font-medium mb-1.5 text-gray-600">
                                    <span>{skill.name}</span>
                                    <span>{skill.progress}%</span>
                                  </div>
                                  <Progress value={skill.progress} className="h-1.5 bg-gray-200" indicatorClassName="bg-black" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> {step.duration}
                          </span>
                          {step.details && (
                            <span className="px-2 py-1 rounded bg-gray-100 text-gray-600">{step.details}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {step.status === 'in-progress' && (
                      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">3 resources available</span>
                        <Button size="sm" className="bg-white border border-gray-200 text-black hover:bg-gray-100 shadow-sm">
                          Start Learning <ArrowRight className="w-3 h-3 ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">

            {/* Key Skills */}
            <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl shadow-gray-900/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-lg">Key Skills</h3>
              </div>
              <div className="space-y-3">
                {pathway.keySkills.map((skill, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                    <span className="font-medium text-sm">{skill}</span>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-black" />
                </div>
                <h3 className="font-bold text-lg">Recommended</h3>
              </div>
              <div className="space-y-4">
                {pathway.resources.map((resource, i) => (
                  <a key={i} href="#" className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-black group-hover:text-white transition-colors">
                      {resource.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm group-hover:text-blue-600 transition-colors">{resource.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{resource.duration}</p>
                    </div>
                  </a>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6 border-gray-200">View All Resources</Button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default Pathways;
