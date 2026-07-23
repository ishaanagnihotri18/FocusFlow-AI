import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { API_BASE_URL } from "../utils/api";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // Handle Input Change
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // Login
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed."
        );
      }

      // Save authentication information

      localStorage.setItem(
        "focusflow_token",
        data.token
      );

      localStorage.setItem(
        "focusflow_user",
        JSON.stringify(data.user)
      );

      // Go to dashboard

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Branding */}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400">
            FocusFlow AI
          </h1>

          <p className="text-gray-400 mt-3">
            Sign in and take control of your productivity.
          </p>
        </div>

        {/* Login Card */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-white">
            Welcome Back 👋
          </h2>

          <p className="text-gray-400 mt-2 mb-7">
            Sign in to continue to your workspace.
          </p>

          {/* Error */}

          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}

            <div>
              <label className="block text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition"
              />
            </div>

            {/* Password */}

            <div>
              <label className="block text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-white outline-none focus:border-cyan-400 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>
            </div>

            {/* Sign In */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                loading
                  ? "bg-slate-700 cursor-not-allowed text-gray-400"
                  : "bg-cyan-500 hover:bg-cyan-600 text-white"
              }`}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>

          {/* Register */}

          <p className="text-center text-gray-400 mt-7">
            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Create Account
            </Link>
          </p>

        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          AI-powered productivity with Gemini
        </p>

      </div>
    </div>
  );
}