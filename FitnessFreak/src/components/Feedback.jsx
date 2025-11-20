import React, { useState } from "react";
import { MessageSquare, Star, Send } from "lucide-react";
import { feedbackAPI } from "../utils/api";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await feedbackAPI.submit({
        rating,
        message: feedback,
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFeedback("");
        setRating(0);
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to submit feedback. Please try again.");
      console.error("Feedback error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-0">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#22c55e] to-[#38bdf8] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#22c55e] to-[#38bdf8] bg-clip-text text-transparent">
              We Value Your Feedback
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300">
            Help us improve your fitness experience
          </p>
        </div>

        {/* Feedback Form */}
        <div className="bg-[#0f172a] rounded-2xl p-6 sm:p-8 border border-[#22c55e]/30">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-gray-400">
                Your feedback has been submitted successfully. We'll review it
                and improve our services.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-white mb-4">
                  How would you rate your experience?
                </label>
                <div className="flex gap-2 justify-center md:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-500"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-cyan-400 text-sm mt-2">
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </p>
                )}
              </div>

              {/* Feedback Text */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Tell us what you think
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or anything else you'd like us to know..."
                  rows="6"
                  className="w-full bg-slate-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 border border-slate-500 focus:border-cyan-500 focus:outline-none transition resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || rating === 0 || !feedback.trim()}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 font-bold flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Feedback"}
                {!loading && (
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition" />
                )}
              </button>
            </form>
          )}
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Frequently Asked
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How do you use my feedback?",
                a: "We carefully review all feedback to identify areas for improvement and enhancement.",
              },
              {
                q: "Will I get a response?",
                a: "For specific issues, our team will reach out within 48 hours.",
              },
              {
                q: "Can I give feedback anonymously?",
                a: "Yes, you can submit feedback without providing personal information.",
              },
              {
                q: "How often should I give feedback?",
                a: "Share feedback whenever you have suggestions or experiences to discuss.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-slate-700/50 rounded-lg p-6 border border-slate-600 hover:border-cyan-500 transition"
              >
                <h4 className="font-bold text-white mb-3">{faq.q}</h4>
                <p className="text-gray-300 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
