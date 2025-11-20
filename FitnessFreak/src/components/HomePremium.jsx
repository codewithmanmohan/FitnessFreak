import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Zap,
  Flame,
  Users,
  ArrowRight,
  Star,
  Clock,
} from "lucide-react";

const colors = {
  background: "#050816",
  surface: "#0f172a",
  text: "#e5e7eb",
  primary: "#22c55e",
  secondary: "#38bdf8",
};

export default function Home() {
  const stats = [
    { icon: Star, label: "Member satisfaction", value: "4.9/5" },
    { icon: Clock, label: "Access on premium plans", value: "24/7" },
  ];

  return (
    <div className="bg-[#050816] text-[#e5e7eb] min-h-screen w-full">
      {/* HERO SECTION */}
      <section className="w-full border-b border-slate-800/70">
        <div className="py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-4 sm:space-y-6 px-4 sm:px-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Fitness Freak
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-semibold">
              Stronger every day. Fitter for life.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed">
              High-energy strength, conditioning and transformation programs
              built for real people. Lift heavier, move faster and feel
              unstoppable.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 sm:py-4 font-semibold shadow-lg transition-transform hover:-translate-y-1 text-sm sm:text-base"
                style={{ backgroundColor: colors.primary, color: "#020617" }}
              >
                Start Your Transformation
                <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
              </Link>
              <Link
                to="/plans"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 sm:py-3 font-semibold border-2 transition-colors text-sm sm:text-base"
                style={{
                  borderColor: colors.secondary,
                  color: colors.secondary,
                }}
              >
                View Plans
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4 sm:pt-6">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      backgroundColor: colors.primary + "26",
                      color: colors.primary,
                    }}
                  >
                    {stat.icon === Star ? "★" : "⏱"}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200 text-sm sm:text-base">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 w-full px-4 sm:px-0">
            <div
              className="relative rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-8 sm:py-12 overflow-hidden shadow-2xl aspect-square sm:aspect-auto min-h-[300px] sm:min-h-[400px]"
              style={{
                background: `radial-gradient(circle at top left, ${colors.secondary}22, transparent 55%), radial-gradient(circle at bottom right, ${colors.primary}33, transparent 60%), ${colors.surface}`,
              }}
            >
              {/* Grid Pattern Background */}
              <div className="absolute inset-0 opacity-20 mix-blend-screen">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-400">
                      Live session
                    </p>
                    <p className="text-lg font-semibold text-slate-50">
                      Strength & Conditioning
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: colors.primary + "33",
                      color: colors.primary,
                    }}
                  >
                    ● 25 members online
                  </span>
                </div>

                {/* Stats Visualization */}
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <svg viewBox="0 0 160 120" className="w-full h-auto">
                      <defs>
                        <linearGradient
                          id="barGrad"
                          x1="0"
                          y1="1"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0%" stopColor={colors.primary} />
                          <stop offset="100%" stopColor={colors.secondary} />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="40"
                        cy="32"
                        r="12"
                        fill={colors.surface}
                        stroke={colors.secondary}
                        strokeWidth="2"
                      ></circle>
                      <rect
                        x="34"
                        y="46"
                        width="12"
                        height="26"
                        rx="6"
                        fill={colors.primary}
                      ></rect>
                      <rect
                        x="22"
                        y="60"
                        width="10"
                        height="26"
                        rx="5"
                        fill="#1e293b"
                      ></rect>
                      <rect
                        x="48"
                        y="60"
                        width="10"
                        height="26"
                        rx="5"
                        fill="#1e293b"
                      ></rect>
                      <rect
                        x="20"
                        y="30"
                        width="60"
                        height="8"
                        rx="4"
                        fill="#1e293b"
                      ></rect>
                      <rect
                        x="16"
                        y="24"
                        width="6"
                        height="20"
                        rx="3"
                        fill={colors.primary + "55"}
                      ></rect>
                      <rect
                        x="78"
                        y="24"
                        width="6"
                        height="20"
                        rx="3"
                        fill={colors.primary + "55"}
                      ></rect>
                      <rect
                        x="95"
                        y="48"
                        width="50"
                        height="8"
                        rx="4"
                        fill="url(#barGrad)"
                        opacity="0.85"
                      ></rect>
                      <rect
                        x="95"
                        y="62"
                        width="36"
                        height="8"
                        rx="4"
                        fill="url(#barGrad)"
                        opacity="0.6"
                      ></rect>
                      <rect
                        x="95"
                        y="76"
                        width="22"
                        height="8"
                        rx="4"
                        fill="url(#barGrad)"
                        opacity="0.4"
                      ></rect>
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-2xl px-3 py-2 bg-slate-900/60 border border-slate-700/70">
                      <p className="text-xs text-slate-400">Today's focus</p>
                      <p className="text-sm text-slate-100 font-semibold">
                        Push • Pull • Legs
                      </p>
                    </div>
                    <div className="rounded-2xl px-3 py-2 bg-slate-900/60 border border-slate-700/70">
                      <p className="text-xs text-slate-400">
                        Average heart rate
                      </p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: colors.primary }}
                      >
                        138 BPM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full border-b border-slate-800/70 py-12 sm:py-16 md:py-20 lg:py-24">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 lg:mb-16 text-center px-4">
            Why Choose{" "}
            <span style={{ color: colors.primary }}>FitnessFreak?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
            {[
              {
                icon: Heart,
                title: "Expert Coaching",
                desc: "Learn from certified fitness professionals",
              },
              {
                icon: Zap,
                title: "Live Classes",
                desc: "High-energy group sessions every day",
              },
              {
                icon: Flame,
                title: "Custom Plans",
                desc: "Personalized workout routines for you",
              },
              {
                icon: Users,
                title: "Community",
                desc: "Join thousands of fitness enthusiasts",
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border p-6 transition-all hover:-translate-y-1"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: "#1f2937",
                  }}
                >
                  <div
                    className="mb-4 h-12 w-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: colors.primary + "33" }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: colors.primary }}
                    />
                  </div>
                  <h3 className="font-semibold text-slate-50 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div
            className="relative rounded-3xl p-12 border text-center overflow-hidden"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.secondary + "44",
              background: `linear-gradient(135deg, ${colors.primary}11, ${colors.secondary}11)`,
            }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Transform?</h2>
            <p className="text-lg text-slate-300 mb-8">
              Join thousands of members who have achieved their fitness goals
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold shadow-lg transition-transform hover:-translate-y-1"
              style={{ backgroundColor: colors.primary, color: "#020617" }}
            >
              Start Your 7-Day Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
