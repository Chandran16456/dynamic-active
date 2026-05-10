import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  LineChart,
  HeartHandshake,
  ClipboardCheck,
  NotebookPen,
  BarChart3,
  Target,
  Bot,
  Workflow,
  Database,
  PlugZap,
  BrainCircuit,
  UsersRound,
} from "lucide-react";
import LandingMegaNav from "../components/layout/LandingMegaNav";
import AnimatedPage from "../components/motion/AnimatedPage";
import Button from "../components/ui/Button";
import ScrollReveal from "../components/motion/ScrollReveal";

function HeroSchoolImpactCard() {
  return (
    <motion.div transition={{ duration: 0.4 }} className="relative">
      <div className="rounded-[2rem] bg-white/80 p-5 shadow-2xl ring-1 ring-slate-100 backdrop-blur-md">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#160606] via-[#0f0f12] to-[#050505] p-6 text-white shadow-xl">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-[#fc362d] blur-3xl" />
            <div className="absolute bottom-8 right-8 h-28 w-28 rounded-full bg-red-700 blur-3xl" />
          </div>

          <div className="relative">
            <div className="relative mb-8 flex min-h-[360px] items-center justify-center overflow-hidden rounded-[1.3rem] border border-red-500/30 bg-black/40 shadow-[0_0_35px_rgba(252,54,45,0.28)]">
              <div className="absolute inset-0 rounded-[1.3rem] bg-[radial-gradient(circle_at_center,rgba(252,54,45,0.18),transparent_58%)]" />

              <img
                src="/school.png"
                alt="Futuristic red school building"
                className="relative z-10 h-[330px] w-auto object-contain drop-shadow-[0_0_25px_rgba(252,54,45,0.55)]"
                style={{
                  animation: "schoolFloatRotate 7s ease-in-out infinite",
                }}
              />
            </div>

            <div>
              <p className="text-lg font-black leading-8 text-white">
                Empower every school.
                <br />
                Elevate every student.
              </p>

              <p className="mt-5 text-sm font-black text-[#fc362d]">
                Stronger together.
              </p>

              <div className="mt-4 h-1.5 w-28 rounded-full bg-[#fc362d]" />
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes schoolFloatRotate {
            0% {
              transform: rotateY(0deg) translateY(0px) scale(1);
            }
            25% {
              transform: rotateY(8deg) translateY(-8px) scale(1.02);
            }
            50% {
              transform: rotateY(0deg) translateY(0px) scale(1);
            }
            75% {
              transform: rotateY(-8deg) translateY(-8px) scale(1.02);
            }
            100% {
              transform: rotateY(0deg) translateY(0px) scale(1);
            }
          }
        `}
      </style>
    </motion.div>
  );
}

export default function LandingPage() {
  const features = [
    {
      icon: Sparkles,
      title: "AI Learning Support",
      text: "Generate friendly summaries, encouragement, and next-step recommendations.",
      color: "bg-lavenderSoft",
    },
    {
      icon: HeartHandshake,
      title: "Student-Friendly Progress",
      text: "Students can track goals, feedback, and achievements in a simple interface.",
      color: "bg-mintSoft",
    },
    {
      icon: LineChart,
      title: "Admin Insights",
      text: "School leaders can view reports, trends, and support priorities.",
      color: "bg-skySoft",
    },
    {
      icon: ShieldCheck,
      title: "Role-Based Access",
      text: "Admins, teachers, and students each get the right dashboard experience.",
      color: "bg-peachSoft",
    },
  ];

  const aiLayers = [
    {
      icon: Bot,
      title: "AI Summary Assistant",
      text: "Turns observation notes and performance feedback into clean, readable summaries.",
    },
    {
      icon: BrainCircuit,
      title: "Recommendation Engine",
      text: "Suggests next steps for students, teachers, and admins based on workflow context.",
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      text: "Can trigger reminders, review drafts, goal updates, and report generation flows.",
    },
    {
      icon: PlugZap,
      title: "API-Ready Design",
      text: "Built to connect with backend services, AI APIs, databases, and future integrations.",
    },
  ];

  const workflows = [
    {
      icon: ClipboardCheck,
      tag: "Observation",
      title: "Capture classroom notes",
      text: "Teachers can log observations, behavior insights, and learning milestones in one place.",
    },
    {
      icon: NotebookPen,
      tag: "Documentation",
      title: "Organize student records",
      text: "Store lesson plans, assessments, and progress notes with easy access for staff.",
    },
    {
      icon: BarChart3,
      tag: "Reporting",
      title: "Track progress trends",
      text: "Generate reports that highlight student growth, challenges, and support needs.",
    },
    {
      icon: Target,
      tag: "Goals",
      title: "Set achievement targets",
      text: "Define personalized goals and monitor completion for learners and teams.",
    },
    {
      icon: UsersRound,
      tag: "Review",
      title: "Collaborate across roles",
      text: "Admins, teachers, and students can review updates and work together effectively.",
    },
  ];

  return (
    <AnimatedPage className="min-h-screen overflow-hidden bg-transparent">
      <LandingMegaNav />

      <ScrollReveal>
        <section className="relative px-6 py-6">
          <div className="mx-auto grid max-w-7xl items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <motion.div
                transition={{ duration: 0.35 }}
                className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-sm ring-1 ring-slate-100"
              >
                Accessible K–12 growth platform
              </motion.div>

              <h1 className="max-w-3xl text-5xl font-black leading-tight text-slate-950 md:text-6xl">
                A friendly school platform for students, teachers, and admins.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Dynamic Active is built for teachers, trusted by admins, and
                personalized for every student through one accessible K–12
                experience.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="#features">
                  <Button variant="soft" className="w-full sm:w-auto">
                    View features
                  </Button>
                </a>

                <Link to="/about">
                  <Button variant="soft" className="w-full sm:w-auto">
                    About us
                  </Button>
                </Link>
              </div>
            </div>

            <HeroSchoolImpactCard />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="features" className="px-6 pb-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.08 }}
            className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  key={feature.title}
                  className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
                >
                  <div
                    className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl ${feature.color}`}
                  >
                    <Icon size={24} aria-hidden="true" />
                  </div>

                  <h3 className="text-lg font-black text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    {feature.text}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-white/90 p-6 shadow-xl ring-1 ring-slate-100 backdrop-blur-md md:p-10">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#fc362d]">
                Core Workflow Engine
              </p>

              <h2 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                Built around real education management workflows.
              </h2>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                Dynamic Active is designed to demonstrate the complete flow of a
                modern school platform — from observations and documentation to
                reviews, reporting, and goal progress.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {workflows.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.title}
                    whileHover={{ y: -6 }}
                    className="rounded-3xl border border-slate-100 bg-white/95 p-5 shadow-sm transition"
                  >
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-[#fc362d]">
                      <Icon size={24} aria-hidden="true" />
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {item.tag}
                    </span>

                    <h3 className="mt-4 text-lg font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="px-6 pb-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="min-h-[520px] overflow-hidden rounded-[2rem] bg-white/90 shadow-xl ring-1 ring-slate-100 backdrop-blur-md">
              <img
                src="/students-group.png"
                alt="Group of students waving"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {aiLayers.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.title}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-[2rem] bg-white/90 p-6 shadow-lg ring-1 ring-slate-100 backdrop-blur-md"
                  >
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#fc362d] text-white">
                      <Icon size={24} aria-hidden="true" />
                    </div>

                    <h3 className="text-xl font-black text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="px-6 pb-28">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] bg-black shadow-xl ring-1 ring-slate-100">
              <video
                src="/videos/tech-savvy-vid.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-red-300">
                  Student Phase = Exploration
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/90 p-8 shadow-xl ring-1 ring-slate-100 backdrop-blur-md md:p-10">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[#fc362d]">
                    Product Flow
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-slate-950">
                    From note to action
                  </h3>
                </div>

                <Database className="h-10 w-10 text-[#fc362d]" />
              </div>

              <div className="space-y-4">
                {[
                  "Teacher completes classroom observation notes",
                  "AI generates a clean summary and recommendation",
                  "Admin reviews staff performance and support needs",
                  "Dashboard updates goals, trends, and priority areas",
                  "Reports are prepared for leadership review",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-red-50 text-sm font-black text-[#fc362d]">
                      {index + 1}
                    </div>

                    <p className="pt-1 font-semibold leading-7 text-slate-700">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </AnimatedPage>
  );
}
