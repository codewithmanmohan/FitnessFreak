import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Dumbbell, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 shadow-lg w-full">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link
            to="/"
            className="flex items-center space-x-1 sm:space-x-2 group flex-shrink-0"
          >
            <div className="p-1 sm:p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/50 transition">
              <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hidden sm:block">
              FitnessFreak
            </span>
            <span className="text-lg sm:hidden font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              FF
            </span>
          </Link>

          <ul className="hidden md:flex space-x-4 lg:space-x-8">
            {[
              { path: "/", label: "Home" },
              { path: "/bpm-meter", label: "BPM Meter" },
              { path: "/coaches", label: "Coaches" },
              { path: "/plans", label: "Plans" },
              { path: "/supplements", label: "Shop" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm lg:text-base text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex space-x-2 lg:space-x-4 items-center">
            <Link
              to="/chatbot"
              className="p-2 text-cyan-400 border border-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-slate-900 transition-all duration-200"
              title="Chat with AI Coach"
            >
              <MessageCircle size={18} />
            </Link>
            <Link
              to="/login"
              className="px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm text-cyan-400 border border-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-slate-900 transition-all duration-200 font-semibold whitespace-nowrap"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-200 font-semibold whitespace-nowrap"
            >
              Sign Up
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-cyan-400 flex-shrink-0"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-700 bg-slate-900/95 backdrop-blur-sm">
            <ul className="space-y-1 pt-3 px-2">
              {[
                { path: "/", label: "Home" },
                { path: "/bpm-meter", label: "BPM Meter" },
                { path: "/coaches", label: "Coaches" },
                { path: "/plans", label: "Plans" },
                { path: "/supplements", label: "Shop" },
                { path: "/chatbot", label: "AI Coach" },
                { path: "/login", label: "Login" },
                { path: "/signup", label: "Sign Up" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="block text-sm text-gray-300 hover:text-cyan-400 transition-colors py-2.5 px-3 hover:bg-slate-800 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
