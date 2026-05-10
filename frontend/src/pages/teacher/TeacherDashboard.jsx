import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  ClipboardList,
  Bell,
  Users,
  FileText,
  CheckCircle2,
  ArrowRight,
  LogOut,
  ClipboardCheck,
  NotebookPen,
  Target,
  Bot,
  BrainCircuit,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedPage from "../../components/motion/AnimatedPage";
import Button from "../../components/ui/Button";

function DynamicActiveLogo() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-3 rounded-2xl p-2 transition hover:bg-red-50"
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

      <div>
        <p className="text-xl font-black tracking-tight text-slate-950 group-hover:text-[#fc362d]">
          Dynamic Active
        </p>
      </div>
    </Link>
  );
}

function SidebarItem({ icon: Icon, label, active = false, to }) {
  const className = `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold transition ${
    active
      ? "bg-[#fc362d] text-white shadow-sm"
      : "text-slate-700 hover:bg-red-50"
  }`;

  if (to) {
    return (
      <Link to={to} className={className}>
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-[1.6rem] bg-gradient-to-br from-[#2c2c2c] to-[#161616] p-5 text-white shadow-lg"
    >
      <p className="text-sm font-semibold text-white/70">{title}</p>
      <h3 className="mt-2 text-4xl font-black text-[#fc362d]">{value}</h3>
      <p className="mt-1 text-sm text-white/60">{subtitle}</p>
    </motion.div>
  );
}

function MiniClassCard({ title, time, subject, color }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${color}`}>
        {time}
      </div>

      <h4 className="text-lg font-black text-slate-900">{title}</h4>
      <p className="mt-1 text-sm text-slate-600">{subject}</p>
    </motion.div>
  );
}

function TimelineCard({ title, subtitle, time, dotColor }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`mt-1 h-4 w-4 rounded-full ${dotColor}`} />
        <div className="mt-2 h-full w-px bg-slate-200" />
      </div>

      <div className="mb-5 flex-1 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <h4 className="text-lg font-black text-slate-900">{title}</h4>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        <p className="mt-3 text-xs font-semibold text-slate-400">{time}</p>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, to }) {
  const content = (
    <>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50">
        <Icon className="h-6 w-6 text-[#fc362d]" />
      </div>
      <span className="text-sm font-bold text-slate-800">{label}</span>
    </>
  );

  if (to) {
    return (
      <motion.div whileHover={{ y: -3 }}>
        <Link
          to={to}
          className="flex h-full flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:bg-red-50"
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      whileHover={{ y: -3 }}
      className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:bg-red-50"
    >
      {content}
    </motion.button>
  );
}

function SubjectCard({ title, grade, students }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{grade}</p>
          <h4 className="mt-1 text-2xl font-black text-slate-900">{title}</h4>
          <p className="mt-2 text-sm text-slate-600">
            {students} students enrolled
          </p>
        </div>

        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50">
          <BookOpen className="h-6 w-6 text-[#fc362d]" />
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <Button variant="soft" className="text-sm">
          View
        </Button>

        <Button variant="secondary" className="text-sm">
          Actions
        </Button>
      </div>
    </motion.div>
  );
}

function TimetableGrid() {
  const slots = [
    {
      day: "Mon",
      subject: "Mathematics Y6",
      time: "10:00–11:00",
      color: "bg-amber-500",
    },
    {
      day: "Mon",
      subject: "Science Y6",
      time: "12:00–13:00",
      color: "bg-sky-500",
    },
    {
      day: "Tue",
      subject: "Teacher Event",
      time: "10:00–11:00",
      color: "bg-pink-500",
    },
    {
      day: "Wed",
      subject: "Spanish Y6",
      time: "12:00–13:00",
      color: "bg-cyan-500",
    },
    {
      day: "Thu",
      subject: "Math Quiz",
      time: "14:00–15:00",
      color: "bg-red-500",
    },
    {
      day: "Fri",
      subject: "Meeting with Parents",
      time: "15:00–16:00",
      color: "bg-emerald-600",
    },
  ];

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500">Weekly Schedule</p>
          <h3 className="text-2xl font-black text-slate-950">February 2026</h3>
        </div>

        <div className="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600">
          Teacher timetable
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="rounded-2xl bg-slate-50 p-3 text-center font-bold text-slate-700"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {slots.map((slot) => (
          <motion.div
            key={`${slot.day}-${slot.subject}-${slot.time}`}
            whileHover={{ scale: 1.02 }}
            className={`${slot.color} rounded-3xl p-4 text-white shadow-md`}
          >
            <p className="text-sm font-bold opacity-90">{slot.time}</p>
            <h4 className="mt-2 text-xl font-black">{slot.subject}</h4>
            <p className="mt-1 text-sm opacity-90">{slot.day}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function TeacherDashboard() {
  return (
    <AnimatedPage className="min-h-screen bg-transparent px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto grid max-w-[1500px] gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[2rem] bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
          <div className="mb-8">
            <DynamicActiveLogo />
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-3 px-4 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Main
              </p>

              <div className="space-y-2">
                <SidebarItem
                  icon={LayoutDashboard}
                  label="Dashboard"
                  active
                  to="/teacher/dashboard"
                />

                <SidebarItem icon={CalendarDays} label="Calendar & Timetable" />

                <SidebarItem icon={ClipboardList} label="Sessions" />

                <SidebarItem icon={Users} label="My Classes" />

                <SidebarItem icon={BookOpen} label="My Subjects" />

                <SidebarItem
                  icon={CheckCircle2}
                  label="Attendance"
                  to="/teacher/attendance"
                />

                <SidebarItem icon={FileText} label="Assignments & Homework" />

                <SidebarItem
                  icon={Bell}
                  label="Announcements"
                  to="/teacher/announcements"
                />
              </div>
            </div>

            <div>
              <p className="mb-3 px-4 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Teacher Workflows
              </p>

              <div className="space-y-2">
                <SidebarItem
                  icon={ClipboardCheck}
                  label="Classroom Observations"
                  to="/teacher/observations"
                />

                <SidebarItem
                  icon={NotebookPen}
                  label="Notes / Documentation"
                  to="/teacher/notes"
                />

                <SidebarItem
                  icon={Target}
                  label="Goal Creation"
                  to="/teacher/goals"
                />
              </div>
            </div>

            <div>
              <p className="mb-3 px-4 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                AI Tools
              </p>

              <div className="space-y-2">
                <SidebarItem
                  icon={Bot}
                  label="AI Summaries"
                  to="/teacher/ai-summaries"
                />

                <SidebarItem
                  icon={BrainCircuit}
                  label="AI Recommendations"
                  to="/teacher/ai-recommendations"
                />

                <SidebarItem
                  icon={Sparkles}
                  label="AI Goal Suggestions"
                  to="/teacher/ai-goals"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/">
              <Button
                variant="secondary"
                className="flex w-full items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Exit demo
              </Button>
            </Link>
          </div>
        </aside>

        <main className="space-y-6">
          <section className="rounded-[2rem] bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-red-100 text-2xl font-black text-[#fc362d]">
                  EB
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-red-500">
                    Teacher Dashboard
                  </p>

                  <h2 className="text-4xl font-black text-slate-950">
                    Welcome back, Elaine Borg
                  </h2>

                  <p className="mt-2 text-slate-600">
                    Manage classes, monitor sessions, and track your weekly
                    teaching plan.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <StatCard title="Classes" value="8" subtitle="My active classes" />
                <StatCard title="Students" value="104" subtitle="Across all sections" />
                <StatCard title="Subjects" value="12" subtitle="Assigned this term" />
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
            <div className="rounded-[2rem] bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-950">
                  Timeline View
                </h3>

                <span className="text-sm font-bold text-red-500">Today</span>
              </div>

              <TimelineCard
                title="Math 6 Long Quiz"
                subtitle="Mathematics Y6 • Elaine Borg"
                time="Today • 10:00–11:00"
                dotColor="bg-sky-500"
              />

              <TimelineCard
                title="Teacher Event"
                subtitle="Teacher event meeting"
                time="03/02/2026 • 10:00–11:00"
                dotColor="bg-pink-500"
              />

              <TimelineCard
                title="Meeting with Parents"
                subtitle="Parent meeting session"
                time="05/02/2026 • 15:00–17:00"
                dotColor="bg-emerald-500"
              />

              <TimelineCard
                title="Y6 Language Exams"
                subtitle="Language Y6 • Elaine Borg"
                time="06/02/2026 • 10:00–11:00"
                dotColor="bg-amber-500"
              />
            </div>

            <div className="space-y-5">
              <div className="rounded-[2rem] bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-950">
                    TimeTable
                  </h3>

                  <div className="text-sm font-bold text-slate-500">
                    26/02/2026
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <MiniClassCard
                    title="Y6 Span"
                    subject="Spanish Y6"
                    time="11:00 – 12:00"
                    color="bg-red-50 text-red-600"
                  />

                  <MiniClassCard
                    title="Y6B"
                    subject="History Y6"
                    time="12:00 – 13:00"
                    color="bg-orange-50 text-orange-700"
                  />

                  <MiniClassCard
                    title="Y6B"
                    subject="Geography Y6"
                    time="13:00 – 14:00"
                    color="bg-red-100 text-red-700"
                  />
                </div>
              </div>

              <TimetableGrid />
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2rem] bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
              <h3 className="text-2xl font-black text-slate-950">
                Quick Actions
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <QuickAction icon={Bell} label="Messages" />

                <QuickAction icon={Users} label="My Classes" />

                <QuickAction icon={ClipboardList} label="Sessions" />

                <QuickAction icon={CalendarDays} label="Availability" />

                <QuickAction
                  icon={CheckCircle2}
                  label="Attendance"
                  to="/teacher/attendance"
                />

                <QuickAction icon={FileText} label="Files" />
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-950">
                  My Subjects
                </h3>

                <button className="inline-flex items-center gap-2 font-bold text-red-600 hover:text-red-700">
                  View all
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <SubjectCard
                  title="Spanish Y6"
                  grade="Year 6 • Standard"
                  students="28"
                />

                <SubjectCard
                  title="Science Y6"
                  grade="Year 6 • Standard"
                  students="36"
                />

                <SubjectCard
                  title="Mathematics Y6"
                  grade="Year 6 • Standard"
                  students="40"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </AnimatedPage>
  );
}
