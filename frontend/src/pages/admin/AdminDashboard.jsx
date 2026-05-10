import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Bot,
  UserCheck,
  GraduationCap,
  ClipboardCheck,
  Target,
  ShieldAlert,
  Sparkles,
  FileBarChart,
  ArrowRight,
} from "lucide-react";
import AdminShell from "../../components/admin/AdminShell";

function AdminStatCard({ icon: Icon, title, value, subtitle }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-[1.8rem] bg-gradient-to-br from-[#2c2c2c] to-[#151515] p-6 text-white shadow-lg"
    >
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
        <Icon className="h-6 w-6 text-[#fc362d]" />
      </div>

      <p className="text-sm font-bold text-white/60">{title}</p>

      <h3 className="mt-2 text-4xl font-black text-[#fc362d]">
        {value}
      </h3>

      <p className="mt-1 text-sm text-white/60">{subtitle}</p>
    </motion.div>
  );
}

function RiskStaffCard({ name, role, risk, note }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-950">{name}</h3>

          <p className="mt-1 text-sm font-semibold text-slate-500">
            {role}
          </p>
        </div>

        <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-black text-[#fc362d]">
          {risk}
        </span>
      </div>

      <p className="mt-4 leading-7 text-slate-600">{note}</p>
    </div>
  );
}

function QuickAction({ to, icon: Icon, title, text }) {
  return (
    <Link
      to={to}
      className="group rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:bg-red-50"
    >
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-red-50">
        <Icon className="h-6 w-6 text-[#fc362d]" />
      </div>

      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-black text-slate-950">{title}</h3>

        <ArrowRight className="h-5 w-5 text-[#fc362d] transition group-hover:translate-x-1" />
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </Link>
  );
}

export default function AdminDashboard() {
  return (
    <AdminShell
      title="School-wide command center"
      subtitle="Monitor teachers, students, observations, reviews, goals, risks, and AI-powered reporting from one admin workspace."
    >
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          icon={GraduationCap}
          title="Total Teachers"
          value="42"
          subtitle="Active staff members"
        />

        <AdminStatCard
          icon={Users}
          title="Total Students"
          value="1,248"
          subtitle="Across all grade levels"
        />

        <AdminStatCard
          icon={ClipboardCheck}
          title="Observations"
          value="318"
          subtitle="Completed this term"
        />

        <AdminStatCard
          icon={Target}
          title="Goal Completion"
          value="78%"
          subtitle="Student and staff goals"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
                Pending Reviews
              </p>

              <h2 className="text-3xl font-black text-slate-950">
                Performance review queue
              </h2>
            </div>

            <Link
              to="/admin/performance-reviews"
              className="font-bold text-[#fc362d] hover:text-red-700"
            >
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {[
              ["Elaine Borg", "Mathematics Y6", "Ready for AI draft"],
              ["Marcus Hale", "Science Y7", "Needs observation review"],
              ["Priya Sharma", "Language Arts Y5", "Pending admin approval"],
            ].map(([name, subject, status]) => (
              <div
                key={name}
                className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="text-xl font-black text-slate-950">
                    {name}
                  </h3>

                  <p className="mt-1 text-slate-500">{subject}</p>
                </div>

                <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-black text-[#fc362d]">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-lg">
          <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
            <Sparkles className="h-7 w-7 text-red-300" />
          </div>

          <p className="text-sm font-black uppercase tracking-wide text-red-300">
            AI Leadership Insight
          </p>

          <h2 className="mt-3 text-3xl font-black">
            Engagement support should be prioritized this week.
          </h2>

          <p className="mt-4 leading-8 text-white/70">
            AI detected a pattern across classroom observations: student
            engagement dips after assessment-heavy sessions. Recommended action:
            schedule targeted coaching and review goal progress for impacted
            classrooms.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
          <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
            High Priority Staff
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Risk-based prioritization
          </h2>

          <div className="mt-5 space-y-4">
            <RiskStaffCard
              name="Marcus Hale"
              role="Science Teacher"
              risk="High"
              note="Observation completion is below target and two goals are overdue."
            />

            <RiskStaffCard
              name="Nora Ellis"
              role="History Teacher"
              risk="Medium"
              note="Needs review follow-up after repeated documentation gaps."
            />
          </div>
        </div>

        <div className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
          <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
            Quick Actions
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Admin workflows
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <QuickAction
              to="/admin/ai-reports"
              icon={Bot}
              title="AI Weekly Reports"
              text="Generate automated leadership reports from attendance, goals, notes, and observations."
            />

            <QuickAction
              to="/admin/attendance"
              icon={UserCheck}
              title="Attendance Management"
              text="View, edit, and monitor all class attendance records."
            />

            <QuickAction
              to="/admin/performance-reviews"
              icon={ClipboardCheck}
              title="Generate Review"
              text="Create an AI-assisted performance review draft."
            />

            <QuickAction
              to="/admin/reports"
              icon={FileBarChart}
              title="Monthly Report"
              text="Prepare leadership reporting from observations and goals."
            />

            <QuickAction
              to="/admin/risk-insights"
              icon={ShieldAlert}
              title="Risk Insights"
              text="Review staff and student priority signals."
            />

            <QuickAction
              to="/admin/analytics"
              icon={Target}
              title="Goal Progress"
              text="Analyze school-wide goal completion trends."
            />
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
