import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import SignupPage from "./components/Signup/SignupPage";
import LoginPage from "./components/Login/LoginPage"; // ✅ use full-page login
import MembershipPage from "./components/Membership/MembershipPage";
import AboutPage from "./components/About/AboutPage";
import Footer from './components/Footer/Footer';
import Seat from "./components/Dashboard/Seat";   // your Seat component
import Alerts from "./components/Alert/Alert"; // your Alerts component
import AdminDashboard  from "./components/Dashboard/AdminDashboard";
import MembersPage from "./components/Dashboard/MembersPage";
import SeatsPage from "./components/Dashboard/SeatsPage";
import EditMemberPage from "./components/Dashboard/edit.jsx";
import MemberDetailsPage from "./components/Dashboard/MemberDetailsPage.jsx";
import ProtectedRoute from "./components/Dashboard/ProtectedRoute.jsx";
import Unpaid from "./components/Dashboard/Unpaid/UnpaidPage.jsx";
import NewMember from "./components/Dashboard/newmember.jsx";
import PaymentPage from "./components/Payments/PaymentPage.jsx";
import Plan from "./components/Dashboard/plan/ManagePlans.jsx"


import Profile from "./components/user/ProfilePage.jsx"
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<AboutPage />} /> 
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/membership" element={<MembershipPage />} /> {/* ✅ New */}

        <Route path="/seats" element={<ProtectedRoute><Seat /></ProtectedRoute>} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/members" element={<ProtectedRoute><MembersPage /></ProtectedRoute>} />
        <Route path="/seats" element={<ProtectedRoute><SeatsPage /></ProtectedRoute>} />
        <Route path="/members/:id" element={<ProtectedRoute><MemberDetailsPage /></ProtectedRoute>} />
        <Route path="/members/:id/edit" element={<ProtectedRoute><EditMemberPage /></ProtectedRoute>} />
        <Route path="/unpaid" element={<ProtectedRoute><Unpaid /></ProtectedRoute>} />
        <Route path="/admin/new/:seatId/:seatNo" element={<ProtectedRoute><NewMember /></ProtectedRoute>} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/plan" element={<Plan />} />

        
      
        <Route path="/user/profile" element={<Profile/>} />
      </Routes>
        <Footer />

    </>
  );
}

export default App;
