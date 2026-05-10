import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import AnimatedPage from "../components/motion/AnimatedPage";
import Button from "../components/ui/Button";

export default function ForgotPasswordPage() {
  function handleSubmit(event) {
    event.preventDefault();
    alert("Password reset demo submitted. Backend integration comes later.");
  }

  return (
    <AnimatedPage className="grid min-h-screen place-items-center bg-gradient-to-br from-sky-50 via-white to-violet-50 px-6 py-8">
      <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-slate-100">
        <Link
          to="/login"
          className="mb-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to login
        </Link>

        <h1 className="text-3xl font-black text-slate-950">Reset your password</h1>
        <p className="mt-3 leading-7 text-slate-600">
          Enter your email or username. Later, the backend will generate a secure reset token.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="account" className="mb-2 block font-bold text-slate-800">
              Email or username
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <Mail size={20} className="text-slate-400" aria-hidden="true" />
              <input
                id="account"
                name="account"
                type="text"
                placeholder="student, teacher, or admin"
                className="w-full border-0 bg-transparent outline-none"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Send reset instructions
          </Button>
        </form>
      </div>
    </AnimatedPage>
  );
}
