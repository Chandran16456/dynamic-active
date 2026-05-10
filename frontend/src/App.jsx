import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import TeacherAnnouncements from "./pages/teacher/TeacherAnnouncements";
import ClassroomObservations from "./pages/teacher/ClassroomObservations";
import TeacherNotes from "./pages/teacher/TeacherNotes";
import TeacherGoals from "./pages/teacher/TeacherGoals";
import TeacherAISummaries from "./pages/teacher/TeacherAISummaries";
import TeacherAIRecommendations from "./pages/teacher/TeacherAIRecommendations";
import TeacherAIGoals from "./pages/teacher/TeacherAIGoals";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAttendance from "./pages/admin/AdminAttendance";
import PerformanceReviews from "./pages/admin/PerformanceReviews";
import AdminReports from "./pages/admin/AdminReports";
import AdminAIReports from "./pages/admin/AdminAIReports";
import Analytics from "./pages/admin/Analytics";
import RiskInsights from "./pages/admin/RiskInsights";
import Footer from "./components/layout/Footer";
import FeedbackChatbot from "./components/shared/FeedbackChatbot";

export default function App() {
  const location = useLocation();

  const showFooterOnlyOnLandingPage = location.pathname === "/";

  const showChatbot =
  location.pathname.startsWith("/student") ||
  location.pathname.startsWith("/teacher") ||
  location.pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/attendance" element={<TeacherAttendance />} />
          <Route path="/teacher/announcements" element={<TeacherAnnouncements />} />
          <Route path="/teacher/observations" element={<ClassroomObservations />} />
          <Route path="/teacher/notes" element={<TeacherNotes />} />
          <Route path="/teacher/goals" element={<TeacherGoals />} />
          <Route path="/teacher/ai-summaries" element={<TeacherAISummaries />} />
          <Route path="/teacher/ai-recommendations" element={<TeacherAIRecommendations />} />
          <Route path="/teacher/ai-goals" element={<TeacherAIGoals />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/performance-reviews" element={<PerformanceReviews />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/ai-reports" element={<AdminAIReports />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/risk-insights" element={<RiskInsights />} />
        </Routes>
      </main>

      {showFooterOnlyOnLandingPage && <Footer />}
      {showChatbot && <FeedbackChatbot />}
    </div>
  );
}
