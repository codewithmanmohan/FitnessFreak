import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Zap,
  Flame,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Heart,
      title: "Health Tracking",
      description: "Monitor your heart rate and vital signs in real-time",
    },
    {
      icon: Zap,
      title: "Expert Trainers",
      description: "Get guidance from certified fitness professionals",
    },
    {
      icon: Flame,
      title: "Custom Workouts",
      description: "Personalized training plans tailored to your goals",
    },
    {
      icon: Users,
      title: "Community",
      description: "Join thousands of fitness enthusiasts",
    },
  ];

  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Workouts Completed", value: "1M+" },
    { label: "Trainers Available", value: "500+" },
    { label: "Success Rate", value: "95%" },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Transform Your Fitness
                  </span>
                  <br />
                  <span className="text-white">Journey Today</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Track your progress, connect with expert trainers, and achieve
                  your fitness goals with our comprehensive platform.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/plans"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 font-bold flex items-center justify-center gap-2 group"
                >
                  Get Started
                  <ArrowRight className="group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  to="/coaches"
                  className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-xl hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 font-bold"
                >
                  Find a Trainer
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl opacity-20 blur-3xl absolute -top-12 -right-12"></div>
              <div className="relative z-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Heart className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Heart Rate</p>
                      <p className="text-2xl font-bold text-white">72 BPM</p>
                    </div>
                  </div>
                  <div className="h-32 bg-slate-600 rounded-lg flex items-end justify-between p-4">
                    {[45, 60, 55, 70, 65, 75, 72].map((h, i) => (
                      <div
                        key={i}
                        className="w-2 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full"
                        style={{ height: `${(h / 75) * 100}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-slate-800/50 border-y border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Why Choose FitnessFreak?
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="text-white w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-12 border border-cyan-500/30 backdrop-blur">
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"></div>
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Start Your Transformation?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of members who have already achieved their
                fitness goals
              </p>
              <Link
                to="/signup"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 font-bold"
              >
                Start Free Trial Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
