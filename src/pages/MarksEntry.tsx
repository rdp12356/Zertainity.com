import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, ArrowLeft, BookOpen, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ... [Keep constants SUBJECT_OPTIONS_12TH, LANGUAGE_OPTIONS] ...
const SUBJECT_OPTIONS_12TH = [
  "Physics", "Chemistry", "Mathematics", "Biology", "Computer Science",
  "English", "Economics", "Accountancy", "Business Studies", "Physical Education",
  "Psychology", "Geography", "History", "Political Science", "Sociology"
];

const LANGUAGE_OPTIONS = [
  "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali",
  "Marathi", "Gujarati", "Urdu", "Punjabi", "Sanskrit", "French", "Russian"
];

interface SubjectMarks {
  subject: string;
  marks: string;
  interest?: 'high' | 'mid' | 'low';
}

const MarksEntry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { educationLevel } = location.state || {};

  // ... [Keep state definitions] ...
  const [class9Marks, setClass9Marks] = useState<SubjectMarks[]>([
    { subject: "English", marks: "", interest: undefined },
    { subject: "Mathematics", marks: "", interest: undefined },
    { subject: "Science", marks: "", interest: undefined },
    { subject: "Social Studies", marks: "", interest: undefined },
    { subject: "", marks: "", interest: undefined }
  ]);
  const [class10Marks, setClass10Marks] = useState<SubjectMarks[]>([
    { subject: "English", marks: "", interest: undefined },
    { subject: "Mathematics", marks: "", interest: undefined },
    { subject: "Science", marks: "", interest: undefined },
    { subject: "Social Studies", marks: "", interest: undefined },
    { subject: "", marks: "", interest: undefined }
  ]);
  const [class11Subjects, setClass11Subjects] = useState<SubjectMarks[]>([
    { subject: "", marks: "", interest: undefined },
    { subject: "", marks: "", interest: undefined },
    { subject: "", marks: "", interest: undefined },
    { subject: "", marks: "", interest: undefined },
    { subject: "", marks: "", interest: undefined },
    { subject: "", marks: "", interest: undefined }
  ]);
  const [class12Subjects, setClass12Subjects] = useState<SubjectMarks[]>([
    { subject: "", marks: "", interest: undefined },
    { subject: "", marks: "", interest: undefined },
    { subject: "", marks: "", interest: undefined },
    { subject: "", marks: "", interest: undefined },
    { subject: "", marks: "", interest: undefined },
    { subject: "", marks: "", interest: undefined }
  ]);
  const [interests, setInterests] = useState("");

  // Default to 'after-12th' if accessed directly
  const finalEducationLevel = educationLevel || 'after-12th';


  const updateMarks = (
    grade: '9' | '10' | '11' | '12',
    index: number,
    field: 'subject' | 'marks' | 'interest',
    value: string | 'high' | 'mid' | 'low'
  ) => {
    const setter = grade === '9' ? setClass9Marks : grade === '10' ? setClass10Marks : grade === '11' ? setClass11Subjects : setClass12Subjects;
    const current = grade === '9' ? class9Marks : grade === '10' ? class10Marks : grade === '11' ? class11Subjects : class12Subjects;

    const updated = [...current];
    if (field === 'interest') {
      updated[index] = { ...updated[index], interest: value as 'high' | 'mid' | 'low' };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setter(updated);
  };

  const validateAndSubmit = () => {
    // ... [Keep validation logic exactly as is] ...
    if (finalEducationLevel === 'after-10th') {
      const class9Valid = class9Marks.slice(0, 4).every(m => m.marks && parseFloat(m.marks) >= 0 && parseFloat(m.marks) <= 100 && m.interest);
      const class10Valid = class10Marks.slice(0, 4).every(m => m.marks && parseFloat(m.marks) >= 0 && parseFloat(m.marks) <= 100 && m.interest);
      const lang9 = class9Marks[4].subject && class9Marks[4].marks && class9Marks[4].interest;
      const lang10 = class10Marks[4].subject && class10Marks[4].marks && class10Marks[4].interest;

      if (!class9Valid || !class10Valid || !lang9 || !lang10) {
        toast({ title: "Please fill all mandatory fields", variant: "destructive" });
        return;
      }
    } else {
      const class11Valid = class11Subjects.slice(0, 5).every(s => s.subject && s.marks && s.interest && parseFloat(s.marks) >= 0 && parseFloat(s.marks) <= 100);
      const class12Valid = class12Subjects.slice(0, 5).every(s => s.subject && s.marks && s.interest && parseFloat(s.marks) >= 0 && parseFloat(s.marks) <= 100);

      if (!class11Valid || !class12Valid) {
        toast({ title: "Please fill at least 5 subjects for both grades", variant: "destructive" });
        return;
      }
    }

    if (!interests.trim()) {
      toast({ title: "Please describe your interests", variant: "destructive" });
      return;
    }

    // Navigate to Quiz with marks and interests for AI-generated aptitude questions
    navigate("/quiz", {
      state: {
        educationLevel: finalEducationLevel,
        class9Marks: finalEducationLevel === 'after-10th' ? class9Marks : undefined,
        class10Marks: finalEducationLevel === 'after-10th' ? class10Marks : undefined,
        class11Subjects: finalEducationLevel === 'after-12th' ? class11Subjects : undefined,
        class12Subjects: finalEducationLevel === 'after-12th' ? class12Subjects : undefined,
        interests
      }
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans text-gray-900">

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100" onClick={() => navigate("/education-level")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-indigo-600" /> Academic Profile
          </h1>
        </div>

        <div className="text-center mb-10 space-y-2">
          <h2 className="text-4xl font-bold text-gray-900">
            Your Academic Journey
          </h2>
          <p className="text-gray-600">
            Enter your marks from {finalEducationLevel === 'after-10th' ? '9th and 10th' : '11th and 12th'} grade (out of 100)
          </p>
        </div>

        {finalEducationLevel === 'after-10th' ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Class 9 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">9</div>
                <h3 className="text-xl font-semibold text-gray-900">Class 9th</h3>
              </div>
              <div className="space-y-4">
                {class9Marks.slice(0, 4).map((subject, idx) => (
                  <div key={idx} className="space-y-2">
                    <Label className="text-gray-700 font-medium">{subject.subject}</Label>
                    <div className="flex gap-3">
                      <Input
                        type="number" min="0" max="100" placeholder="%"
                        value={subject.marks}
                        onChange={(e) => updateMarks('9', idx, 'marks', e.target.value)}
                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600"
                      />
                      <Select onValueChange={(val) => updateMarks('9', idx, 'interest', val as any)}>
                        <SelectTrigger className="w-[110px] bg-white border-gray-300 text-gray-900">
                          <SelectValue placeholder="Interest" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="mid">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
                {/* Language Field */}
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <Label className="text-gray-700 font-medium">Language</Label>
                  <div className="flex gap-3">
                    <Select value={class9Marks[4].subject} onValueChange={(val) => updateMarks('9', 4, 'subject', val)}>
                      <SelectTrigger className="flex-1 bg-white border-gray-300 text-gray-900">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        {LANGUAGE_OPTIONS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number" placeholder="%" className="w-24 bg-black/20 border-white/10 text-white"
                      value={class9Marks[4].marks} onChange={(e) => updateMarks('9', 4, 'marks', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Class 10 */}
            <div className="glass-panel p-6 rounded-2xl border-white/5 bg-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold">10</div>
                <h3 className="text-xl font-semibold">Class 10th</h3>
              </div>
              <div className="space-y-4">
                {class10Marks.slice(0, 4).map((subject, idx) => (
                  <div key={idx} className="space-y-2">
                    <Label className="text-zinc-300">{subject.subject}</Label>
                    <div className="flex gap-3">
                      <Input
                        type="number" min="0" max="100" placeholder="%"
                        value={subject.marks}
                        onChange={(e) => updateMarks('10', idx, 'marks', e.target.value)}
                        className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600"
                      />
                      <Select onValueChange={(val) => updateMarks('10', idx, 'interest', val as any)}>
                        <SelectTrigger className="w-[110px] bg-black/20 border-white/10 text-white">
                          <SelectValue placeholder="Interest" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="mid">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
                {/* Language Field 10th */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <Label className="text-zinc-300">Language</Label>
                  <div className="flex gap-3">
                    <Select value={class10Marks[4].subject} onValueChange={(val) => updateMarks('10', 4, 'subject', val)}>
                      <SelectTrigger className="flex-1 bg-black/20 border-white/10 text-white">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10 text-white">
                        {LANGUAGE_OPTIONS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number" placeholder="%" className="w-24 bg-black/20 border-white/10 text-white"
                      value={class10Marks[4].marks} onChange={(e) => updateMarks('10', 4, 'marks', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Class 11 & 12 Implementation for 12th Grade Flow - similar structure */}
            {['11', '12'].map((grade) => {
              const subjects = grade === '11' ? class11Subjects : class12Subjects;
              const updateFn = (idx: number, field: any, val: any) => updateMarks(grade as any, idx, field, val);

              return (
                <div key={grade} className="glass-panel p-6 rounded-2xl border-white/5 bg-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">{grade}</div>
                    <h3 className="text-xl font-semibold">Class {grade}th</h3>
                  </div>
                  <div className="space-y-4">
                    {subjects.map((sub, idx) => (
                      <div key={idx} className="space-y-2">
                        <Label className="text-zinc-400 text-xs uppercase">{idx === 5 ? 'Optional Subject' : `Subject ${idx + 1}`}</Label>
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-6">
                            <Select value={sub.subject} onValueChange={(v) => updateFn(idx, 'subject', v)}>
                              <SelectTrigger className="bg-black/20 border-white/10 text-white h-9"><SelectValue placeholder="Select" /></SelectTrigger>
                              <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                {SUBJECT_OPTIONS_12TH.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-3">
                            <Input type="number" placeholder="%" className="bg-black/20 border-white/10 text-white h-9" value={sub.marks} onChange={(e) => updateFn(idx, 'marks', e.target.value)} />
                          </div>
                          <div className="col-span-3">
                            <Select onValueChange={(v) => updateFn(idx, 'interest', v)}>
                              <SelectTrigger className="bg-black/20 border-white/10 text-white h-9"><SelectValue placeholder="Int" /></SelectTrigger>
                              <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="mid">Mid</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Interests Section */}
        <div className="glass-panel p-8 rounded-2xl border-purple-500/30 bg-purple-900/10 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <h3 className="text-xl font-bold">Interests & Passions</h3>
          </div>
          <p className="text-zinc-400 mb-4 text-sm">
            Tell us what you love doing. This helps our AI recommend the perfect career path.
          </p>
          <Textarea
            className="bg-black/30 border-white/10 text-white min-h-[120px] focus:border-purple-500/50"
            placeholder="I enjoy coding, solving math puzzles, and reading sci-fi novels..."
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
        </div>

        <div className="flex justify-center pt-8">
          <Button
            size="lg"
            className="px-12 h-12 text-lg rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={validateAndSubmit}
          >
            Continue to Assessment <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

      </div>
    </div>
  );
};

export default MarksEntry;
