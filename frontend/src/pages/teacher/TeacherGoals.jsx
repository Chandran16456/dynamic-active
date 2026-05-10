import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Target,
  PlusCircle,
  RefreshCw,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import AnimatedPage from "../../components/motion/AnimatedPage";
import Button from "../../components/ui/Button";
import {
  createGoal,
  deleteGoal,
  getGoals,
  updateGoal,
} from "../../api/goalApi";

export default function TeacherGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    student_name: "",
    status: "In Progress",
    progress: 25,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadGoals() {
    try {
      setLoading(true);
      setError("");

      const data = await getGoals();
      setGoals(data);
    } catch (err) {
      setError("Could not load goals. Please make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGoals();
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
        title: formData.title,
        description: formData.description,
        student_name: formData.student_name,
        status: formData.status,
        progress: Number(formData.progress),
      };

      await createGoal(payload);

      setMessage("Goal created successfully.");

      setFormData({
        title: "",
        description: "",
        student_name: "",
        status: "In Progress",
        progress: 25,
      });

      await loadGoals();
    } catch (err) {
      setError("Could not create goal. Please check the form and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleProgressUpdate(goalId, newProgress) {
    try {
      setError("");
      setMessage("");

      await updateGoal(goalId, {
        progress: newProgress,
        status: newProgress >= 100 ? "Completed" : "In Progress",
      });

      setMessage("Goal progress updated.");
      await loadGoals();
    } catch (err) {
      setError("Could not update goal progress.");
    }
  }

  async function handleDelete(goalId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this goal?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");

      await deleteGoal(goalId);
      setMessage("Goal deleted successfully.");
      await loadGoals();
    } catch (err) {
      setError("Could not delete goal.");
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
            <Target className="h-8 w-8 text-[#fc362d]" />
          </div>

          <p className="mt-6 text-sm font-black uppercase tracking-wide text-[#fc362d]">
            Goal Tracking
          </p>

          <h1 className="mt-2 text-5xl font-black text-slate-950">
            Goal Creation
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Create student goals, monitor completion, assign next steps, and
            track progress across classes.
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
                New Student Goal
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
                  Goal Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Improve Reading Reflection"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-bold text-slate-800">
                  Goal Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Complete one structured reading reflection every week using 4-5 complete sentences."
                  rows="5"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-bold text-slate-800">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Needs Review">Needs Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-bold text-slate-800">
                    Progress
                  </label>
                  <input
                    name="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full disabled:cursor-not-allowed disabled:opacity-70"
                disabled={saving}
              >
                {saving ? "Creating Goal..." : "Create Goal"}
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
                  Saved Goals
                </p>
                <h2 className="text-2xl font-black text-slate-950">
                  Active Goal Tracker
                </h2>
              </div>

              <button
                type="button"
                onClick={loadGoals}
                className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 font-bold text-[#fc362d] hover:bg-red-100"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>

            {loading ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                Loading goals...
              </p>
            ) : goals.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                No goals yet. Create one using the form.
              </p>
            ) : (
              <div className="space-y-4">
                {goals.map((goal) => (
                  <article
                    key={goal.id}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-black text-slate-950">
                          {goal.title}
                        </h3>

                        <p className="mt-1 font-semibold text-slate-500">
                          {goal.student_name}
                        </p>
                      </div>

                      <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-black text-[#fc362d]">
                        {goal.status}
                      </span>
                    </div>

                    <p className="mt-4 leading-7 text-slate-600">
                      {goal.description}
                    </p>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="font-bold text-slate-700">Progress</p>
                        <p className="font-black text-[#fc362d]">
                          {goal.progress}%
                        </p>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#fc362d]"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleProgressUpdate(
                            goal.id,
                            Math.min(goal.progress + 10, 100)
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-700 hover:bg-green-100"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        +10 Progress
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(goal.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-[#fc362d] hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
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
