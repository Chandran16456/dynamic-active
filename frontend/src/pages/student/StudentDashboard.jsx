import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Trophy,
  CheckCircle2,
  MessageCircle,
  CalendarDays,
  Target,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  FileCheck2,
  Video,
  UsersRound,
  ExternalLink,
  RefreshCw,
  LogOut,
  X,
  ListChecks,
  ClipboardList,
  UserCheck,
  Clock,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedPage from "../../components/motion/AnimatedPage";
import Button from "../../components/ui/Button";
import { getGoals } from "../../api/goalApi";
import { getNotes } from "../../api/noteApi";
import { createSchedule, getSchedules } from "../../api/scheduleApi";
import {
  getAttendanceRecords,
  getAttendanceSessions,
} from "../../api/attendanceApi";

function getStoredUser() {
  try {
    const user = localStorage.getItem("dynamic_active_user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

function StudentMiniVideo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.04 }}
      className="relative shrink-0"
    >
      <div className="relative rounded-[2rem] bg-white p-2 shadow-xl ring-1 ring-slate-100">
        <div className="h-24 w-24 overflow-hidden rounded-[1.5rem] bg-slate-950 sm:h-28 sm:w-28">
          <video
            src="/videos/student-mini.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

function DynamicActiveStudentLogo() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-4 rounded-[1.7rem] p-2 transition hover:bg-red-50"
      aria-label="Go to Dynamic Active home page"
    >
      <svg
        width="52"
        height="35"
        viewBox="0 0 52 34.904"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-9 w-auto shrink-0"
      >
        <path
          d="M 33.385 17.096 C 33.385 25.947 26.209 33.123 17.358 33.123 C 8.506 33.123 1.331 25.947 1.331 17.096 C 1.331 8.244 8.505 1.068 17.358 1.068 C 26.209 1.068 33.385 8.244 33.385 17.096 Z"
          fill="rgb(252, 54, 45)"
        />
        <path
          d="M 50.669 17.096 C 50.669 25.947 43.564 33.123 34.799 33.123 C 26.034 33.123 18.929 25.947 18.929 17.096 C 18.929 8.244 26.033 1.068 34.799 1.068 C 43.563 1.068 50.669 8.244 50.669 17.096 Z"
          fill="rgba(252, 54, 45, 0.74)"
        />
        <path
          d="M 26.121 30.518 C 30.495 27.655 33.385 22.713 33.385 17.096 C 33.385 11.478 30.496 6.536 26.121 3.675 C 21.62 6.655 18.917 11.697 18.929 17.096 C 18.917 22.495 21.619 27.538 26.121 30.518 Z"
          fill="rgba(54, 74, 255, 0.2)"
        />
      </svg>

      <p className="text-3xl font-black tracking-tight text-slate-950 group-hover:text-[#fc362d]">
        Dynamic Active
      </p>
    </Link>
  );
}

function StatCard({ icon: Icon, title, value, subtitle, color, onClick }) {
  const CardWrapper = onClick ? "button" : "div";

  return (
    <motion.div whileHover={{ y: -4 }}>
      <CardWrapper
        type={onClick ? "button" : undefined}
        onClick={onClick}
        className={`w-full rounded-[1.7rem] bg-white/95 p-5 text-left shadow-sm ring-1 ring-slate-100 backdrop-blur transition ${
          onClick ? "cursor-pointer hover:bg-red-50" : ""
        }`}
      >
        <div
          className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl ${color}`}
        >
          <Icon className="h-6 w-6 text-slate-900" />
        </div>

        <p className="text-sm font-bold text-slate-500">{title}</p>
        <h3 className="mt-1 text-3xl font-black text-slate-950">{value}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
      </CardWrapper>
    </motion.div>
  );
}

function formatScheduleTime(value) {
  if (!value) return "No time";

  const date = new Date(value);

  return date.toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function StudentDetailModal({
  activePanel,
  onClose,
  goals,
  notes,
  completedGoals,
}) {
  if (!activePanel) return null;

  const panelTitles = {
    goals: "My Active Goals",
    notes: "Teacher Notes",
    completed: "Completed Goals",
  };

  const panelIcons = {
    goals: ListChecks,
    notes: ClipboardList,
    completed: Trophy,
  };

  const PanelIcon = panelIcons[activePanel];

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50">
              <PanelIcon className="h-6 w-6 text-[#fc362d]" />
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
                Student Details
              </p>
              <h2 className="text-2xl font-black text-slate-950">
                {panelTitles[activePanel]}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-[#fc362d]"
            aria-label="Close detail panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-6">
          {activePanel === "goals" && (
            <div className="space-y-4">
              {goals.length === 0 ? (
                <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                  No active goals yet.
                </p>
              ) : (
                goals.map((goal) => (
                  <article
                    key={goal.id}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-black text-slate-950">
                          {goal.title}
                        </h3>
                        <p className="mt-1 font-semibold text-slate-500">
                          {goal.status}
                        </p>
                      </div>

                      <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-black text-[#fc362d]">
                        {goal.progress}%
                      </span>
                    </div>

                    <p className="mt-4 leading-7 text-slate-600">
                      {goal.description}
                    </p>

                    <div className="mt-5 h-3 rounded-full bg-slate-100">
                      <div
                        className="h-3 rounded-full bg-[#fc362d]"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </article>
                ))
              )}
            </div>
          )}

          {activePanel === "notes" && (
            <div className="space-y-4">
              {notes.length === 0 ? (
                <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                  No teacher notes yet.
                </p>
              ) : (
                notes.map((note) => (
                  <article
                    key={note.id}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-xs font-black uppercase tracking-wide text-[#fc362d]">
                      {note.target_type}
                    </p>

                    <h3 className="mt-2 text-xl font-black text-slate-950">
                      {note.title}
                    </h3>

                    <p className="mt-2 font-semibold text-slate-500">
                      For: {note.target_name}
                    </p>

                    <p className="mt-4 leading-7 text-slate-600">
                      {note.body}
                    </p>
                  </article>
                ))
              )}
            </div>
          )}

          {activePanel === "completed" && (
            <div className="space-y-4">
              {completedGoals.length === 0 ? (
                <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                  No completed goals yet.
                </p>
              ) : (
                completedGoals.map((goal) => (
                  <article
                    key={goal.id}
                    className="rounded-3xl border border-green-100 bg-green-50 p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-700" />
                      <h3 className="text-xl font-black text-slate-950">
                        {goal.title}
                      </h3>
                    </div>

                    <p className="mt-3 leading-7 text-slate-700">
                      {goal.description}
                    </p>

                    <p className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-green-700">
                      Completed at {goal.progress}%
                    </p>
                  </article>
                ))
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function StudentIntegrationTools() {
  const [draftText, setDraftText] = useState("");
  const [plagResult, setPlagResult] = useState(null);

  function handlePlagiarismCheck() {
    if (!draftText.trim()) {
      setPlagResult({
        similarity: 0,
        originality: 0,
        message: "Paste or type a draft first.",
      });
      return;
    }

    const wordCount = draftText.trim().split(/\s+/).length;
    const similarity = Math.min(18, Math.max(4, Math.round(wordCount * 0.12)));

    setPlagResult({
      similarity,
      originality: 100 - similarity,
      message:
        "Prototype scan completed. A backend plagiarism-checking API can replace this demo result later.",
    });
  }

  return (
    <section className="rounded-[2rem] bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
      <div className="mb-5">
        <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
          Student Integrations
        </p>

        <h2 className="text-3xl font-black text-slate-950">
          Academic tools and meeting links
        </h2>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50">
              <FileCheck2 className="h-7 w-7 text-[#fc362d]" />
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
                Plagiarism Checker
              </p>

              <h3 className="text-2xl font-black text-slate-950">
                Check assignment originality
              </h3>
            </div>
          </div>

          <textarea
            value={draftText}
            onChange={(event) => setDraftText(event.target.value)}
            placeholder="Paste your homework draft here to check originality..."
            className="min-h-[150px] w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 p-4 outline-none transition focus:border-[#fc362d] focus:bg-white"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handlePlagiarismCheck}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#fc362d] px-6 py-3 font-black text-white transition hover:bg-red-600"
            >
              Run Check
              <ArrowRight className="h-5 w-5" />
            </button>

            {plagResult && (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-slate-700">
                <span className="text-[#fc362d]">
                  Similarity: {plagResult.similarity}%
                </span>{" "}
                · Originality: {plagResult.originality}%
              </div>
            )}
          </div>

          {plagResult && (
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {plagResult.message}
            </p>
          )}
        </div>

        <div className="grid gap-5">
          <a
            href="https://meet.google.com/"
            target="_blank"
            rel="noreferrer"
            className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:bg-red-50"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50">
                <Video className="h-7 w-7 text-[#fc362d]" />
              </div>

              <ExternalLink className="h-5 w-5 text-slate-400 transition group-hover:text-[#fc362d]" />
            </div>

            <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
              Online Meeting
            </p>

            <h3 className="mt-2 text-2xl font-black text-slate-950">
              Join class meeting
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Open the online classroom meeting link for live support,
              check-ins, or teacher guidance.
            </p>
          </a>

          <a
            href="https://teams.microsoft.com/"
            target="_blank"
            rel="noreferrer"
            className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:bg-red-50"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50">
                <UsersRound className="h-7 w-7 text-[#fc362d]" />
              </div>

              <ExternalLink className="h-5 w-5 text-slate-400 transition group-hover:text-[#fc362d]" />
            </div>

            <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
              Microsoft Teams
            </p>

            <h3 className="mt-2 text-2xl font-black text-slate-950">
              Open Teams classroom
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Connect to your Microsoft Teams classroom, group discussion, or
              scheduled teacher meeting.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}

function StudentCalendarPanel({ schedules, onCreate }) {
  const today = new Date();

  function toDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getDateKeyFromApi(value) {
    if (!value) return "";
    return toDateKey(new Date(value));
  }

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(toDateKey(today));
  const [displayMonth, setDisplayMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [formData, setFormData] = useState({
    title: "",
    schedule_type: "task",
    start_time: "09:00",
    end_time: "10:00",
    location: "",
    meeting_link: "",
    description: "",
  });

  const monthLabel = displayMonth.toLocaleDateString([], {
    month: "long",
    year: "numeric",
  });

  const selectedDateItems = schedules.filter((item) => {
    return getDateKeyFromApi(item.start_time) === selectedDate;
  });

  const upcomingItems = [...schedules]
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
    .slice(0, 3);

  function getCalendarDays() {
    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();
    const previousMonthLastDay = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = startDay - 1; i >= 0; i -= 1) {
      const date = new Date(year, month - 1, previousMonthLastDay - i);

      days.push({
        key: toDateKey(date),
        dayNumber: date.getDate(),
        isCurrentMonth: false,
      });
    }

    for (let day = 1; day <= totalDays; day += 1) {
      const date = new Date(year, month, day);

      days.push({
        key: toDateKey(date),
        dayNumber: day,
        isCurrentMonth: true,
      });
    }

    const remainingSlots = 42 - days.length;

    for (let day = 1; day <= remainingSlots; day += 1) {
      const date = new Date(year, month + 1, day);

      days.push({
        key: toDateKey(date),
        dayNumber: date.getDate(),
        isCurrentMonth: false,
      });
    }

    return days;
  }

  function goToPreviousMonth() {
    setDisplayMonth((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
    });
  }

  function goToNextMonth() {
    setDisplayMonth((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      title: formData.title,
      schedule_type: formData.schedule_type,
      target_role: "student",
      target_name: "Maya Student",
      start_time: `${selectedDate}T${formData.start_time}:00`,
      end_time: `${selectedDate}T${formData.end_time}:00`,
      location: formData.location,
      meeting_link: formData.meeting_link,
      description: formData.description,
      task_status: "Scheduled",
    };

    await onCreate(payload);

    setFormData({
      title: "",
      schedule_type: "task",
      start_time: "09:00",
      end_time: "10:00",
      location: "",
      meeting_link: "",
      description: "",
    });
  }

  const calendarDays = getCalendarDays();
  const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <>
      <section className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsCalendarOpen(true)}
              className="grid h-16 w-16 place-items-center rounded-3xl bg-red-50 text-[#fc362d] transition hover:scale-105 hover:bg-red-100"
              aria-label="Open calendar"
            >
              <CalendarDays className="h-8 w-8" />
            </button>

            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
                Schedule
              </p>

              <h3 className="text-3xl font-black text-slate-950">
                My Calendar & Timetable
              </h3>

              <p className="mt-1 text-sm font-semibold text-slate-500">
                Click the calendar icon to open the monthly planner.
              </p>
            </div>
          </div>

          
        </div>

        <div className="mt-6 rounded-[1.7rem] border border-slate-200 bg-slate-50 p-5">
          <h4 className="text-xl font-black text-slate-950">
            Upcoming Schedule
          </h4>

          {upcomingItems.length === 0 ? (
            <p className="mt-4 rounded-2xl bg-white p-5 font-bold text-slate-600">
              No upcoming tasks or meetings yet.
            </p>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {upcomingItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-xs font-black uppercase tracking-wide text-[#fc362d]">
                    {item.schedule_type}
                  </p>

                  <h4 className="mt-2 text-lg font-black text-slate-950">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {formatScheduleTime(item.start_time)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {isCalendarOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 px-4 py-8 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-auto max-w-6xl rounded-[2rem] bg-white p-6 shadow-2xl"
          >
            <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50">
                  <CalendarDays className="h-8 w-8 text-[#fc362d]" />
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
                    Schedule
                  </p>

                  <h3 className="text-3xl font-black text-slate-950">
                    Monthly Calendar
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCalendarOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-[#fc362d]"
                aria-label="Close calendar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h4 className="text-2xl font-black text-slate-950">
                    {monthLabel}
                  </h4>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goToPreviousMonth}
                      className="grid h-11 w-11 place-items-center rounded-full bg-slate-50 text-slate-700 hover:bg-red-50 hover:text-[#fc362d]"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      onClick={goToNextMonth}
                      className="grid h-11 w-11 place-items-center rounded-full bg-slate-50 text-slate-700 hover:bg-red-50 hover:text-[#fc362d]"
                      aria-label="Next month"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {weekdayLabels.map((day, index) => (
                    <div
                      key={`${day}-${index}`}
                      className="py-2 text-center text-sm font-black text-slate-500"
                    >
                      {day}
                    </div>
                  ))}

                  {calendarDays.map((day) => {
                    const isSelected = selectedDate === day.key;
                    const isToday = toDateKey(today) === day.key;
                    const hasItems = schedules.some(
                      (item) => getDateKeyFromApi(item.start_time) === day.key
                    );

                    return (
                      <button
                        key={day.key}
                        type="button"
                        onClick={() => setSelectedDate(day.key)}
                        className={`relative grid h-12 place-items-center rounded-full text-base font-black transition ${
                          isSelected
                            ? "bg-[#fc362d] text-white shadow-md"
                            : day.isCurrentMonth
                            ? "text-slate-900 hover:bg-red-50 hover:text-[#fc362d]"
                            : "text-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {day.dayNumber}

                        {hasItems && !isSelected && (
                          <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-[#fc362d]" />
                        )}

                        {isToday && !isSelected && (
                          <span className="absolute inset-0 rounded-full ring-2 ring-red-100" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-[#fc362d]">
                  Selected date: {selectedDate}
                </p>
              </div>

              <div className="grid gap-5">
                <div className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <h4 className="mb-4 text-xl font-black text-slate-950">
                    Items on {selectedDate}
                  </h4>

                  {selectedDateItems.length === 0 ? (
                    <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                      No tasks or meetings on this date.
                    </p>
                  ) : (
                    <div className="max-h-[260px] space-y-4 overflow-y-auto pr-2">
                      {selectedDateItems.map((item) => (
                        <article
                          key={item.id}
                          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                        >
                          <p className="text-xs font-black uppercase tracking-wide text-[#fc362d]">
                            {item.schedule_type}
                          </p>

                          <h4 className="mt-2 text-lg font-black text-slate-950">
                            {item.title}
                          </h4>

                          <p className="mt-2 text-sm font-semibold text-slate-500">
                            {formatScheduleTime(item.start_time)}
                          </p>

                          {item.location && (
                            <p className="mt-2 text-sm text-slate-600">
                              Location: {item.location}
                            </p>
                          )}

                          {item.description && (
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                              {item.description}
                            </p>
                          )}

                          {item.meeting_link && (
                            <a
                              href={item.meeting_link}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-4 inline-flex rounded-full bg-[#fc362d] px-4 py-2 text-sm font-black text-white hover:bg-red-600"
                            >
                              Open Meeting
                            </a>
                          )}
                        </article>
                      ))}
                    </div>
                  )}
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="rounded-[1.7rem] border border-slate-200 bg-slate-50 p-5"
                >
                  <h4 className="text-xl font-black text-slate-950">
                    Create task or meeting
                  </h4>

                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Type
                      </label>

                      <select
                        name="schedule_type"
                        value={formData.schedule_type}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#fc362d]"
                      >
                        <option value="task">Task</option>
                        <option value="meeting">Meeting</option>
                        <option value="support">Support Session</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Title
                      </label>

                      <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Reading homework or Google Meet check-in"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#fc362d]"
                        required
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-bold text-slate-700">
                          Start
                        </label>

                        <input
                          name="start_time"
                          type="time"
                          value={formData.start_time}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#fc362d]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-bold text-slate-700">
                          End
                        </label>

                        <input
                          name="end_time"
                          type="time"
                          value={formData.end_time}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#fc362d]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Location
                      </label>

                      <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Room 204 or Online"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#fc362d]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Meet Link
                      </label>

                      <input
                        name="meeting_link"
                        value={formData.meeting_link}
                        onChange={handleChange}
                        placeholder="https://meet.google.com/..."
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#fc362d]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Details
                      </label>

                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Add instructions, homework details, or meeting notes..."
                        rows="4"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#fc362d]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-[#fc362d] px-5 py-3 font-black text-white hover:bg-red-600"
                    >
                      Save to Calendar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

function StudentAttendancePanel({ attendanceRows }) {
  const [activeStatus, setActiveStatus] = useState(null);

  const statusCards = [
    {
      status: "Present",
      label: "Present",
      icon: CheckCircle2,
      count: attendanceRows.filter((row) => row.status === "Present").length,
      cardClass: "bg-green-40 text-green-700 ring-green-100",
      iconBoxClass: "bg-white/60",
      iconClass: "text-green-700",
    },
    {
      status: "Absent",
      label: "Absent",
      icon: XCircle,
      count: attendanceRows.filter((row) => row.status === "Absent").length,
      cardClass: "bg-red-40 text-red-700 ring-red-100",
      iconBoxClass: "bg-white/60",
      iconClass: "text-red-700",
    },
    {
      status: "Late",
      label: "Late",
      icon: Clock,
      count: attendanceRows.filter((row) => row.status === "Late").length,
      cardClass: "bg-yellow-40 text-yellow-700 ring-yellow-100",
      iconBoxClass: "bg-white/60",
      iconClass: "text-yellow-700",
    },
    {
      status: "Excused",
      label: "Excused",
      icon: UsersRound,
      count: attendanceRows.filter((row) => row.status === "Excused").length,
      cardClass: "bg-slate-40 text-slate-700 ring-slate-100",
      iconBoxClass: "bg-white/60",
      iconClass: "text-slate-700",
    },
  ];

  const activeRows = activeStatus
    ? attendanceRows.filter((row) => row.status === activeStatus)
    : [];

  const activeCard = statusCards.find((card) => card.status === activeStatus);
  const ActiveIcon = activeCard?.icon;

  function formatAttendanceDate(value) {
    if (!value) return "No date";

    return new Date(value).toLocaleString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function badgeStyle(status) {
    if (status === "Present") return "bg-green-40 text-green-700";
    if (status === "Absent") return "bg-red-40 text-red-700";
    if (status === "Late") return "bg-yellow-40 text-yellow-700";
    return "bg-slate-50 text-slate-700";
  }

  return (
    <>
      <section className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-red-50">
              <UserCheck className="h-7 w-7 text-[#fc362d]" />
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
                Attendance
              </p>

              <h2 className="text-3xl font-black leading-tight text-slate-950 md:text-4xl">
                My Attendance History
              </h2>

              <p className="mt-2 text-sm font-semibold text-slate-500">
                Click a status card to view details.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {statusCards.map((card) => {
              const Icon = card.icon;

              return (
                <button
                  key={card.status}
                  type="button"
                  onClick={() => setActiveStatus(card.status)}
                  className={`min-w-[110px] rounded-3xl px-4 py-4 text-center shadow-sm ring-1 transition hover:-translate-y-1 hover:shadow-md ${card.cardClass}`}
                >
                  <div
                    className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${card.iconBoxClass}`}
                  >
                    <Icon className={`h-7 w-7 ${card.iconClass}`} />
                  </div>

                  <p className="mt-3 text-sm font-black leading-none">
                    {card.label}
                  </p>

                  <p className="mt-2 text-3xl font-black leading-none text-slate-950">
                    {card.count}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {activeStatus && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 px-4 py-8 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-auto max-w-5xl rounded-[2rem] bg-white p-6 shadow-2xl"
          >
            <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ring-1 ${activeCard?.cardClass}`}
                >
                  {ActiveIcon && (
                    <ActiveIcon className={`h-7 w-7 ${activeCard.iconClass}`} />
                  )}
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
                    Attendance Details
                  </p>

                  <h3 className="text-3xl font-black text-slate-950">
                    {activeStatus} Records
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {activeRows.length} record
                    {activeRows.length === 1 ? "" : "s"} found.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveStatus(null)}
                className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-[#fc362d]"
                aria-label="Close attendance details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {activeRows.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                No {activeStatus.toLowerCase()} attendance records yet.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {activeRows.map((row) => (
                  <article
                    key={`${row.session_id}-${row.id}`}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-[#fc362d]">
                          {row.class_name}
                        </p>

                        <h3 className="mt-2 text-xl font-black text-slate-950">
                          {row.session_title}
                        </h3>
                      </div>

                      <span
                        className={`rounded-full px-4 py-2 text-sm font-black ${badgeStyle(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
                      <Clock className="h-4 w-4" />
                      {formatAttendanceDate(row.session_date)}
                    </div>

                    {row.notes && (
                      <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                        {row.notes}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}

export default function StudentDashboard() {
  const user = getStoredUser();

  const [goals, setGoals] = useState([]);
  const [notes, setNotes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [attendanceRows, setAttendanceRows] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [activePanel, setActivePanel] = useState(null);

  async function loadStudentAttendance() {
    const sessions = await getAttendanceSessions();

    const rowsBySession = await Promise.all(
      sessions.map(async (session) => {
        const records = await getAttendanceRecords(session.id);

        return records.map((record) => ({
          ...record,
          class_name: session.class_name,
          session_title: session.session_title,
          session_date: session.session_date,
        }));
      })
    );

    return rowsBySession.flat();
  }

  async function loadStudentData() {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const [goalsData, notesData, schedulesData, attendanceData] =
        await Promise.all([
          getGoals(),
          getNotes(),
          getSchedules(),
          loadStudentAttendance(),
        ]);

      setGoals(goalsData);
      setNotes(notesData);
      setSchedules(schedulesData);
      setAttendanceRows(attendanceData);
    } catch (err) {
      setError(
        "Could not load student backend data. Please log in again or check backend."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudentData();
  }, []);

  async function handleCreateSchedule(payload) {
    try {
      setError("");
      setMessage("");

      await createSchedule(payload);

      setMessage("Calendar item saved successfully.");
      await loadStudentData();
    } catch (err) {
      setError("Could not save calendar item.");
    }
  }

  const averageProgress =
    goals.length > 0
      ? Math.round(
          goals.reduce((total, goal) => total + Number(goal.progress || 0), 0) /
            goals.length
        )
      : 0;

  const completedGoalsList = goals.filter(
    (goal) => goal.status === "Completed"
  );

  const completedGoals = completedGoalsList.length;
  const mainGoal = goals[0];

  return (
    <AnimatedPage className="relative min-h-screen bg-transparent px-6 py-6 font-sans">
      <div className="mx-auto max-w-7xl space-y-6">
        <StudentDetailModal
          activePanel={activePanel}
          onClose={() => setActivePanel(null)}
          goals={goals}
          notes={notes}
          completedGoals={completedGoalsList}
        />

        <header className="rounded-[2rem] bg-white/90 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <StudentMiniVideo />

              <div>
                <DynamicActiveStudentLogo />

                <p className="mt-2 text-sm font-bold text-slate-500">
                  Welcome, {user?.full_name || "Student"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={loadStudentData}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-50 px-5 py-3 font-bold text-[#fc362d] hover:bg-red-100"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>

              <Link to="/">
                <Button variant="secondary" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Exit demo
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {message && (
          <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
            {message}
          </p>
        )}

        {error && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {error}
          </p>
        )}

        {loading && (
          <p className="rounded-2xl bg-white/90 px-4 py-3 font-bold text-slate-600">
            Loading student dashboard data...
          </p>
        )}

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={BookOpen}
            title="Average Progress"
            value={`${averageProgress}%`}
            subtitle="Across your active learning goals."
            color="bg-red-50"
          />

          <StatCard
            icon={Target}
            title="Active Goals"
            value={goals.length}
            subtitle="Click to read your assigned goals."
            color="bg-orange-50"
            onClick={() => setActivePanel("goals")}
          />

          <StatCard
            icon={MessageCircle}
            title="Teacher Notes"
            value={notes.length}
            subtitle="Click to read feedback and support notes."
            color="bg-yellow-50"
            onClick={() => setActivePanel("notes")}
          />

          <StatCard
            icon={Trophy}
            title="Completed"
            value={completedGoals}
            subtitle="Click to view completed goals."
            color="bg-green-50"
            onClick={() => setActivePanel("completed")}
          />
        </section>

        <section className="grid items-start gap-6 xl:grid-cols-[0.78fr_1.22fr]">
  <div className="space-y-6">
    <div className="rounded-[2rem] bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
            Current Goal
          </p>

          <h2 className="text-2xl font-black text-slate-950">
            My Learning Progress
          </h2>
        </div>

        <TrendingUp className="h-7 w-7 text-[#fc362d]" />
      </div>

      {!mainGoal ? (
        <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
          No goals assigned yet. Ask your teacher to create a learning goal for
          your name.
        </p>
      ) : (
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-950">
                {mainGoal.title}
              </h3>

              <p className="mt-1 font-semibold text-slate-500">
                {mainGoal.status}
              </p>
            </div>

            <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-black text-[#fc362d]">
              {mainGoal.progress}%
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {mainGoal.description}
          </p>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${mainGoal.progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-[#fc362d]"
            />
          </div>
        </article>
      )}
    </div>

    <div className="rounded-[2rem] bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
      <h3 className="text-xl font-black text-slate-950">Today’s Tasks</h3>

      <div className="mt-5 space-y-4">
        {goals.slice(0, 3).map((goal, index) => (
          <div
            key={goal.id}
            className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"
          >
            <div
              className={`grid h-9 w-9 place-items-center rounded-full ${
                index === 0
                  ? "bg-red-100 text-red-600"
                  : "bg-white text-slate-400"
              }`}
            >
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <p className="font-semibold text-slate-800">{goal.title}</p>
          </div>
        ))}

        {goals.length === 0 && (
          <p className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-600">
            No tasks yet.
          </p>
        )}
      </div>
    </div>

    <div className="rounded-[2rem] bg-gradient-to-br from-orange-50 to-red-50 p-5 shadow-sm ring-1 ring-orange-100">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white">
          <MessageCircle className="h-6 w-6 text-[#fc362d]" />
        </div>

        <div>
          <p className="text-sm font-bold text-red-600">Teacher Feedback</p>

          <h3 className="text-xl font-black text-slate-950">Recent Notes</h3>
        </div>
      </div>

      {notes.length === 0 ? (
        <p className="leading-7 text-slate-700">
          No teacher feedback notes yet.
        </p>
      ) : (
        <div className="space-y-4">
          {notes.slice(0, 3).map((note) => (
            <div key={note.id} className="rounded-3xl bg-white/90 p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-[#fc362d]">
                {note.target_type}
              </p>

              <h4 className="mt-2 text-lg font-black text-slate-950">
                {note.title}
              </h4>

              <p className="mt-2 leading-7 text-slate-600">{note.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>

  <div className="space-y-6">
    <StudentCalendarPanel
      schedules={schedules}
      onCreate={handleCreateSchedule}
    />

    <StudentAttendancePanel attendanceRows={attendanceRows} />
  </div>
</section>

        <StudentIntegrationTools />

        <section className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
          <div className="mb-5 flex items-center gap-3">
            <Award className="h-7 w-7 text-[#fc362d]" />

            <h2 className="text-3xl font-black text-slate-950">
              Achievements
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-red-50 p-5">
              <p className="font-black text-slate-950">Focus Star</p>
              <p className="mt-2 text-sm text-slate-600">
                Stayed focused during weekly work.
              </p>
            </div>

            <div className="rounded-3xl bg-orange-50 p-5">
              <p className="font-black text-slate-950">Progress Builder</p>
              <p className="mt-2 text-sm text-slate-600">
                Updated learning goal progress.
              </p>
            </div>

            <div className="rounded-3xl bg-yellow-50 p-5">
              <p className="font-black text-slate-950">Reflection Starter</p>
              <p className="mt-2 text-sm text-slate-600">
                Completed a reading reflection task.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
