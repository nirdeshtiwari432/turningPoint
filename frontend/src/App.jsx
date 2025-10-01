import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import SignupPage from "./components/Signup/SignupPage";
import LoginPage from "./components/Login/LoginPage"; // ✅ use full-page login
import MembershipPage from "./components/Membership/MembershipPage";
import AboutPage from "./components/About/AboutPage";
import AdminDashboard  from "./components/Dashboard/AdminDashboard";
import MembersPage from "./components/Dashboard/MembersPage";
import SeatsPage from "./components/Dashboard/SeatsPage";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<AboutPage />} /> 
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/membership" element={<MembershipPage />} /> {/* ✅ New */}
        <Route path="/members" element={<MembersPage />} />
        <Route path="/seats" element={<SeatsPage />} />

      </Routes>
    </>
  );
}

export default App;
