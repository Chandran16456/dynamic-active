import { useEffect, useState } from "react";
import {
  Bot,
  CalendarDays,
  FileText,
  RefreshCw,
  Sparkles,
  Trash2,
  WandSparkles,
} from "lucide-react";
import AdminShell from "../../components/admin/AdminShell";
import {
  deleteAIReport,
  generateAdminWeeklyReport,
  getAIReports,
  runAdminReportAutomationNow,
} from "../../api/aiReportApi";

function formatDate(value) {
  if (!value) return "No date";

  return new Date(value).toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function ReportCard({ report, active, onClick, onDelete, deleting }) {
  return (
    <article
      className={`rounded-3xl border p-5 shadow-sm transition ${
        active
          ? "border-[#fc362d] bg-red-50"
          : "border-slate-200 bg-white hover:bg-red-50"
      }`}
    >
      <button type="button" onClick={onClick} className="w-full text-left">
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-red-50">
          <FileText className="h-6 w-6 text-[#fc362d]" />
        </div>

        <p className="text-xs font-black uppercase tracking-wide text-[#fc362d]">
          {report.report_type}
        </p>

        <h3 className="mt-2 text-xl font-black text-slate-950">
          {report.title}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-500">
          <CalendarDays className="h-4 w-4" />
          {formatDate(report.created_at)}
        </div>

        <p className="mt-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-green-700">
          {report.status}
        </p>
      </button>

      <button
        type="button"
        onClick={onDelete}
        disabled={deleting}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </button>
    </article>
  );
}

export default function AdminAIReports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [runningAutomation, setRunningAutomation] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadReports() {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const data = await getAIReports();

      setReports(data);

      if (data.length > 0) {
        setSelectedReport(data[0]);
      } else {
        setSelectedReport(null);
      }
    } catch (err) {
      setError("Could not load AI reports. Check backend and admin login.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  async function handleGenerateReport() {
    try {
      setGenerating(true);
      setError("");
      setMessage("");

      const report = await generateAdminWeeklyReport();

      setMessage("AI weekly report generated successfully.");
      setSelectedReport(report);

      await loadReports();
    } catch (err) {
      setError(
        "Could not generate AI report. Check Groq key, backend, and admin auth."
      );
    } finally {
      setGenerating(false);
    }
  }

  async function handleRunAutomationNow() {
    try {
      setRunningAutomation(true);
      setError("");
      setMessage("");

      const report = await runAdminReportAutomationNow();

      setMessage("Automation ran successfully and saved a new AI report.");
      setSelectedReport(report);

      await loadReports();
    } catch (err) {
      setError("Could not run automation now. Check backend and admin auth.");
    } finally {
      setRunningAutomation(false);
    }
  }

  async function handleDeleteReport(reportId) {
    const confirmDelete = window.confirm("Delete this AI report?");

    if (!confirmDelete) return;

    try {
      setDeleting(true);
      setError("");
      setMessage("");

      await deleteAIReport(reportId);

      setMessage("AI report deleted successfully.");
      await loadReports();
    } catch (err) {
      setError("Could not delete AI report.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminShell
      title="AI Weekly Reports"
      subtitle="Generate AI-powered admin insight reports from attendance, goals, notes, and classroom observations."
    >
      {message && (
        <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
          {message}
        </p>
      )}

      {error && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
          {error}
        </p>
      )}

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-red-50">
              <Bot className="h-8 w-8 text-[#fc362d]" />
            </div>

            <p className="mt-6 text-sm font-black uppercase tracking-wide text-[#fc362d]">
              AI Automation Layer
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-950">
              Generate Admin Weekly Report
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              This report uses backend data already stored in PostgreSQL and
              turns it into an admin-ready weekly insight summary.
            </p>

            <button
              type="button"
              onClick={handleGenerateReport}
              disabled={generating || runningAutomation}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#fc362d] px-5 py-4 font-black text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <WandSparkles className="h-5 w-5" />
              {generating ? "Generating Report..." : "Generate Weekly Report"}
            </button>

            <button
              type="button"
              onClick={handleRunAutomationNow}
              disabled={runningAutomation || generating}
              className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 px-5 py-4 font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw className="h-5 w-5" />
              {runningAutomation ? "Running Automation..." : "Run Automation Now"}
            </button>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              <p className="font-black text-slate-900">What this proves:</p>
              <p>
                The manual button creates the same type of report that the
                APScheduler background job creates automatically every Friday at
                4:00 PM.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
                  Saved Reports
                </p>

                <h2 className="text-2xl font-black text-slate-950">
                  Report History
                </h2>
              </div>

              <button
                type="button"
                onClick={loadReports}
                className="grid h-10 w-10 place-items-center rounded-full bg-red-50 text-[#fc362d] hover:bg-red-100"
                aria-label="Refresh AI reports"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            {loading ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                Loading reports...
              </p>
            ) : reports.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                No reports generated yet.
              </p>
            ) : (
              <div className="max-h-[620px] space-y-4 overflow-y-auto pr-2">
                {reports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    active={selectedReport?.id === report.id}
                    onClick={() => setSelectedReport(report)}
                    onDelete={() => handleDeleteReport(report.id)}
                    deleting={deleting}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
          <div className="mb-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50">
              <Sparkles className="h-7 w-7 text-[#fc362d]" />
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
                AI Output
              </p>

              <h2 className="text-3xl font-black text-slate-950">
                {selectedReport ? selectedReport.title : "No report selected"}
              </h2>

              {selectedReport && (
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Generated: {formatDate(selectedReport.created_at)}
                </p>
              )}
            </div>
          </div>

          {!selectedReport ? (
            <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
              Generate or select a report to preview it here.
            </p>
          ) : (
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-slate-700">
                {selectedReport.report_text}
              </pre>
            </div>
          )}
        </div>
      </section>
    </AdminShell>
  );
}