import AdminShell from "../../components/admin/AdminShell";

export default function AdminReports() {
  return (
    <AdminShell
      title="Reports"
      subtitle="Create monthly leadership reports using observations, reviews, goals, risks, and AI-generated summaries."
    >
      <section className="grid gap-6 xl:grid-cols-3">
        {[
          ["Monthly Leadership Report", "Ready to generate", "Observations, goals, reviews, and risk insights."],
          ["Goal Progress Report", "78% complete", "School-wide goal completion and overdue goal trends."],
          ["Observation Summary", "318 completed", "Classroom observation completion by teacher and grade."],
        ].map(([title, status, text]) => (
          <div
            key={title}
            className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur"
          >
            <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
              {status}
            </p>
            <h2 className="mt-3 text-2xl font-black text-slate-950">
              {title}
            </h2>
            <p className="mt-4 leading-7 text-slate-600">{text}</p>

            <button className="mt-6 rounded-full bg-[#fc362d] px-5 py-3 font-black text-white hover:bg-red-600">
              Generate Report
            </button>
          </div>
        ))}
      </section>
    </AdminShell>
  );
}
