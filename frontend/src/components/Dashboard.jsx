import React, { useState, useEffect } from "react";
import {
  Heart,
  TrendingUp,
  Calendar,
  CreditCard,
  LogOut,
  Edit,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../utils/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [attendanceDays, setAttendanceDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock subscription data
  const subscriptionData = {
    plan: "Pro",
    startDate: "2024-11-01",
    endDate: "2024-12-01",
    daysLeft: 11,
    amount: 49.99,
    status: "active",
  };

  // Mock BPM data
  const bpmReadings = [
    { date: "2024-11-19", bpm: 72, time: "10:30 AM" },
    { date: "2024-11-18", bpm: 68, time: "09:15 AM" },
    { date: "2024-11-17", bpm: 75, time: "11:00 AM" },
  ];

  // Mock transaction history
  const transactions = [
    {
      id: 1,
      date: "2024-11-01",
      amount: 49.99,
      type: "Subscription",
      status: "completed",
    },
    {
      id: 2,
      date: "2024-10-01",
      amount: 49.99,
      type: "Subscription",
      status: "completed",
    },
    {
      id: 3,
      date: "2024-09-01",
      amount: 49.99,
      type: "Subscription",
      status: "completed",
    },
  ];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const toggleAttendance = (day) => {
    const dateString = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    setAttendanceDays((prev) =>
      prev.includes(dateString)
        ? prev.filter((d) => d !== dateString)
        : [...prev, dateString]
    );
  };

  const isAbsentDay = (day) => {
    const dateString = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return attendanceDays.includes(dateString);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">Please log in to view your dashboard</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Welcome, {user?.firstName}! 👋
            </h1>
            <p className="text-gray-400">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "bpm", label: "BPM Readings", icon: Heart },
            { id: "subscription", label: "Subscription", icon: CreditCard },
            { id: "calendar", label: "Attendance", icon: Calendar },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                activeTab === id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Personal Details */}
                <div className="bg-[#0f172a] rounded-lg p-6 border border-slate-700">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold">Personal Details</h2>
                    <button className="p-2 hover:bg-slate-700 rounded-lg transition">
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Full Name</p>
                      <p className="text-lg font-semibold">
                        {user?.firstName} {user?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-lg font-semibold break-all">
                        {user?.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-lg font-semibold">
                        {user?.phone || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Age</p>
                      <p className="text-lg font-semibold">
                        {user?.age || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Height</p>
                      <p className="text-lg font-semibold">
                        {user?.height ? `${user.height} cm` : "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Weight</p>
                      <p className="text-lg font-semibold">
                        {user?.weight ? `${user.weight} kg` : "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-lg p-4 border border-blue-500/30">
                    <p className="text-gray-400 text-sm mb-2">Days Left</p>
                    <p className="text-3xl font-bold text-blue-400">
                      {subscriptionData.daysLeft}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 rounded-lg p-4 border border-green-500/30">
                    <p className="text-gray-400 text-sm mb-2">Current BPM</p>
                    <p className="text-3xl font-bold text-green-400">
                      {bpmReadings[0]?.bpm || "—"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* BPM Tab */}
            {activeTab === "bpm" && (
              <div className="bg-[#0f172a] rounded-lg p-6 border border-slate-700">
                <h2 className="text-xl font-bold mb-4">Recent BPM Readings</h2>
                <div className="space-y-3">
                  {bpmReadings.map((reading, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                    >
                      <div>
                        <p className="font-semibold">{reading.date}</p>
                        <p className="text-gray-400 text-sm">{reading.time}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">
                          {reading.bpm}
                        </p>
                        <p className="text-gray-400 text-xs">BPM</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subscription Tab */}
            {activeTab === "subscription" && (
              <div className="space-y-6">
                <div className="bg-[#0f172a] rounded-lg p-6 border border-slate-700">
                  <h2 className="text-xl font-bold mb-4">Current Subscription</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-gray-400 text-sm">Plan</p>
                      <p className="text-2xl font-bold text-cyan-400">
                        {subscriptionData.plan}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Status</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <p className="text-lg font-semibold capitalize">
                          {subscriptionData.status}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Days Left</p>
                      <p className="text-2xl font-bold text-yellow-400">
                        {subscriptionData.daysLeft} days
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Monthly Price</p>
                      <p className="text-2xl font-bold text-green-400">
                        ${subscriptionData.amount}
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
                    <p className="text-gray-400 text-sm mb-2">Valid Until</p>
                    <p className="text-lg font-semibold">
                      {new Date(subscriptionData.endDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </p>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition font-semibold">
                    Renew Subscription
                  </button>
                </div>

                {/* Transaction History */}
                <div className="bg-[#0f172a] rounded-lg p-6 border border-slate-700">
                  <h2 className="text-xl font-bold mb-4">Transaction History</h2>
                  <div className="space-y-2">
                    {transactions.map((txn) => (
                      <div
                        key={txn.id}
                        className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700"
                      >
                        <div>
                          <p className="font-semibold">{txn.type}</p>
                          <p className="text-gray-400 text-sm">{txn.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-semibold">
                            ${txn.amount}
                          </p>
                          <p
                            className={`text-xs ${
                              txn.status === "completed"
                                ? "text-green-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {txn.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-2 flex items-center justify-center gap-2 border border-slate-600 rounded-lg hover:bg-slate-800 transition">
                    <Download className="w-4 h-4" />
                    Download Invoices
                  </button>
                </div>
              </div>
            )}

            {/* Calendar Tab */}
            {activeTab === "calendar" && (
              <div className="bg-[#0f172a] rounded-lg p-6 border border-slate-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Attendance Calendar</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() - 1
                          )
                        )
                      }
                      className="px-3 py-1 bg-slate-700 rounded hover:bg-slate-600 transition"
                    >
                      ←
                    </button>
                    <span className="px-4 py-1 text-center min-w-[150px]">
                      {currentMonth.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() + 1
                          )
                        )
                      }
                      className="px-3 py-1 bg-slate-700 rounded hover:bg-slate-600 transition"
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center font-semibold text-gray-400 text-sm py-2"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-2">
                    {Array(getFirstDayOfMonth(currentMonth))
                      .fill(null)
                      .map((_, i) => (
                        <div key={`empty-${i}`}></div>
                      ))}

                    {Array(getDaysInMonth(currentMonth))
                      .fill(null)
                      .map((_, i) => {
                        const day = i + 1;
                        const isAbsent = isAbsentDay(day);
                        return (
                          <button
                            key={day}
                            onClick={() => toggleAttendance(day)}
                            className={`aspect-square rounded-lg font-semibold transition ${
                              isAbsent
                                ? "bg-red-600 text-white hover:bg-red-700"
                                : "bg-slate-700 text-white hover:bg-slate-600"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <p className="text-gray-400 text-sm">
                    Click on a date to mark as absent
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-600 rounded"></div>
                    <p className="text-sm">Absent ({attendanceDays.length})</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subscription Status Card */}
            <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-lg p-6 border border-blue-500/30">
              <p className="text-gray-400 text-sm mb-2">Subscription</p>
              <p className="text-3xl font-bold text-cyan-400 mb-4">
                {subscriptionData.daysLeft}
              </p>
              <p className="text-gray-300 mb-4">days left in your plan</p>
              <button className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition font-semibold">
                Upgrade Plan
              </button>
            </div>

            {/* Latest BPM */}
            <div className="bg-gradient-to-br from-green-600/10 to-emerald-600/10 rounded-lg p-6 border border-green-500/30">
              <p className="text-gray-400 text-sm mb-2">Latest BPM</p>
              <p className="text-3xl font-bold text-green-400 mb-2">
                {bpmReadings[0]?.bpm}
              </p>
              <p className="text-gray-300 text-sm mb-4">
                {bpmReadings[0]?.time}
              </p>
              <div className="h-12 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400">
                📈 Normal
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#0f172a] rounded-lg p-6 border border-slate-700">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-left text-sm">
                  📊 View Progress
                </button>
                <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-left text-sm">
                  🏋️ Schedule Workout
                </button>
                <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-left text-sm">
                  👨‍🏫 Book Coach
                </button>
                <button className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-left text-sm">
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
