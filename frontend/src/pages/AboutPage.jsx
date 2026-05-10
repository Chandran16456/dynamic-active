import { Link } from "react-router-dom";
import {
  Info,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import AnimatedPage from "../components/motion/AnimatedPage";
import Button from "../components/ui/Button";

function DynamicActiveLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 rounded-2xl p-2 transition hover:bg-red-50"
      aria-label="Go back to landing page"
    >
      <svg
        width="52"
        height="35"
        viewBox="0 0 52 34.904"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-9 w-auto"
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

      <p className="text-2xl font-black tracking-tight text-slate-950">
        Dynamic Active
      </p>
    </Link>
  );
}

function Bullet({ children }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-1 h-5 w-5 text-[#fc362d]" />
      <p className="text-lg text-slate-700">{children}</p>
    </div>
  );
}

function InfoRow({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-4">
      <Icon className="h-5 w-5 text-[#fc362d]" />
      <p className="text-lg text-slate-700">{children}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <AnimatedPage className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
          <DynamicActiveLogo />

          <div className="flex items-center gap-3">
            <Link to="/contact">
              <Button variant="soft" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>

            <Link to="/login">
              <Button className="w-full bg-[#fc362d] text-white hover:bg-[#e92f27] sm:w-auto">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[1.05fr_1fr]">
        {/* Left side */}
        <div>
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[#fff1ef]">
              <Info className="h-4 w-4 text-[#fc362d]" />
            </div>
            <span className="text-lg font-bold text-slate-900">ABOUT US</span>
          </div>

          <h1 className="text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
            About Dynamic Active
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-600">
            We build modern, student-friendly digital experiences that help
            schools, teachers, and administrators work smarter and support
            learners better.
          </p>

          <div className="mt-10 space-y-6">
            <Bullet>
              We design accessible, clean, and easy-to-use education platforms.
            </Bullet>
            <Bullet>
              We focus on growth, engagement, and role-based learning
              experiences.
            </Bullet>
            <Bullet>
              We combine thoughtful design with real functionality for K–12
              environments.
            </Bullet>
          </div>

          {/* Visit us section */}
          <div className="mt-16">
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-4xl font-black text-slate-950">Visit Us</h2>

              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#fc362d] px-8 py-5 text-lg font-bold text-white transition hover:bg-[#e92f27]"
              >
                Schedule A Meeting
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <div className="overflow-hidden rounded-[2rem] shadow-sm">
              <iframe
                title="Dynamic Active location"
                src="https://www.google.com/maps?q=440+East+Huntington+Drive,+Suite+300,+Arcadia,+CA+91006&output=embed"
                className="h-[420px] w-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>

            <div className="mt-8 space-y-5">
              <InfoRow icon={MapPin}>
                440 East Huntington Drive, Suite 300, Arcadia, CA 91006
              </InfoRow>
              <InfoRow icon={Phone}>+1 310 461 8882</InfoRow>
              <InfoRow icon={Mail}>team@dynamicactive.com</InfoRow>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="rounded-[2.2rem] border border-indigo-100 bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-3xl font-black text-slate-950">Who We Are</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Dynamic Active is focused on building digital products that feel
            modern, helpful, and intuitive. Our goal is to create technology
            that supports education through clarity, usability, and a
            human-centered experience.
          </p>

          <div className="mt-8 space-y-5">
            <div className="rounded-3xl border border-slate-200 p-6">
              <h3 className="text-xl font-black text-slate-950">Our Mission</h3>
              <p className="mt-3 text-slate-600 leading-8">
                To create educational software that empowers students, helps
                teachers save time, and gives administrators clear insights.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6">
              <h3 className="text-xl font-black text-slate-950">What We Do</h3>
              <p className="mt-3 text-slate-600 leading-8">
                We build web platforms, dashboards, and role-based experiences
                with accessible design, clean interactions, and scalable
                technology.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6">
              <h3 className="text-xl font-black text-slate-950">
                Why It Matters
              </h3>
              <p className="mt-3 text-slate-600 leading-8">
                Schools need tools that are simple, efficient, and welcoming.
                We aim to deliver exactly that through thoughtful design and
                meaningful functionality.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link to="/contact">
              <Button className="bg-[#fc362d] text-white hover:bg-[#e92f27]">
                Talk To Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
