import React, { useState, useEffect } from "react";
import { Heart, Activity, TrendingUp, AlertCircle } from "lucide-react";

const BpmMeter = () => {
  const [bpm, setBpm] = useState(0);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [bpmHistory, setBpmHistory] = useState([]);

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        const randomBpm = Math.floor(Math.random() * (100 - 60) + 60);
        setBpm(randomBpm);
        setBpmHistory((prev) => [...prev.slice(-9), randomBpm]);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const getHeartStatus = () => {
    if (bpm < 60)
      return {
        label: "Low",
        color: "from-blue-500 to-blue-600",
        warning: "Rest zone",
      };
    if (bpm < 100)
      return {
        label: "Normal",
        color: "from-green-500 to-green-600",
        warning: "Healthy",
      };
    if (bpm < 140)
      return {
        label: "Elevated",
        color: "from-yellow-500 to-yellow-600",
        warning: "Moderate exercise",
      };
    return {
      label: "High",
      color: "from-red-500 to-red-600",
      warning: "Intense exercise",
    };
  };

  const status = getHeartStatus();

  return (
    <div className="min-h-screen bg-[#050816] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-0">
      <div>
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#22c55e] to-[#38bdf8] bg-clip-text text-transparent">
              Heart Rate Monitor
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300">
            Track your heart rate in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
          {/* BPM Display */}
          <div className="md:col-span-2">
            <div
              className={`bg-gradient-to-br ${status.color} rounded-2xl p-12 border border-red-400/30 shadow-2xl relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Heart className={`w-8 h-8 text-white animate-pulse`} />
                  <h2 className="text-white text-lg font-semibold">
                    {status.label}
                  </h2>
                </div>
                <div className="text-center mb-8">
                  <p className="text-white/80 text-sm mb-2">Current BPM</p>
                  <p className="text-7xl font-bold text-white">{bpm}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/90 text-lg font-semibold">
                    {status.warning}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-[#0f172a] rounded-2xl p-6 border border-[#22c55e]/30">
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-2">Max BPM</p>
                <p className="text-3xl font-bold text-[#22c55e]">
                  {bpmHistory.length > 0 ? Math.max(...bpmHistory) : "--"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Min BPM</p>
                <p className="text-3xl font-bold text-[#22c55e]">
                  {bpmHistory.length > 0 ? Math.min(...bpmHistory) : "--"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Avg BPM</p>
                <p className="text-3xl font-bold text-[#22c55e]">
                  {bpmHistory.length > 0
                    ? Math.round(
                        bpmHistory.reduce((a, b) => a + b) / bpmHistory.length
                      )
                    : "--"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 border border-slate-600 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-2">
                Real-time Monitoring
              </h3>
              <p className="text-gray-400 text-sm">
                {isMonitoring
                  ? "Monitoring active..."
                  : "Click start to begin monitoring"}
              </p>
            </div>
            <button
              onClick={() => setIsMonitoring(!isMonitoring)}
              className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
                isMonitoring
                  ? "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/50"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-cyan-500/50"
              }`}
            >
              {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
            </button>
          </div>
        </div>

        {/* Chart */}
        {bpmHistory.length > 0 && (
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 border border-slate-600">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Heart Rate History
            </h3>
            <div className="h-40 flex items-end justify-between gap-1 px-4">
              {bpmHistory.map((value, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg transition-all"
                  style={{ height: `${(value / 150) * 100}%` }}
                  title={`${value} BPM`}
                ></div>
              ))}
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            {
              icon: Activity,
              title: "Resting",
              bpm: "60-100",
              color: "from-green-500",
            },
            {
              icon: TrendingUp,
              title: "Moderate Exercise",
              bpm: "100-140",
              color: "from-yellow-500",
            },
            {
              icon: Heart,
              title: "Intense Exercise",
              bpm: "140+",
              color: "from-red-500",
            },
          ].map((zone, i) => {
            const Icon = zone.icon;
            return (
              <div
                key={i}
                className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${zone.color} to-transparent rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon className="text-white w-6 h-6" />
                </div>
                <h4 className="text-white font-bold mb-1">{zone.title}</h4>
                <p className="text-cyan-400 font-semibold">{zone.bpm}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BpmMeter;
