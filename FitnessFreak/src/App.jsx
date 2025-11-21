import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ViewContainer from "./components/ViewContainer";
import HomePremium from "./components/HomePremium";
import BpmMeter from "./components/BpmMeter";
import Coaches from "./components/Coaches";
import Plans from "./components/Plans";
import Availability from "./components/Availability";
import Supplements from "./components/Supplements";
import SupplementShop from "./components/SupplementShop";
import CartPage from "./components/CartPage";
import Chatbot from "./components/Chatbot";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Feedback from "./components/Feedback";
import Dashboard from "./components/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );

  return (
    <Router>
      <div className="min-h-screen bg-[#050816] text-[#e5e7eb] overflow-x-hidden">
        <Navbar />
        <ViewContainer>
          <Routes>
            <Route path="/" element={<HomePremium />} />
            <Route path="/bpm-meter" element={<BpmMeter />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="/supplements" element={<Supplements />} />
            <Route path="/supplement-shop" element={<SupplementShop />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </ViewContainer>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
