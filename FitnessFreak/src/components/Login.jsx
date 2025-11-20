import React, { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../utils/api";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });

      // Store token in localStorage
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Remember me functionality
      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      }

      setIsLoggedIn(true);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-md">
        {/* Background Blur */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#22c55e]/20 rounded-full mix-blend-multiply filter blur-3xl -z-10"></div>

        {/* Card */}
        <div className="relative bg-[#0f172a] rounded-2xl p-6 sm:p-8 border border-[#22c55e]/30 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#22c55e] to-[#38bdf8] rounded-lg flex items-center justify-center mx-auto mb-4">
              <Lock className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Login to your FitnessFreak account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0f172a] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 border border-[#22c55e]/30 focus:border-[#22c55e] focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0f172a] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 border border-[#22c55e]/30 focus:border-[#22c55e] focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-600 border-slate-500 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-gray-300">Remember me</span>
              </label>
              <a
                href="#"
                className="text-cyan-400 hover:text-cyan-300 transition"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 group mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
              {!loading && (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-gray-400">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link
            to="/signup"
            className="block text-center px-6 py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 font-semibold"
          >
            Create Account
          </Link>

          {/* Terms */}
          <p className="text-xs text-gray-400 text-center mt-6">
            By logging in, you agree to our{" "}
            <a href="#" className="text-cyan-400 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-cyan-400 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
