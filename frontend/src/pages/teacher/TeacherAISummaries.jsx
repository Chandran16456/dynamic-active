import { Link } from "react-router-dom";
import { ArrowLeft, Bot } from "lucide-react";
import AnimatedPage from "../../components/motion/AnimatedPage";

export default function TeacherAISummaries() {
  return (
    <AnimatedPage className="min-h-screen bg-transparent px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/teacher/dashboard" className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2 font-bold text-slate-700 shadow-sm hover:bg-white">
          <ArrowLeft className="h-4 w-4" />
          Back to Teacher Dashboard
        </Link>

        <section className="rounded-[2rem] bg-white/95 p-8 shadow-sm ring-1 ring-slate-100 backdrop-blur">
          <Bot className="h-14 w-14 text-[#fc362d]" />
          <p className="mt-6 text-sm font-black uppercase tracking-wide text-[#fc362d]">AI Tools</p>
          <h1 className="mt-2 text-5xl font-black text-slate-950">AI Summaries</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Generate clean summaries from classroom observations, teacher notes, and student progress records.
          </p>
        </section>
      </div>
    </AnimatedPage>
  );
}
