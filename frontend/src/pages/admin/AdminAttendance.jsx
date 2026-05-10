import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  RefreshCw,
  Save,
  Trash2,
  UserCheck,
  UsersRound,
  XCircle,
} from "lucide-react";
import AnimatedPage from "../../components/motion/AnimatedPage";
import {
  deleteAttendanceSession,
  getAttendanceRecords,
  getAttendanceSessions,
  updateAttendanceRecord,
} from "../../api/attendanceApi";

const ATTENDANCE_STATUSES = ["Present", "Absent", "Late", "Excused"];

function formatDateTime(value) {
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

function statusStyle(status) {
  if (status === "Present") return "bg-green-50 text-green-700 ring-green-100";
  if (status === "Absent") return "bg-red-50 text-red-700 ring-red-100";
  if (status === "Late") return "bg-yellow-50 text-yellow-700 ring-yellow-100";
  return "bg-slate-50 text-slate-700 ring-slate-100";
}

function SummaryCard({ icon: Icon, title, value, color, subtitle }) {
  return (
    <div className="rounded-[1.7rem] bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
      <div className={`grid h-12 w-12 place-items-center rounded-2xl ${color}`}>
        <Icon className="h-6 w-6 text-slate-900" />
      </div>

      <p className="mt-4 text-sm font-bold text-slate-500">{title}</p>
      <h3 className="mt-1 text-3xl font-black text-slate-950">{value}</h3>

      {subtitle && (
        <p className="mt-2 text-sm font-semibold text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}

export default function AdminAttendance() {
  const [sessions, setSessions] = useState([]);
  const [records, setRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  const [loadingSessions, setLoadingSessions] = useState(false);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSelectSession(session) {
    try {
      setSelectedSession(session);
      setLoadingRecords(true);
      setError("");
      setMessage("");

      const data = await getAttendanceRecords(session.id);
      setRecords(data);
    } catch (err) {
      setError("Could not load attendance records for this session.");
    } finally {
      setLoadingRecords(false);
    }
  }

  async function loadSessions() {
    try {
      setLoadingSessions(true);
      setLoadingRecords(true);
      setError("");
      setMessage("");

      const sessionsData = await getAttendanceSessions();
      setSessions(sessionsData);

      if (sessionsData.length === 0) {
        setSelectedSession(null);
        setRecords([]);
        setAllRecords([]);
        return;
      }

      const recordsBySession = await Promise.all(
        sessionsData.map(async (session) => {
          const sessionRecords = await getAttendanceRecords(session.id);

          return {
            session,
            records: sessionRecords.map((record) => ({
              ...record,
              class_name: session.class_name,
              session_title: session.session_title,
              session_date: session.session_date,
            })),
          };
        })
      );

      const flattenedRecords = recordsBySession.flatMap((item) => item.records);
      setAllRecords(flattenedRecords);

      const firstSessionWithRecords =
        recordsBySession.find((item) => item.records.length > 0)?.session ||
        sessionsData[0];

      setSelectedSession(firstSessionWithRecords);

      const selectedRecords =
        recordsBySession.find(
          (item) => item.session.id === firstSessionWithRecords.id
        )?.records || [];

      setRecords(selectedRecords);
    } catch (err) {
      setError("Could not load attendance sessions.");
    } finally {
      setLoadingSessions(false);
      setLoadingRecords(false);
    }
  }

  useEffect(() => {
    loadSessions();
  }, []);

  function updateRecord(index, field, value) {
    setRecords((prev) =>
      prev.map((record, recordIndex) =>
        recordIndex === index
          ? {
              ...record,
              [field]: value,
            }
          : record
      )
    );
  }

  async function handleSaveAllRecords() {
    if (!selectedSession) {
      setError("Select an attendance session first.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      await Promise.all(
        records.map((record) =>
          updateAttendanceRecord(record.id, {
            status: record.status,
            notes: record.notes || "",
          })
        )
      );

      setMessage("Attendance records updated successfully.");
      await loadSessions();
    } catch (err) {
      setError("Could not update attendance records.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteSession(session) {
    const confirmDelete = window.confirm(
      `Delete attendance session "${session.session_title}"? This will also delete its records.`
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);
      setError("");
      setMessage("");

      await deleteAttendanceSession(session.id);

      setMessage("Attendance session deleted successfully.");
      await loadSessions();
    } catch (err) {
      setError("Could not delete attendance session.");
    } finally {
      setDeleting(false);
    }
  }

  const presentCount = allRecords.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = allRecords.filter(
    (record) => record.status === "Absent"
  ).length;

  const lateCount = allRecords.filter((record) => record.status === "Late").length;

  const excusedCount = allRecords.filter(
    (record) => record.status === "Excused"
  ).length;

  return (
    <AnimatedPage className="min-h-screen bg-transparent px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/admin/dashboard"
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2 font-bold text-slate-700 shadow-sm hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Admin Dashboard
        </Link>

        <section className="rounded-[2rem] bg-white/95 p-8 shadow-sm ring-1 ring-slate-100 backdrop-blur">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-red-50">
            <UserCheck className="h-8 w-8 text-[#fc362d]" />
          </div>

          <p className="mt-6 text-sm font-black uppercase tracking-wide text-[#fc362d]">
            Admin Oversight
          </p>

          <h1 className="mt-2 text-5xl font-black text-slate-950">
            Attendance Management
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            View all teacher attendance sessions, monitor attendance patterns,
            and modify student attendance records when needed.
          </p>
        </section>

        {message && (
          <p className="mt-5 rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {error}
          </p>
        )}

        <section className="mt-6 grid gap-5 md:grid-cols-4">
          <SummaryCard
            icon={CheckCircle2}
            title="Present"
            value={presentCount}
            subtitle="Across all sessions"
            color="bg-green-50"
          />

          <SummaryCard
            icon={XCircle}
            title="Absent"
            value={absentCount}
            subtitle="Across all sessions"
            color="bg-red-50"
          />

          <SummaryCard
            icon={Clock}
            title="Late"
            value={lateCount}
            subtitle="Across all sessions"
            color="bg-yellow-50"
          />

          <SummaryCard
            icon={UsersRound}
            title="Excused"
            value={excusedCount}
            subtitle="Across all sessions"
            color="bg-slate-50"
          />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
                  All Sessions
                </p>

                <h2 className="text-2xl font-black text-slate-950">
                  Attendance Sessions
                </h2>
              </div>

              <button
                type="button"
                onClick={loadSessions}
                className="grid h-10 w-10 place-items-center rounded-full bg-red-50 text-[#fc362d] hover:bg-red-100"
                aria-label="Refresh attendance sessions"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            {loadingSessions ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                Loading sessions...
              </p>
            ) : sessions.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                No attendance sessions found.
              </p>
            ) : (
              <div className="max-h-[620px] space-y-4 overflow-y-auto pr-2">
                {sessions.map((session) => (
                  <article
                    key={session.id}
                    className={`rounded-3xl border p-5 shadow-sm transition ${
                      selectedSession?.id === session.id
                        ? "border-[#fc362d] bg-red-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectSession(session)}
                      className="w-full text-left"
                    >
                      <p className="text-xs font-black uppercase tracking-wide text-[#fc362d]">
                        {session.class_name}
                      </p>

                      <h3 className="mt-2 text-lg font-black text-slate-950">
                        {session.session_title}
                      </h3>

                      <p className="mt-2 text-sm font-semibold text-slate-500">
                        {formatDateTime(session.session_date)}
                      </p>

                      <p className="mt-2 text-xs font-semibold text-slate-400">
                        Created by user ID: {session.created_by_id}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteSession(session)}
                      disabled={deleting}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Session
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
                  Session Records
                </p>

                <h2 className="text-3xl font-black text-slate-950">
                  {selectedSession
                    ? `${selectedSession.class_name} - ${selectedSession.session_title}`
                    : "Select a session"}
                </h2>

                {selectedSession && (
                  <p className="mt-2 font-semibold text-slate-500">
                    {formatDateTime(selectedSession.session_date)}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleSaveAllRecords}
                disabled={!selectedSession || saving || records.length === 0}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#fc362d] px-5 py-3 font-black text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

            {!selectedSession ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                Select an attendance session from the left panel.
              </p>
            ) : loadingRecords ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                Loading records...
              </p>
            ) : records.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                This session has no attendance records yet.
              </p>
            ) : (
              <div className="space-y-4">
                {records.map((record, index) => (
                  <article
                    key={record.id}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
                      <div>
                        <h3 className="text-xl font-black text-slate-950">
                          {record.student_name}
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                          Student ID: {record.student_id || "Demo"}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          Marked by user ID: {record.marked_by_id}
                        </p>
                      </div>

                      <select
                        value={record.status}
                        onChange={(event) =>
                          updateRecord(index, "status", event.target.value)
                        }
                        className={`rounded-2xl px-4 py-3 font-black ring-1 outline-none ${statusStyle(
                          record.status
                        )}`}
                      >
                        {ATTENDANCE_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <textarea
                      value={record.notes || ""}
                      onChange={(event) =>
                        updateRecord(index, "notes", event.target.value)
                      }
                      placeholder="Optional admin attendance note..."
                      rows="2"
                      className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                    />
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}