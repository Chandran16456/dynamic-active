import AdminShell from "../../components/admin/AdminShell";

export default function PerformanceReviews() {
  return (
    <AdminShell
      title="Performance Reviews"
      subtitle="Generate, review, and approve staff performance summaries using observations, goals, notes, and AI-assisted review drafts."
    >
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
          <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
            Review Queue
          </p>

          <div className="mt-5 space-y-4">
            {[
              ["Elaine Borg", "Mathematics Y6", "Ready to generate review"],
              ["Marcus Hale", "Science Y7", "Needs admin review"],
              ["Priya Sharma", "Language Arts Y5", "Draft in progress"],
            ].map(([name, role, status]) => (
              <div
                key={name}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h2 className="text-2xl font-black text-slate-950">{name}</h2>
                <p className="mt-1 text-slate-500">{role}</p>
                <p className="mt-4 rounded-full bg-red-50 px-4 py-2 text-sm font-black text-[#fc362d]">
                  {status}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-lg">
          <p className="text-sm font-black uppercase tracking-wide text-red-300">
            AI Review Draft
          </p>

          <h2 className="mt-3 text-3xl font-black">
            Elaine Borg shows strong classroom organization and consistent goal
            tracking.
          </h2>

          <p className="mt-5 leading-8 text-white/70">
            Based on classroom observations, student progress updates, and
            documentation history, the recommended review rating is “Strong
            Performance.” Suggested improvement area: continue adding structured
            reflection notes after assessments.
          </p>

          <button className="mt-8 rounded-full bg-[#fc362d] px-6 py-3 font-black text-white hover:bg-red-600">
            Approve Draft
          </button>
        </div>
      </section>
    </AdminShell>
  );
}
