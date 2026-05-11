import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, UserRound } from "lucide-react";
import AnimatedPage from "../components/motion/AnimatedPage";

const LOCAL_API_URL = "http://127.0.0.1:8000";
const PRODUCTION_API_URL =
  "https://dynamic-active-backend-production.up.railway.app";

function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  if (envUrl && envUrl.trim() !== "") {
    return envUrl.trim();
  }

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  return isLocalhost ? LOCAL_API_URL : PRODUCTION_API_URL;
}

function getDashboardPath(role) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "teacher") return "/teacher/dashboard";
  if (role === "student") return "/student/dashboard";

  return "/";
}

function DynamicActiveLogo() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-3 rounded-2xl p-2 transition hover:bg-red-50"
      aria-label="Go to Dynamic Active home page"
    >
      <svg
        width="52"
        height="35"
        viewBox="0 0 52 34.904"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-9 w-auto shrink-0"
      >
        <path
          d="M 33.385 17.096 C 33.385 25.947 26.209 33.123 17.358 33.123 C 8.506 33.123 1.331 25.947 1.331 17.096 C 1.331 8.244 8.505 1.068 17.358 1.068 C 26.209 1.068 33.385 8.244 33.385 17.096 Z"
          fill="rgb(252, 54, 45)"
        />
        <path
          d="M 50.669 17.096 C 50.669 25.947 43.564 33.123 34.799 33.123 C 26.034 33.123 18.929 25.947 18.929 17.096 C 18.929 8.244 26.033 1.068 34.799 1.068 C 43.563 1.068 50.669 8.244 50.669 17.096 Z"
          fill="rgba(252, 54, 45, 0.74)"
        />
        <path
          d="M 26.121 30.518 C 30.495 27.655 33.385 22.713 33.385 17.096 C 33.385 11.478 30.496 6.536 26.121 3.675 C 21.62 6.655 18.917 11.697 18.929 17.096 C 18.917 22.495 21.619 27.538 26.121 30.518 Z"
          fill="rgba(54, 74, 255, 0.2)"
        />
      </svg>

      <p className="text-2xl font-black tracking-tight text-slate-950 group-hover:text-[#fc362d]">
        Dynamic Active
      </p>
    </Link>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("teacher");
  const [password, setPassword] = useState("teacher123");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugMessage, setDebugMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();
    const apiBaseUrl = getApiBaseUrl();

    if (!cleanUsername || !cleanPassword) {
      setError("Enter username and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setDebugMessage("");

      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: cleanUsername,
          password: cleanPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.detail || "Invalid username or password.");
        setDebugMessage(`Backend used: ${apiBaseUrl}`);
        return;
      }

      localStorage.setItem("dynamic_active_token", data.access_token);
      localStorage.setItem("dynamic_active_user", JSON.stringify(data.user));

      navigate(getDashboardPath(data.user.role));
    } catch (err) {
      setError("Could not connect to backend. Check deployed API URL.");
      setDebugMessage(`Backend used: ${apiBaseUrl}`);
    } finally {
      setLoading(false);
    }
  }

  function fillDemoLogin(role) {
    if (role === "admin") {
      setUsername("admin");
      setPassword("admin123");
    }

    if (role === "teacher") {
      setUsername("teacher");
      setPassword("teacher123");
    }

    if (role === "student") {
      setUsername("student");
      setPassword("student123");
    }

    setError("");
    setDebugMessage("");
  }

  return (
    <AnimatedPage className="min-h-screen bg-transparent px-6 py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <DynamicActiveLogo />

        <Link
          to="/"
          className="rounded-full bg-white px-5 py-3 text-sm font-black text-[#fc362d] shadow-sm ring-1 ring-slate-100 hover:bg-red-50"
        >
          Back home
        </Link>
      </div>

      <section className="mx-auto grid max-w-7xl items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-[#fc362d] shadow-sm ring-1 ring-slate-100"
          >
            Role-based K–12 access
          </motion.div>

          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight text-slate-950 md:text-6xl">
            Sign in to your Dynamic Active workspace.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Admins, teachers, and students each get a dedicated dashboard with
            the right workflows, data, and AI-powered tools.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => fillDemoLogin("admin")}
              className="rounded-2xl bg-slate-950 px-4 py-4 text-sm font-black text-white transition hover:bg-slate-800"
            >
              Admin Demo
            </button>

            <button
              type="button"
              onClick={() => fillDemoLogin("teacher")}
              className="rounded-2xl bg-[#fc362d] px-4 py-4 text-sm font-black text-white transition hover:bg-red-600"
            >
              Teacher Demo
            </button>

            <button
              type="button"
              onClick={() => fillDemoLogin("student")}
              className="rounded-2xl bg-white px-4 py-4 text-sm font-black text-[#fc362d] shadow-sm ring-1 ring-red-100 transition hover:bg-red-50"
            >
              Student Demo
            </button>
          </div>

          <div className="mt-6 rounded-3xl bg-white/90 p-5 shadow-sm ring-1 ring-slate-100">
            <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
              Demo credentials
            </p>

            <div className="mt-3 grid gap-3 text-sm font-bold text-slate-700 sm:grid-cols-3">
              <p>admin / admin123</p>
              <p>teacher / teacher123</p>
              <p>student / student123</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="rounded-[2rem] bg-white/95 p-6 shadow-2xl ring-1 ring-slate-100 backdrop-blur md:p-8"
        >
          <div className="mb-8">
            <p className="text-sm font-black uppercase tracking-wide text-[#fc362d]">
              Secure Login
            </p>

            <h2 className="mt-2 text-4xl font-black text-slate-950">
              Welcome back
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Use one of the demo accounts or enter your username and password.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {error}

              {debugMessage && (
                <p className="mt-2 text-xs font-semibold text-red-500">
                  {debugMessage}
                </p>
              )}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-black text-slate-700">
                Username
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-[#fc362d] focus-within:bg-white">
                <UserRound className="h-5 w-5 text-[#fc362d]" />

                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="teacher"
                  autoComplete="username"
                  className="w-full bg-transparent font-semibold text-slate-900 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-slate-700">
                Password
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-[#fc362d] focus-within:bg-white">
                <LockKeyhole className="h-5 w-5 text-[#fc362d]" />

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="teacher123"
                  autoComplete="current-password"
                  className="w-full bg-transparent font-semibold text-slate-900 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <Link
                to="/forgot-password"
                className="text-sm font-black text-[#fc362d] hover:text-red-700"
              >
                Forgot password?
              </Link>

              <p className="text-xs font-semibold text-slate-400">
                API: {getApiBaseUrl().replace("https://", "")}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#fc362d] px-5 py-4 font-black text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}

              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </motion.div>
      </section>
    </AnimatedPage>
  );
}
