import AdminShell from "../../components/admin/AdminShell";

export default function RiskInsights() {
  return (
    <AdminShell
      title="Risk Insights"
      subtitle="Identify high-priority staff, overdue goals, incomplete reviews, and classroom support needs before they become larger issues."
    >
      <section className="grid gap-5 xl:grid-cols-3">
        {[
          ["Marcus Hale", "High Risk", "Two overdue goals and low observation completion."],
          ["Nora Ellis", "Medium Risk", "Documentation gaps across recent classroom notes."],
          ["Grade 6 Science", "Medium Risk", "Engagement score dropped after assessment week."],
        ].map(([name, level, text]) => (
          <div
            key={name}
            className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur"
          >
            <p className="rounded-full bg-red-50 px-4 py-2 text-sm font-black text-[#fc362d]">
              {level}
            </p>

            <h2 className="mt-5 text-2xl font-black text-slate-950">
              {name}
            </h2>

            <p className="mt-4 leading-7 text-slate-600">{text}</p>

            <button className="mt-6 rounded-full bg-[#fc362d] px-5 py-3 font-black text-white hover:bg-red-600">
              Review Details
            </button>
          </div>
        ))}
      </section>
    </AdminShell>
  );
}
