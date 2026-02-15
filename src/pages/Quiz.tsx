import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateQuizQuestions } from "@/services/ai";

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [direction, setDirection] = useState(1);
  const [otherText, setOtherText] = useState<Record<number, string>>({});

  // Load Questions via AI Service
  useEffect(() => {
    const loadQuestions = async () => {
      const {
        educationLevel,
        interests,
        class9Marks,
        class10Marks,
        class11Subjects,
        class12Subjects
      } = location.state || {};

      try {
        // Call AI service with marks data for personalized aptitude questions
        const aiQuestions = await generateQuizQuestions(
          educationLevel || 'General',
          interests || 'Technology and Science',
          {
            class9Marks,
            class10Marks,
            class11Subjects,
            class12Subjects
          }
        );
        setQuestions(aiQuestions);
      } catch (error) {
        console.error("Failed to load quiz", error);
        toast({ title: "Error", description: "Failed to generate assessment.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [location.state, toast]);

  const handleAnswer = (option: any) => {
    setAnswers({ ...answers, [currentQuestion]: option });
    if (option.label !== "Other") {
      const newOtherText = { ...otherText };
      delete newOtherText[currentQuestion];
      setOtherText(newOtherText);
    }
  };

  const handleOtherTextChange = (text: string) => {
    setOtherText({ ...otherText, [currentQuestion]: text });
    const otherOption = questions[currentQuestion]?.options?.find((opt: any) => opt.label === "Other");
    if (otherOption) {
      setAnswers({ ...answers, [currentQuestion]: { ...otherOption, customText: text } });
    }
  };

  const handleNext = () => {
    const currentAnswer = answers[currentQuestion];

    if (!currentAnswer) {
      toast({ title: "Select an answer", variant: "destructive" });
      return;
    }

    if (currentAnswer.label === "Other" && !otherText[currentQuestion]?.trim()) {
      toast({ title: "Please enter your answer", description: "You selected 'Other', please type your answer.", variant: "destructive" });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion(prev => prev + 1);
    } else {
      saveResultsAndNavigate();
    }
  };

  const saveResultsAndNavigate = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await supabase.from('user_results').insert({
          user_id: user.id,
          archetype: 'INTJ',
          top_careers: {
            answers: answers,
            otherText: otherText,
            educationLevel: location.state?.educationLevel,
            marks: {
              class9Marks: location.state?.class9Marks,
              class10Marks: location.state?.class10Marks,
              class11Subjects: location.state?.class11Subjects,
              class12Subjects: location.state?.class12Subjects
            },
            interests: location.state?.interests,
            timestamp: new Date().toISOString()
          }
        });
      }
    } catch (error) {
      console.error('Error saving results:', error);
    }

    // Navigate to results with all data
    navigate("/results", {
      state: {
        answers,
        otherText,
        educationLevel: location.state?.educationLevel,
        class9Marks: location.state?.class9Marks,
        class10Marks: location.state?.class10Marks,
        class11Subjects: location.state?.class11Subjects,
        class12Subjects: location.state?.class12Subjects,
        interests: location.state?.interests
      }
    });
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-4" />
        <p className="text-gray-600">AI is analyzing your profile...</p>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const q = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col font-sans">

      {/* Progress Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span className="font-medium">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="font-medium">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200" />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-snug">
                {q.question}
              </h2>
              <p className="text-gray-600 mb-6">Select the option that best describes your interest level</p>

              <div className="space-y-3">
                {q.options.map((option: any, index: number) => {
                  const isSelected = answers[currentQuestion]?.label === option.label;
                  return (
                    <button
                      key={option.label}
                      onClick={() => handleAnswer(option)}
                      className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between
                        ${isSelected
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-900'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                          ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                          {isSelected && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium text-lg">{option.label}</span>
                      </div>
                      {index > 0 && index < q.options.length - 1 && (
                        <span className="text-sm text-gray-500">{index}</span>
                      )}
                    </button>
                  );
                })}

                {/* Other Text Input */}
                {answers[currentQuestion]?.label === "Other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <Input
                      placeholder="Type your answer here..."
                      value={otherText[currentQuestion] || ""}
                      onChange={(e) => handleOtherTextChange(e.target.value)}
                      className="border-gray-300 focus:border-indigo-600 h-12 text-lg"
                      autoFocus
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8"
            >
              {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
