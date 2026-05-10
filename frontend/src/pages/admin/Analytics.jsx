import AdminShell from "../../components/admin/AdminShell";

function ProgressBar({ label, value }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="font-black text-slate-800">{label}</p>
        <p className="font-black text-[#fc362d]">{value}%</p>
      </div>
      <div className="h-3 rounded-full bg-slate-100">
        <div
          className="h-3 rounded-full bg-[#fc362d]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function Analytics() {
  return (
    <AdminShell
      title="Analytics"
      subtitle="Review school-wide trends, classroom performance, goal progress, observation patterns, and leadership insights."
    >
      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
          <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
            Progress Analytics
          </p>

          <div className="mt-6 space-y-6">
            <ProgressBar label="Goal completion rate" value={78} />
            <ProgressBar label="Observation completion" value={84} />
            <ProgressBar label="Review completion" value={63} />
            <ProgressBar label="Documentation quality" value={71} />
          </div>
        </div>

        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-lg">
          <p className="text-sm font-black uppercase tracking-wide text-red-300">
            AI Analytics Insight
          </p>

          <h2 className="mt-3 text-3xl font-black">
            Student engagement is the most common growth area.
          </h2>

          <p className="mt-5 leading-8 text-white/70">
            Across the latest observation records, engagement-related notes
            appeared most frequently. Recommended action: schedule targeted
            classroom strategies and monitor goal progress weekly.
          </p>
        </div>
      </section>
    </AdminShell>
  );
}
