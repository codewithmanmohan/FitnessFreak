import React, { useState, useEffect } from "react";
import { Star, MapPin, Award, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { coachesAPI } from "../utils/api";

export default function Coaches() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const data = await coachesAPI.getAll();
        setCoaches(data.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch coaches");
        console.error("Error fetching coaches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  const handleBook = (coachId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please log in to book a coach");
      navigate("/login");
      return;
    }
    navigate(`/availability?coachId=${coachId}`);
  };

  return (
    <div className="min-h-screen bg-[#050816] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-0">
      <div>
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#22c55e] to-[#38bdf8] bg-clip-text text-transparent">
              Meet Our Expert Coaches
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with certified trainers who are passionate about your
            success
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-[#22c55e]/30 border-t-[#22c55e] rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-400 mt-4">Loading coaches...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-center mb-6">
            {error}
          </div>
        )}

        {/* Coaches Grid */}
        {!loading && coaches.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {coaches.map((coach) => (
              <div
                key={coach.id}
                className="group relative bg-[#0f172a] rounded-xl overflow-hidden border border-[#22c55e]/30 hover:border-[#22c55e] transition-all duration-300 hover:shadow-xl hover:shadow-[#22c55e]/20"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#22c55e] to-[#38bdf8] overflow-hidden">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {coach.name}
                  </h3>
                  <p className="text-cyan-400 text-sm mb-4">
                    {coach.specialty}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-gray-300 text-sm">
                      {coach.rating}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-slate-600">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Award className="w-4 h-4 text-cyan-400" />
                      {coach.experience}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Users className="w-4 h-4 text-cyan-400" />
                      {coach.students} students
                    </div>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      ${coach.hourlyRate || 0}/hr
                    </span>
                    <button
                      onClick={() => handleBook(coach._id)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-semibold text-sm"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && coaches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No coaches available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
