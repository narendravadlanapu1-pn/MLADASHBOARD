import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Regpage from "./components/Register/Regpage";
import LoginPage from "./components/Loginpage";
import HomePage from "./components/Homepage";
import MLADashboard from "./components/MLADASHBOARD";
import MlaDetails from "./components/MlaDeatils"; // ✅ Updated
import Feedback from "./components/Feedback";
import Report from "./components/Report";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 Register Page */}
        <Route path="/" element={<Regpage />} />

        {/* 🔑 Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🏡 Home Page */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />

        {/* 🧑‍💼 MLA Dashboard */}
        <Route
          path="/mla"
          element={
            <>
              <Navbar />
              <MLADashboard />
            </>
          }
        />

        {/* 🧾 MLA Details (Dynamic Route) */}
        <Route
          path="/mla/:id"
          element={
            <>
              <Navbar />
              <MlaDetails />
            </>
          }
        />

        {/* 💬 Feedback Page */}
        <Route
          path="/feedback"
          element={
            <>
              <Navbar />
              <Feedback />
            </>
          }
        />

        {/* 📊 Report Page */}
        <Route
          path="/report"
          element={
            <>
              <Navbar />
              <Report />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
