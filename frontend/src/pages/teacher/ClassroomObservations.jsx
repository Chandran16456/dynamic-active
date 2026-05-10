import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ClipboardCheck,
  PlusCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import AnimatedPage from "../../components/motion/AnimatedPage";
import Button from "../../components/ui/Button";
import {
  createObservation,
  deleteObservation,
  getObservations,
} from "../../api/observationApi";

export default function ClassroomObservations() {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    student_name: "",
    class_name: "",
    engagement_score: 4,
    behavior_score: 4,
    participation_score: 4,
    notes: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadObservations() {
    try {
      setLoading(true);
      setError("");

      const data = await getObservations();
      setObservations(data);
    } catch (err) {
      setError("Could not load observations. Please make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadObservations();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const payload = {
        student_name: formData.student_name,
        class_name: formData.class_name,
        engagement_score: Number(formData.engagement_score),
        behavior_score: Number(formData.behavior_score),
        participation_score: Number(formData.participation_score),
        notes: formData.notes,
      };

      await createObservation(payload);

      setMessage("Classroom observation saved successfully.");

      setFormData({
        student_name: "",
        class_name: "",
        engagement_score: 4,
        behavior_score: 4,
        participation_score: 4,
        notes: "",
      });

      await loadObservations();
    } catch (err) {
      setError("Could not save observation. Please check the form and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(observationId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this observation?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");

      await deleteObservation(observationId);
      setMessage("Observation deleted successfully.");
      await loadObservations();
    } catch (err) {
      setError("Could not delete observation.");
    }
  }

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
            <ClipboardCheck className="h-8 w-8 text-[#fc362d]" />
          </div>

          <p className="mt-6 text-sm font-black uppercase tracking-wide text-[#fc362d]">
            Teacher Workflow
          </p>

          <h1 className="mt-2 text-5xl font-black text-slate-950">
            Classroom Observations
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Capture classroom notes, student behavior, participation, learning
            milestones, and follow-up actions.
          </p>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur"
          >
            <div className="mb-6 flex items-center gap-3">
              <PlusCircle className="h-6 w-6 text-[#fc362d]" />
              <h2 className="text-2xl font-black text-slate-950">
                New Observation
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block font-bold text-slate-800">
                  Student Name
                </label>
                <input
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  placeholder="Maya Student"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-bold text-slate-800">
                  Class Name
                </label>
                <input
                  name="class_name"
                  value={formData.class_name}
                  onChange={handleChange}
                  placeholder="6A Reading"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block font-bold text-slate-800">
                    Engagement
                  </label>
                  <select
                    name="engagement_score"
                    value={formData.engagement_score}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                  >
                    {[1, 2, 3, 4, 5].map((score) => (
                      <option key={score} value={score}>
                        {score}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-bold text-slate-800">
                    Behavior
                  </label>
                  <select
                    name="behavior_score"
                    value={formData.behavior_score}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                  >
                    {[1, 2, 3, 4, 5].map((score) => (
                      <option key={score} value={score}>
                        {score}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-bold text-slate-800">
                    Participation
                  </label>
                  <select
                    name="participation_score"
                    value={formData.participation_score}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                  >
                    {[1, 2, 3, 4, 5].map((score) => (
                      <option key={score} value={score}>
                        {score}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block font-bold text-slate-800">
                  Observation Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Write classroom notes, behavior, participation, and follow-up actions..."
                  rows="6"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full disabled:cursor-not-allowed disabled:opacity-70"
                disabled={saving}
              >
                {saving ? "Saving Observation..." : "Save Observation"}
              </Button>

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
            </div>
          </form>

          <div className="rounded-[2rem] bg-white/95 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
                  Saved Records
                </p>
                <h2 className="text-2xl font-black text-slate-950">
                  Recent Observations
                </h2>
              </div>

              <button
                type="button"
                onClick={loadObservations}
                className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 font-bold text-[#fc362d] hover:bg-red-100"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>

            {loading ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                Loading observations...
              </p>
            ) : observations.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                No observations yet. Create one using the form.
              </p>
            ) : (
              <div className="space-y-4">
                {observations.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-black text-slate-950">
                          {item.student_name}
                        </h3>
                        <p className="mt-1 font-semibold text-slate-500">
                          {item.class_name}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-[#fc362d] hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-red-50 p-3">
                        <p className="text-xs font-bold text-red-500">
                          Engagement
                        </p>
                        <p className="text-2xl font-black text-slate-950">
                          {item.engagement_score}/5
                        </p>
                      </div>

                      <div className="rounded-2xl bg-orange-50 p-3">
                        <p className="text-xs font-bold text-orange-600">
                          Behavior
                        </p>
                        <p className="text-2xl font-black text-slate-950">
                          {item.behavior_score}/5
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-3">
                        <p className="text-xs font-bold text-slate-500">
                          Participation
                        </p>
                        <p className="text-2xl font-black text-slate-950">
                          {item.participation_score}/5
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 leading-7 text-slate-600">
                      {item.notes}
                    </p>
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
