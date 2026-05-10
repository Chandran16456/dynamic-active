import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRound, LockKeyhole, ArrowLeft } from "lucide-react";
import { loginUser } from "../api/authApi";
import AnimatedPage from "../components/motion/AnimatedPage";
import Button from "../components/ui/Button";

function DynamicActiveLogo() {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="52"
        height="35"
        viewBox="0 0 52 34.904"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-9 w-auto"
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

      <div>
        <p className="text-xl font-black tracking-tight text-white">
          Dynamic Active
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const demoUsers = {
    student: {
      label: "Student",
      username: "student",
      password: "student123",
      description: "Student progress, feedback, goals, and encouragement.",
    },
    teacher: {
      label: "Teacher",
      username: "teacher",
      password: "teacher123",
      description: "Observations, notes, goals, and AI classroom support.",
    },
    admin: {
      label: "Admin",
      username: "admin",
      password: "admin123",
      description: "Reports, analytics, reviews, and risk insights.",
    },
  };

  const selectedUser = demoUsers[role];

  function handleRoleSelect(selectedRole) {
    setRole(selectedRole);
    setError("");
  }

  function handleDemoFill() {
    setFormData({
      username: selectedUser.username,
      password: selectedUser.password,
    });
    setError("");
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(
        formData.username.trim(),
        formData.password
      );

      localStorage.setItem("dynamic_active_token", data.access_token);
      localStorage.setItem("dynamic_active_user", JSON.stringify(data.user));

      const dashboardRoutes = {
        student: "/student/dashboard",
        teacher: "/teacher/dashboard",
        admin: "/admin/dashboard",
      };

      navigate(dashboardRoutes[data.user.role] || "/login");
    } catch (err) {
      const apiMessage =
        err?.response?.data?.detail ||
        "Invalid username or password. Please try again.";

      setError(apiMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatedPage className="relative min-h-screen overflow-hidden bg-[url('/log-pic.png')] bg-cover bg-center bg-fixed px-6 py-8">
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 font-semibold text-white backdrop-blur-md hover:bg-white/20"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to home
        </Link>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <section>
            <div className="mb-6">
              <DynamicActiveLogo />
            </div>

            <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">
              Sign in.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
              Access your Dynamic Active workspace with secure role-based login.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {Object.entries(demoUsers).map(([key, user]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleRoleSelect(key)}
                  className={`rounded-3xl p-5 text-left shadow-sm ring-1 transition backdrop-blur-md ${
                    role === key
                      ? "bg-[#fc362d] text-white ring-[#fc362d]"
                      : "bg-white/85 text-slate-900 ring-white/30 hover:ring-[#fc362d]"
                  }`}
                >
                  <p className="text-lg font-black">{user.label}</p>
                  <p
                    className={`mt-2 text-sm leading-6 ${
                      role === key ? "text-red-50" : "text-slate-500"
                    }`}
                  >
                    {user.description}
                  </p>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] bg-white/90 p-6 shadow-2xl ring-1 ring-white/40 backdrop-blur-md">
            <div className="rounded-[1.5rem] bg-white/80 p-6 backdrop-blur-md">
              <h2 className="text-2xl font-black text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-slate-600">
                Selected role:{" "}
                <span className="font-bold text-[#fc362d]">
                  {selectedUser.label}
                </span>
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block font-bold text-slate-800"
                  >
                    Username
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <UserRound
                      size={20}
                      className="text-slate-400"
                      aria-hidden="true"
                    />

                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter username"
                      className="w-full border-0 bg-transparent outline-none"
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block font-bold text-slate-800"
                  >
                    Password
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <LockKeyhole
                      size={20}
                      className="text-slate-400"
                      aria-hidden="true"
                    />

                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      className="w-full border-0 bg-transparent outline-none"
                      autoComplete="current-password"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleDemoFill}
                    className="font-bold text-[#fc362d] hover:text-[#e92f27]"
                  >
                    Fill demo login
                  </button>

                  <Link
                    to="/forgot-password"
                    className="font-bold text-slate-600 hover:text-slate-900"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : `Sign in as ${selectedUser.label}`}
                </Button>

                {error && (
                  <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                    {error}
                  </p>
                )}
              </form>

              <div className="mt-6 rounded-2xl bg-white p-4 text-sm text-slate-600">
                <p className="font-bold text-slate-800">Demo credentials</p>

                <p className="mt-1">
                  Username:{" "}
                  <span className="font-bold">{selectedUser.username}</span>
                </p>

                <p>
                  Password:{" "}
                  <span className="font-bold">{selectedUser.password}</span>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AnimatedPage>
  );
}
