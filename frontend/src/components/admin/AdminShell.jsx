import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardCheck,
  FileBarChart,
  LineChart,
  ShieldAlert,
  Users,
  Bot,
  UserCheck,
  LogOut,
} from "lucide-react";
import AnimatedPage from "../motion/AnimatedPage";
import Button from "../ui/Button";

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

function SidebarItem({ icon: Icon, label, to }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold transition ${
        active
          ? "bg-[#fc362d] text-white shadow-sm"
          : "text-slate-700 hover:bg-red-50"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}

export default function AdminShell({ title, subtitle, children }) {
  return (
    <AnimatedPage className="min-h-screen bg-transparent px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto grid max-w-[1500px] gap-6 lg:grid-cols-[290px_1fr]">
        <aside className="rounded-[2rem] bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
          <div className="mb-8">
            <DynamicActiveLogo />
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-3 px-4 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Admin
              </p>

              <div className="space-y-2">
                <SidebarItem
                  icon={LayoutDashboard}
                  label="Dashboard"
                  to="/admin/dashboard"
                />

                <SidebarItem
                  icon={UserCheck}
                  label="Attendance"
                  to="/admin/attendance"
                />
                
                <SidebarItem
                icon={Bot}
                label="AI Reports"
                to="/admin/ai-reports"
                />

                <SidebarItem
                  icon={ClipboardCheck}
                  label="Performance Reviews"
                  to="/admin/performance-reviews"
                />

                <SidebarItem
                  icon={FileBarChart}
                  label="Reports"
                  to="/admin/reports"
                />

                <SidebarItem
                  icon={LineChart}
                  label="Analytics"
                  to="/admin/analytics"
                />

                <SidebarItem
                  icon={ShieldAlert}
                  label="Risk Insights"
                  to="/admin/risk-insights"
                />

                <SidebarItem
                  icon={Users}
                  label="User Management"
                  to="/admin/dashboard"
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
          <section className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur md:p-8">
            <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
              Admin Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-black text-slate-950 md:text-5xl">
              {title}
            </h1>

            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
              {subtitle}
            </p>
          </section>

          {children}
        </main>
      </div>
    </AnimatedPage>
  );
}