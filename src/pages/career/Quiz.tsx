import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Save, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

// --- Types ---

type Category = 'technical' | 'creative' | 'social' | 'analytical' | 'practical' | 'leadership';

interface Question {
  id: number;
  text: string;
  category: Category;
}

interface QuizState {
  currentQuestion: number;
  answers: Record<number, number>; // questionId -> value (1-5)
  timestamp: string;
}

// --- Data: 40 Questions ---

const questions: Question[] = [
  // Technical (8)
  { id: 1, text: "I enjoy understanding how computer software and hardware work together.", category: 'technical' },
  { id: 2, text: "I like solving logical puzzles and coding problems.", category: 'technical' },
  { id: 3, text: "I am interested in automating tasks using technology.", category: 'technical' },
  { id: 4, text: "I enjoy learning new programming languages or software tools.", category: 'technical' },
  { id: 5, text: "I like troubleshooting technical issues on computers or devices.", category: 'technical' },
  { id: 6, text: "I am curious about how the internet and networks function.", category: 'technical' },
  { id: 7, text: "I enjoy working with complex systems and architectures.", category: 'technical' },
  { id: 8, text: "I prefer working with data and algorithms over manual tasks.", category: 'technical' },

  // Creative (7)
  { id: 9, text: "I enjoy expressing myself through art, design, or writing.", category: 'creative' },
  { id: 10, text: "I like coming up with unique ideas and innovative solutions.", category: 'creative' },
  { id: 11, text: "I appreciate aesthetics and visual beauty in products.", category: 'creative' },
  { id: 12, text: "I enjoy sketching, painting, or digital content creation.", category: 'creative' },
  { id: 13, text: "I like experimenting with different colors, textures, and styles.", category: 'creative' },
  { id: 14, text: "I find joy in storytelling and creative writing.", category: 'creative' },
  { id: 15, text: "I prefer projects that allow for artistic freedom and expression.", category: 'creative' },

  // Social (7)
  { id: 16, text: "I find fulfillment in helping others overcome their challenges.", category: 'social' },
  { id: 17, text: "I enjoy teaching or mentoring people.", category: 'social' },
  { id: 18, text: "I am good at listening and understanding others' perspectives.", category: 'social' },
  { id: 19, text: "I like working in teams and collaborating with diverse groups.", category: 'social' },
  { id: 20, text: "I am interested in psychology and human behavior.", category: 'social' },
  { id: 21, text: "I enjoy volunteering for community service or social causes.", category: 'social' },
  { id: 22, text: "I prioritize building strong relationships with people.", category: 'social' },

  // Analytical (7)
  { id: 23, text: "I enjoy analyzing data to find trends and patterns.", category: 'analytical' },
  { id: 24, text: "I like conducting research to understand complex topics.", category: 'analytical' },
  { id: 25, text: "I rely on facts and logic to make decisions.", category: 'analytical' },
  { id: 26, text: "I enjoy evaluating arguments and identifying inconsistencies.", category: 'analytical' },
  { id: 27, text: "I like solving mathematical or statistical problems.", category: 'analytical' },
  { id: 28, text: "I prefer tasks that require deep concentration and critical thinking.", category: 'analytical' },
  { id: 29, text: "I am curious about the 'why' and 'how' behind things.", category: 'analytical' },

  // Practical (6)
  { id: 30, text: "I enjoy working with my hands to build or fix things.", category: 'practical' },
  { id: 31, text: "I like seeing tangible results from my work immediately.", category: 'practical' },
  { id: 32, text: "I prefer outdoor activities or working with physical materials.", category: 'practical' },
  { id: 33, text: "I enjoy operating machinery or using tools.", category: 'practical' },
  { id: 34, text: "I like following step-by-step instructions to assemble things.", category: 'practical' },
  { id: 35, text: "I am interested in how physical objects are constructed.", category: 'practical' },

  // Leadership (5)
  { id: 36, text: "I enjoy taking charge of a group or project.", category: 'leadership' },
  { id: 37, text: "I like motivating others to achieve a common goal.", category: 'leadership' },
  { id: 38, text: "I am comfortable making difficult decisions under pressure.", category: 'leadership' },
  { id: 39, text: "I enjoy planning and organizing events or activities.", category: 'leadership' },
  { id: 40, text: "I like negotiating and persuading others to my point of view.", category: 'leadership' },
];

const options = [
  { value: 1, label: "Strongly Disagree", emoji: "😠" },
  { value: 2, label: "Disagree", emoji: "🙁" },
  { value: 3, label: "Neutral", emoji: "😐" },
  { value: 4, label: "Agree", emoji: "🙂" },
  { value: 5, label: "Strongly Agree", emoji: "🤩" },
];

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('zertainity_quiz_progress');
    if (saved) {
      try {
        const parsed: QuizState = JSON.parse(saved);
        setAnswers(parsed.answers);
        setCurrentQuestionIndex(parsed.currentQuestion);
        toast({
          title: "Progress Restored",
          description: "We've loaded your previous quiz session.",
        });
      } catch (e: unknown) {
        console.error("Failed to load quiz progress", e);
      }
    }
    setIsLoaded(true);
  }, [toast]);

  // Save progress on change
  useEffect(() => {
    if (!isLoaded) return;
    const state: QuizState = {
      currentQuestion: currentQuestionIndex,
      answers,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('zertainity_quiz_progress', JSON.stringify(state));
  }, [currentQuestionIndex, answers, isLoaded]);

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: value
    }));

    // Small delay before auto-advancing for better UX
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 250);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSaveAndExit = () => {
    toast({
      title: "Progress Saved",
      description: "You can come back anytime to complete the quiz.",
    });
    navigate('/');
  };

  const calculateScores = () => {
    const scores: Record<Category, number> = {
      technical: 0, creative: 0, social: 0, analytical: 0, practical: 0, leadership: 0
    };

    // Sum raw scores
    questions.forEach(q => {
      const val = answers[q.id] || 0;
      if (val > 0) scores[q.category] += val;
    });

    // Normalize to 0-100
    // Max score per question is 5.
    const counts: Record<Category, number> = {
      technical: 0, creative: 0, social: 0, analytical: 0, practical: 0, leadership: 0
    };
    questions.forEach(q => counts[q.category]++);

    const normalizedScores: Partial<Record<Category, number>> = {};
    (Object.keys(scores) as Category[]).forEach(cat => {
      if (counts[cat] > 0) {
        normalizedScores[cat] = Math.round((scores[cat] / (counts[cat] * 5)) * 100);
      } else {
        normalizedScores[cat] = 0;
      }
    });

    return normalizedScores;
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    if (Object.keys(answers).length < questions.length) {
      toast({
        title: "Incomplete Quiz",
        description: "Please answer all questions before submitting.",
        variant: "destructive"
      });
      return;
    }

    const scores = calculateScores();
    localStorage.removeItem('zertainity_quiz_progress'); // Clear saved state on completion

    navigate('/results', {
      state: {
        answers: scores, // Pass normalized category scores as 'answers'
        quizDetails: answers // Pass raw answers just in case
      }
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (currentQuestionIndex === questions.length - 1) {
          handleSubmit();
        } else {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex, answers]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isLoaded) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50 h-16">
        <div className="max-w-3xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={() => navigate("/")}>
            <div className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-xl shadow-lg shadow-black/20 cursor-pointer">
              <span className="font-bold text-lg">Z</span>
            </div>
            <span className="font-bold tracking-tight hidden sm:block">Zertainity</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSaveAndExit} className="text-gray-500 hover:text-black gap-2">
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save & Exit</span>
          </Button>
        </div>
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
          <motion.div
            className="h-full bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-24 px-6 flex flex-col items-center max-w-2xl mx-auto w-full">

        {/* Question Counter */}
        <div className="w-full mb-8 flex justify-between items-end">
          <div>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <h2 className="text-3xl font-black mt-2 tracking-tight">Assess Your Interests</h2>
          </div>
          <span className="text-sm font-bold text-black bg-gray-100 px-3 py-1 rounded-full">
            {Math.round(progressPercentage)}%
          </span>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full mb-10"
          >
            <h3 className="text-2xl md:text-3xl font-medium leading-relaxed mb-10 text-gray-900">
              {currentQuestion.text}
            </h3>

            <div className="space-y-3">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`
                                group relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                                ${currentAnswer === option.value
                      ? 'border-black bg-gray-50 shadow-md transform scale-[1.02]'
                      : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }
                            `}
                >
                  <div className={`
                                w-8 h-8 rounded-full border-2 mr-4 flex items-center justify-center transition-colors text-sm
                                ${currentAnswer === option.value ? 'border-black bg-black text-white' : 'border-gray-200 text-transparent group-hover:border-gray-300'}
                            `}>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-2xl mr-4">{option.emoji}</span>
                  <span className={`text-base font-medium ${currentAnswer === option.value ? 'text-black' : 'text-gray-600'}`}>
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between w-full mt-auto pt-8 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="text-gray-500 hover:text-black gap-2 pl-0 hover:bg-transparent"
          >
            <ArrowLeft className="w-5 h-5" /> Previous
          </Button>

          {currentQuestionIndex === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < questions.length}
              className="bg-black text-white hover:bg-gray-800 px-8 h-14 rounded-xl font-bold text-lg shadow-xl shadow-black/20 hover:scale-105 transition-all"
            >
              Complete Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!currentAnswer}
              className="bg-black text-white hover:bg-gray-800 px-8 h-12 rounded-xl font-bold shadow-lg shadow-black/10 hover:translate-x-1 transition-all group"
            >
              Next <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>

        {/* Keyboard Hint */}
        <p className="mt-8 text-xs text-gray-400 font-medium text-center flex items-center gap-2">
          <span className="px-2 py-1 bg-gray-100 rounded border border-gray-200">Enter</span>
          to go next
        </p>

      </main>
    </div>
  );
};

export default Quiz;
