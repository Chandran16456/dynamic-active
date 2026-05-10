import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  NotebookPen,
  PlusCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import AnimatedPage from "../../components/motion/AnimatedPage";
import Button from "../../components/ui/Button";
import { createNote, deleteNote, getNotes } from "../../api/noteApi";

export default function TeacherNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    target_type: "student",
    target_name: "",
    title: "",
    body: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadNotes() {
    try {
      setLoading(true);
      setError("");

      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError("Could not load notes. Please make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
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

      await createNote(formData);

      setMessage("Note saved successfully.");

      setFormData({
        target_type: "student",
        target_name: "",
        title: "",
        body: "",
      });

      await loadNotes();
    } catch (err) {
      setError("Could not save note. Please check the form and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(noteId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");

      await deleteNote(noteId);
      setMessage("Note deleted successfully.");
      await loadNotes();
    } catch (err) {
      setError("Could not delete note.");
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
            <NotebookPen className="h-8 w-8 text-[#fc362d]" />
          </div>

          <p className="mt-6 text-sm font-black uppercase tracking-wide text-[#fc362d]">
            Documentation
          </p>

          <h1 className="mt-2 text-5xl font-black text-slate-950">
            Notes & Documentation
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Store classroom notes, student support notes, parent meeting notes,
            and teacher documentation in one organized workspace.
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
                New Documentation Note
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block font-bold text-slate-800">
                  Note Type
                </label>

                <select
                  name="target_type"
                  value={formData.target_type}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                >
                  <option value="student">Student Support Note</option>
                  <option value="class">Classroom Note</option>
                  <option value="teacher">Teacher Documentation</option>
                  <option value="parent">Parent Meeting Note</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-bold text-slate-800">
                  Target Name
                </label>

                <input
                  name="target_name"
                  value={formData.target_name}
                  onChange={handleChange}
                  placeholder="Maya Student or 6A Reading"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-bold text-slate-800">
                  Note Title
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Reading Support Note"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-bold text-slate-800">
                  Note Details
                </label>

                <textarea
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  placeholder="Write support details, classroom context, next steps, or documentation notes..."
                  rows="7"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#fc362d]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full disabled:cursor-not-allowed disabled:opacity-70"
                disabled={saving}
              >
                {saving ? "Saving Note..." : "Save Note"}
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
                  Saved Documentation
                </p>

                <h2 className="text-2xl font-black text-slate-950">
                  Recent Notes
                </h2>
              </div>

              <button
                type="button"
                onClick={loadNotes}
                className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 font-bold text-[#fc362d] hover:bg-red-100"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>

            {loading ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                Loading notes...
              </p>
            ) : notes.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-5 font-bold text-slate-600">
                No notes yet. Create one using the form.
              </p>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => (
                  <article
                    key={note.id}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-[#fc362d]">
                          {note.target_type}
                        </p>

                        <h3 className="mt-2 text-xl font-black text-slate-950">
                          {note.title}
                        </h3>

                        <p className="mt-1 font-semibold text-slate-500">
                          {note.target_name}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(note.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-[#fc362d] hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>

                    <p className="mt-4 leading-7 text-slate-600">
                      {note.body}
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
