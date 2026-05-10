import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  RefreshCw,
  Save,
  UserCheck,
  UsersRound,
} from "lucide-react";
import AnimatedPage from "../../components/motion/AnimatedPage";
import Button from "../../components/ui/Button";
import {
  createAttendanceSession,
  getAttendanceRecords,
  getAttendanceSessions,
  getStudentsForAttendance,
  markAttendanceBulk,
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
  if (status === "Present") {
    return "bg-green-50 text-green-700 ring-green-100";
  }

  if (status === "Absent") {
    return "bg-red-50 text-red-700 ring-red-100";
  }

  if (status === "Late") {
    return "bg-yellow-50 text-yellow-700 ring-yellow-100";
  }

  return "bg-slate-50 text-slate-700 ring-slate-100";
}

export default function TeacherAttendance() {
  const [sessions, setSessions] = useState([]);
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);

  const [selectedSession, setSelectedSession] = useState(null);

  const [loading, setLoading] = useState(false);
  const [savingSession, setSavingSession] = useState(false);
  const [savingRecords, setSavingRecords] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [sessionForm, setSessionForm] = useState({
    class_name: "6A",
    session_title: "Daily Attendance",
    session_date: new Date().toISOString().slice(0, 16),
  });

  async function loadSessions() {
    try {
      setLoading(true);
      setError("");

      const data = await getAttendanceSessions();
      setSessions(data);
    } catch (err) {
      setError("Could not load attendance sessions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSessions();
  }, []);

  function handleSessionFormChange(event) {
    const { name, value } = event.target;

    setSessionForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleCreateSession(event) {
    event.preventDefault();

    try {
      setSavingSession(true);
      setError("");
      setMessage("");

      const payload = {
        class_name: sessionForm.class_name,
        session_title: sessionForm.session_title,
        session_date: `${sessionForm.session_date}:00`,
      };

      const createdSession = await createAttendanceSession(payload);

      setMessage("Attendance session created successfully.");
      setSelectedSession(createdSession);

      await loadSessions();
      await loadStudentsForSession(createdSession);
    } catch (err) {
      setError("Could not create attendance session.");
    } finally {
      setSavingSession(false);
    }
  }

  async function loadStudentsForSession(session) {
    try {
      setError("");
      setMessage("");

      const classStudents = await getStudentsForAttendance(session.class_name);
      const existingRecords = await getAttendanceRecords(session.id);

      setSelectedSession(session);

      if (existingRecords.length > 0) {
        setRecords(existingRecords);
        setStudents(
          existingRecords.map((record) => ({
            id: record.student_id,
            full_name: record.student_name,
          }))
        );
        return;
      }

      const fallbackStudents =
        classStudents.length > 0
          ? classStudents
          : [
              {
                id: null,
                full_name: "Maya Student",
              },
            ];

      setStudents(fallbackStudents);

      setRecords(
        fallbackStudents.map((student) => ({
          student_id: student.id,
          student_name: student.full_name,
          status: "Present",
          notes: "",
        }))
      );
    } catch (err) {
      setError("Could not load students for this class.");
    }
  }

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

  async function handleSaveAttendance() {
    if (!selectedSession) {
      setError("Create or select an attendance session first.");
      return;
    }

    try {
      setSavingRecords(true);
      setError("");
      setMessage("");

      const payloadRecords = records.map((record) => ({
        student_id: record.student_id || null,
        student_name: record.student_name,
        status: record.status,
        notes: record.notes || "",
      }));

      const saved = await markAttendanceBulk(selectedSession.id, payloadRecords);

      setRecords(saved);
      setMessage("Attendance saved successfully.");
      await loadSessions();
    } catch (err) {
      setError("Could not save attendance records.");
    } finally {
      setSavingRecords(false);
    }
  }

  const presentCount = records.filter((record) => record.status === "Present").length;
  const absentCount = records.filter((record) => record.status === "Absent").length;
  const lateCount = records.filter((record) => record.status === "Late").length;

  return (
    <AnimatedPage className="min-h-screen bg-transparent px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/teacher/dashboard"
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2 font-bold text-slate-700 shadow-sm hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Teacher Dashboard
        </Link>

        <section className="rounded-[2rem] bg-white/95 p-8 shadow-sm ring-1 ring-slate-100 backdrop-blur">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-red-50">
            <UserCheck className="h-8 w-8 text-[#fc362d]" />
          </div>

          <p className="mt-6 text-sm font-black uppercase tracking-wide text-[#fc362d]">
            Attendance Workflow
          </p>

          <h1 className="mt-2 text-5xl font-black text-slate-950">
            Attendance Tracking
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Create attendance sessions, mark students present, absent, late, or
            excused, and save records directly into PostgreSQL.
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

        <section className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.7rem] bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-50">
              <CheckCircle2 className="h-6 w-6 text-green-700" />
            </div>
            <p className="mt-4 text-sm font-bold text-slate-500">Present</p>
            <h3 className="mt-1 text-3xl font-black text-slate-950">
              {presentCount}
            </h3>
          </div>

          <div className="rounded-[1.7rem] bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50">
              <UsersRound className="h-6 w-6 text-red-700" />
            </div>
            <p className="mt-4 text-sm font-bold text-slate-500">Absent</p>
            <h3 className="mt-1 text-3xl font-black text-slate-950">
              {absentCount}
            </h3>
          </div>

          <div className="rounded-[1.7rem] bg-white/95 p-5 shadow-sm ring-1 ring-slate-100 backdrop-blur">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-50">
              <Clock className="h-6 w-6 text-yellow-700" />
            </div>
            <p className="mt-4 text-sm font-bold text-slate-500">Late</p>
            <h3 className="mt-1 text-3xl font-black text-slate-950">
              {lateCount}
            </h3>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <form
              onSubmit={handleCreateSession}
              className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur"
            >
              <div className="mb-5 flex items-center gap-3">
                <CalendarDays className="h-7 w-7 text-[#fc362d]" />
                <h2 className="text-2xl font-black text-slate-950">
                  Create Session
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block font-bold text-slate-800">
                    Class Name
                  </label>
                  <input
                    name="class_name"
                    value={sessionForm.class_name}
                    onChange={handleSessionFormChange}
                    placeholder="6A"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block font-bold text-slate-800">
                    Session Title
                  </label>
                  <input
                    name="session_title"
                    value={sessionForm.session_title}
                    onChange={handleSessionFormChange}
                    placeholder="Daily Attendance"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block font-bold text-slate-800">
                    Date & Time
                  </label>
                  <input
                    name="session_date"
                    type="datetime-local"
                    value={sessionForm.session_date}
                    onChange={handleSessionFormChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={savingSession}
                >
                  {savingSession ? "Creating..." : "Create Attendance Session"}
                </Button>
              </div>
            </form>

            <div className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-950">
                  Previous Sessions
                </h2>

                <button
                  type="button"
                  onClick={loadSessions}
                  className="grid h-10 w-10 place-items-center rounded-full bg-red-50 text-[#fc362d] hover:bg-red-100"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              {loading ? (
                <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                  Loading sessions...
                </p>
              ) : sessions.length === 0 ? (
                <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                  No attendance sessions yet.
                </p>
              ) : (
                <div className="max-h-[420px] space-y-4 overflow-y-auto pr-2">
                  {sessions.map((session) => (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => loadStudentsForSession(session)}
                      className={`w-full rounded-3xl border p-5 text-left shadow-sm transition hover:bg-red-50 ${
                        selectedSession?.id === session.id
                          ? "border-[#fc362d] bg-red-50"
                          : "border-slate-200 bg-white"
                      }`}
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
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
                  Mark Attendance
                </p>

                <h2 className="text-3xl font-black text-slate-950">
                  {selectedSession
                    ? `${selectedSession.class_name} - ${selectedSession.session_title}`
                    : "Select or create a session"}
                </h2>

                {selectedSession && (
                  <p className="mt-2 font-semibold text-slate-500">
                    {formatDateTime(selectedSession.session_date)}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleSaveAttendance}
                disabled={!selectedSession || savingRecords}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#fc362d] px-5 py-3 font-black text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {savingRecords ? "Saving..." : "Save Attendance"}
              </button>
            </div>

            {!selectedSession ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                Create a new attendance session or select a previous one.
              </p>
            ) : records.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                No students found for this class. Add student profiles under
                class name {selectedSession.class_name}.
              </p>
            ) : (
              <div className="space-y-4">
                {records.map((record, index) => (
                  <article
                    key={`${record.student_name}-${index}`}
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
                      placeholder="Optional attendance note..."
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
