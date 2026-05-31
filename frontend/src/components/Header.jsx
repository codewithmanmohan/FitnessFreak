import React from "react";
import { FaDumbbell } from "react-icons/fa";

const Header = ({ setActiveSection, isLoggedIn }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaDumbbell className="text-yellow-400 text-3xl animate-bounce" />
          <h1 className="text-3xl font-bold text-white">Fitness Freak</h1>
        </div>
        <nav className="flex space-x-4">
          {["plans", "gyms", "trainers", "bpm", "shop", "login", "payment"].map(
            (section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className="text-white hover:text-yellow-300 transition duration-300 capitalize"
              >
                {section}
              </button>
            )
          )}
        </nav>
        {isLoggedIn && <span className="text-green-300">Logged In</span>}
      </div>
    </header>
  );
};

export default Header;
