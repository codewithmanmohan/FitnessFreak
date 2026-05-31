import React, { useState } from "react";
import { Calendar, Clock, User, CheckCircle } from "lucide-react";

export default function Availability() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCoach, setSelectedCoach] = useState(null);

  const coaches = [
    { id: 1, name: "Alex Johnson", specialty: "Strength" },
    { id: 2, name: "Sarah Williams", specialty: "Yoga" },
    { id: 3, name: "Mike Davis", specialty: "Cardio" },
  ];

  const timeSlots = [
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
  ];

  return (
    <div className="min-h-screen bg-[#050816] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-0">
      <div>
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#22c55e] to-[#38bdf8] bg-clip-text text-transparent">
              Book Your Session
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300">
            Schedule a session with your favorite coach
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Step 1: Select Coach */}
          <div className="bg-[#0f172a] rounded-2xl p-6 border border-[#22c55e]/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22c55e] to-[#38bdf8] flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-white">Select Coach</h3>
            </div>
            <div className="space-y-3">
              {coaches.map((coach) => (
                <button
                  key={coach.id}
                  onClick={() => setSelectedCoach(coach)}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    selectedCoach?.id === coach.id
                      ? "bg-[#22c55e]/20 border-2 border-[#22c55e]"
                      : "bg-[#0f172a]/50 border border-[#22c55e]/30 hover:border-[#22c55e]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{coach.name}</p>
                      <p className="text-sm text-gray-400">{coach.specialty}</p>
                    </div>
                    {selectedCoach?.id === coach.id && (
                      <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Date */}
          <div className="bg-[#0f172a] rounded-2xl p-6 border border-[#22c55e]/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-white">Select Date</h3>
            </div>
            <input
              type="date"
              value={selectedDate || ""}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-slate-600 text-white rounded-lg px-4 py-3 border border-slate-500 focus:border-cyan-500 focus:outline-none transition"
            />
            {selectedDate && (
              <p className="text-cyan-400 text-sm mt-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(selectedDate).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Step 3: Select Time */}
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 border border-slate-600">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-white">Select Time</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg text-sm font-semibold transition-all ${
                    selectedTime === time
                      ? "bg-cyan-500 text-slate-900"
                      : "bg-slate-600/50 text-white hover:bg-slate-600"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary & Booking */}
        <div className="mt-12 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 border border-cyan-500/30 backdrop-blur">
          <h2 className="text-2xl font-bold text-white mb-6">
            Booking Summary
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center gap-4">
              <User className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-gray-400 text-sm">Coach</p>
                <p className="text-white font-semibold">
                  {selectedCoach?.name || "Not selected"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-gray-400 text-sm">Date</p>
                <p className="text-white font-semibold">
                  {selectedDate
                    ? new Date(selectedDate).toLocaleDateString()
                    : "Not selected"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-gray-400 text-sm">Time</p>
                <p className="text-white font-semibold">
                  {selectedTime || "Not selected"}
                </p>
              </div>
            </div>
          </div>
          <button
            disabled={!selectedCoach || !selectedDate || !selectedTime}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
