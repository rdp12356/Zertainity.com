import RequiresAuth from "./components/RequiresAuth";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/home/Index";
// import EducationLevel from "./pages/education/EducationLevel"; // Removed in favor of EducationLevelSelect
import Quiz from "./pages/career/Quiz";
import Results from "./pages/career/Results";
import Pathways from "./pages/career/Pathways";
import Careers from "./pages/career/Careers";
import MentorDashboard from "./pages/connect/MentorDashboard";
import DailyLearning from "./pages/learning/DailyLearning";
import InterviewPrep from "./pages/learning/InterviewPrep";
import CareerContentEditor from "./pages/admin/CareerContentEditor";
import CareerEvents from "./pages/career/CareerEvents";
import ApplicationTracker from "./pages/career/ApplicationTracker";
import CompanyProfile from "./pages/career/CompanyProfile";
import Support from "./pages/support/Support";
import ReferralRewards from "./pages/referral/ReferralRewards";
import ResumeBuilder from "./pages/career/ResumeBuilder";
import JobPortal from "./pages/career/JobPortal";
import Admin from "./pages/admin/Admin";
import AuditLogs from "./pages/admin/AuditLogs";
import Setup from "./pages/auth/Setup";
import Auth from "./pages/auth/Auth";
import Profile from "./pages/profile/Profile";
import ActivityAnalytics from "./pages/learning/ActivityAnalytics";
import SecuritySessions from "./pages/profile/SecuritySessions";
import AIAssistant from "./pages/ai/AIAssistant";
import EducationLevelSelect from "./pages/assessment/EducationLevelSelect";
import AcademicMarks from "./pages/assessment/AcademicMarks";
// Duplicate import removed
import NotFound from "./pages/error/NotFound";
import CompareCareers from "./pages/career/CompareCareers";
import Scholarships from "./pages/education/Scholarships";
import Notifications from "./pages/notifications/Notifications";
import ProjectPortfolio from "./pages/career/ProjectPortfolio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/education-level" element={<EducationLevel />} /> Removed duplicate */}
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={
            <RequiresAuth>
              <Results />
            </RequiresAuth>
          } />
          <Route path="/pathways" element={<Pathways />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/mentorship" element={<MentorDashboard />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/daily-learning" element={<DailyLearning />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/jobs" element={<JobPortal />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/content-editor" element={<CareerContentEditor />} />
          <Route path="/events" element={<CareerEvents />} />
          <Route path="/applications" element={<ApplicationTracker />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/support" element={<Support />} />
          <Route path="/referrals" element={<ReferralRewards />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/activity-analytics" element={<ActivityAnalytics />} />
          <Route path="/security" element={<SecuritySessions />} />
          <Route path="/education-level" element={<EducationLevelSelect />} />
          <Route path="/academic-marks" element={<AcademicMarks />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />

          <Route path="/compare-careers" element={<CompareCareers />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/portfolio" element={<ProjectPortfolio />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
