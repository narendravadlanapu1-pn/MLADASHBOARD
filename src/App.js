import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Regpage from "./components/Register/Regpage";
import LoginPage from "./components/Loginpage";
import HomePage from "./components/Homepage";
import MLADashboard from "./components/MLADASHBOARD";
import Developments from "./components/Developments";
import Feedback from "./components/Feedback";
import Navbar from "./components/navbar";
import Report from "./components/Report"; // ✅ import here

function App() {
  return (
    <Router>
      <Routes>
        {/* Register Page */}
        <Route path="/" element={<Regpage />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Home */}
        <Route
          path="/home/*"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />

        {/* MLA Dashboard */}
        <Route
          path="/mla"
          element={
            <>
              <Navbar />
              <MLADashboard />
            </>
          }
        />

        {/* Developments */}
        <Route
          path="/developments/:mlaName"
          element={
            <>
              <Navbar />
              <Developments />
            </>
          }
        />

        {/* Feedback */}
        <Route
          path="/feedback"
          element={
            <>
              <Navbar />
              <Feedback />
            </>
          }
        />

        {/* ✅ Report Page */}
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
