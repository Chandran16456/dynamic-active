import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import AnimatedPage from "../../components/motion/AnimatedPage";
import Button from "../../components/ui/Button";

function AnnouncementCard({ icon: Icon, title, text, date, priority }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur">
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50">
          <Icon className="h-6 w-6 text-[#fc362d]" />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#fc362d]">
              {priority}
            </p>
            <span className="text-xs font-bold text-slate-400">•</span>
            <p className="text-xs font-bold text-slate-500">{date}</p>
          </div>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            {title}
          </h2>

          <p className="mt-3 leading-7 text-slate-600">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function TeacherAnnouncements() {
  const announcements = [
    {
      icon: Bell,
      title: "National Day Celebration",
      text: "School-wide celebration activities will begin this Friday. Please prepare classroom participation and submit any activity requirements by Thursday.",
      date: "Feb 26, 2026",
      priority: "Announcement",
    },
    {
      icon: AlertCircle,
      title: "Assessment Reminder",
      text: "Upload all internal assessment marks before the end of the week. Late submissions will appear in the admin review queue.",
      date: "Feb 27, 2026",
      priority: "Important",
    },
    {
      icon: CheckCircle2,
      title: "Attendance Review",
      text: "Please review attendance records for all active classes and confirm any missing entries before the weekly report is generated.",
      date: "Feb 28, 2026",
      priority: "Action Needed",
    },
    {
      icon: CalendarDays,
      title: "Parent Meeting Schedule",
      text: "Parent meeting slots are now available. Teachers can review their assigned time blocks and prepare student progress notes.",
      date: "Mar 01, 2026",
      priority: "Schedule",
    },
  ];

  return (
    <AnimatedPage className="min-h-screen bg-transparent px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/teacher/dashboard"
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2 font-bold text-slate-700 shadow-sm hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to teacher dashboard
        </Link>

        <section className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur md:p-8">
          <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
            Teacher Announcements
          </p>

          <h1 className="mt-2 text-5xl font-black text-slate-950">
            Announcements
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            View school-wide updates, assessment reminders, parent meeting
            notices, and important teacher action items.
          </p>
        </section>

        <section className="mt-6 grid gap-5">
          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.title} {...announcement} />
          ))}
        </section>
      </div>
    </AnimatedPage>
  );
}
