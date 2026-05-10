import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronDown,
  X,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Users,
  BarChart3,
  Target,
  Sparkles,
} from "lucide-react";

const dropdowns = {
  virtualSchools: {
    label: "Virtual Schools",
    columns: [
      {
        title: "Products & Services",
        links: [
          {
            label: "Online & Blended Learning",
            text: "Flexible learning options for K-12 students.",
            to: "/login",
          },
          {
            label: "K-12 Online Schools",
            text: "Student-centered online school experience.",
            to: "/student/dashboard",
          },
          {
            label: "Academic Support Program",
            text: "Support tools for students, teachers, and families.",
            to: "/student/dashboard",
          },
          {
            label: "Educational Assessment",
            text: "Track progress, feedback, and performance data.",
            to: "/admin/analytics",
          },
        ],
      },
      {
        title: "Get Support",
        links: [
          {
            label: "Student Support",
            text: "Help students with goals, feedback, and progress.",
            to: "/student/dashboard",
          },
          {
            label: "Teacher Support",
            text: "Observation, notes, and recommendation workflows.",
            to: "/teacher/dashboard",
          },
          {
            label: "Admin Support",
            text: "Reports, reviews, analytics, and risk insights.",
            to: "/admin/dashboard",
          },
        ],
      },
      {
        title: "Learn & Connect",
        links: [
          {
            label: "AI Learning Support",
            text: "Generate summaries, encouragement, and next steps.",
            to: "/login",
          },
          {
            label: "Goal Tracking",
            text: "Create and monitor student goals.",
            to: "/teacher/goals",
          },
        ],
      },
    ],
  },

  collegeCareer: {
    label: "College & Career Readiness",
    columns: [
      {
        title: "College Ready",
        links: [
          {
            label: "Student Progress",
            text: "Track learning goals, feedback, and achievements.",
            to: "/student/dashboard",
          },
          {
            label: "Performance Reviews",
            text: "Admin-ready staff performance review workflow.",
            to: "/admin/performance-reviews",
          },
          {
            label: "Reports",
            text: "Generate progress and leadership reports.",
            to: "/admin/reports",
          },
        ],
      },
      {
        title: "Career Ready",
        links: [
          {
            label: "Digital Technology",
            text: "AI-ready workflows, dashboards, and automation.",
            to: "/admin/analytics",
          },
          {
            label: "Education",
            text: "Classroom observations and documentation workflows.",
            to: "/teacher/observations",
          },
          {
            label: "Workflow Automation",
            text: "Automated reporting, reminders, and review flows.",
            to: "/admin/dashboard",
          },
        ],
      },
      {
        title: "Get Support",
        links: [
          {
            label: "Contact Team",
            text: "Connect with the Dynamic Active team.",
            to: "/contact",
          },
          {
            label: "Launch Demo",
            text: "Try student, teacher, and admin access.",
            to: "/login",
          },
        ],
      },
    ],
  },

  browseSubject: {
    label: "Browse by Subject",
    columns: [
      {
        title: "Core Subjects",
        links: [
          {
            label: "Reading & Writing",
            text: "Student goals, reflections, and teacher feedback.",
            to: "/student/dashboard",
          },
          {
            label: "Mathematics",
            text: "Track practice, progress, and performance goals.",
            to: "/teacher/goals",
          },
          {
            label: "Science",
            text: "Observation notes, project feedback, and reports.",
            to: "/teacher/observations",
          },
        ],
      },
      {
        title: "Platform Areas",
        links: [
          {
            label: "Classroom Observations",
            text: "Teacher workflow for classroom notes.",
            to: "/teacher/observations",
          },
          {
            label: "AI Summaries",
            text: "Generate clean summaries from notes.",
            to: "/teacher/ai-summaries",
          },
          {
            label: "Risk Insights",
            text: "Admin view for priority support signals.",
            to: "/admin/risk-insights",
          },
        ],
      },
      {
        title: "AI Tools",
        links: [
          {
            label: "AI Recommendations",
            text: "Suggested next steps for teachers and admins.",
            to: "/teacher/ai-recommendations",
          },
          {
            label: "Analytics",
            text: "School-wide reporting and trend views.",
            to: "/admin/analytics",
          },
        ],
      },
    ],
  },
};

const searchItems = [
  {
    label: "Student Dashboard",
    icon: GraduationCap,
    to: "/student/dashboard",
  },
  {
    label: "Teacher Dashboard",
    icon: Users,
    to: "/teacher/dashboard",
  },
  {
    label: "Admin Dashboard",
    icon: BarChart3,
    to: "/admin/dashboard",
  },
  {
    label: "Classroom Observations",
    icon: BookOpen,
    to: "/teacher/observations",
  },
  {
    label: "Goal Tracking",
    icon: Target,
    to: "/teacher/goals",
  },
  {
    label: "AI Summaries",
    icon: Sparkles,
    to: "/teacher/ai-summaries",
  },
];

function DynamicActiveNavLogo() {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-3 rounded-2xl p-2 transition hover:bg-red-50"
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

      <p className="whitespace-nowrap text-xl font-black leading-tight tracking-tight text-slate-950">
        Dynamic Active
      </p>
    </Link>
  );
}

export default function LandingMegaNav() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [query, setQuery] = useState("");

  const activeMenu = activeDropdown ? dropdowns[activeDropdown] : null;

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    return searchItems.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  function handleDropdownClick(key) {
    setActiveDropdown((current) => (current === key ? null : key));
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/90 px-6 py-3 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between xl:gap-4">
          <DynamicActiveNavLogo />

          <nav className="flex shrink-0 flex-wrap items-center gap-2 xl:flex-nowrap">
            {Object.entries(dropdowns).map(([key, item]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleDropdownClick(key)}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-xs font-black transition ${
                  activeDropdown === key
                    ? "bg-[#fc362d] text-white"
                    : "bg-slate-50 text-slate-800 hover:bg-red-50 hover:text-[#fc362d]"
                }`}
              >
                {item.label}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition ${
                    activeDropdown === key ? "rotate-180" : ""
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center xl:max-w-[470px]">
            <div className="relative flex-1">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm focus-within:border-[#fc362d]">
                <Search className="h-4 w-4 text-slate-400" />

                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="rounded-full p-1 hover:bg-slate-100"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4 text-slate-400" />
                  </button>
                )}
              </div>

              {searchResults.length > 0 && (
  <div className="absolute right-0 top-12 z-50 w-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-2xl">
    {searchResults.map((item) => {
      const Icon = item.icon;

      return (
        <button
          key={item.label}
          type="button"
          onClick={() => setQuery(item.label)}
          className="flex w-full items-center gap-3 border-b border-slate-100 px-4 py-4 text-left transition last:border-b-0 hover:bg-red-50"
        >
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-red-50">
            <Icon className="h-5 w-5 text-[#fc362d]" />
          </div>

          <div>
            <span className="block font-black text-slate-800">
              {item.label}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Search result only — use Login to enter portals
            </span>
          </div>
        </button>
      );
    })}
  </div>
)}
            </div>

            <Link
              to="/login"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#fc362d] px-7 py-3 text-sm font-black text-white shadow-sm transition hover:bg-red-600"
            >
              Login
            </Link>
          </div>
        </div>

        {activeMenu && (
          <div className="mt-4 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#fc362d]">
                  Explore
                </p>
                <h2 className="mt-1 text-3xl font-black text-slate-950">
                  {activeMenu.label}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveDropdown(null)}
                className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 hover:bg-red-50"
                aria-label="Close dropdown"
              >
                <X className="h-5 w-5 text-slate-600" />
              </button>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {activeMenu.columns.map((column) => (
                <div key={column.title}>
                  <h3 className="mb-4 text-xl font-black text-slate-950">
                    {column.title}
                  </h3>

                  <div className="space-y-3">
                    {column.links.map((link) => (
                      <Link
                        key={link.label}
                        to={link.to}
                        onClick={() => setActiveDropdown(null)}
                        className="group block rounded-3xl border border-slate-100 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-red-100 hover:bg-red-50"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-black text-slate-950">
                              {link.label}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-slate-600">
                              {link.text}
                            </p>
                          </div>

                          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#fc362d]" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
