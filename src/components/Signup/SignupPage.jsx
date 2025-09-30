import React, { useState } from "react";
import "./Signup.css";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    studyingFor: "",
    aadhar: "",   // ✅ New
    address: "",  // ✅ New
    seatNumber: "",
    seatType: "",
    timing: "",
    id: "AUTOGEN-12345",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", form);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create your account</h2>
        <p className="subtitle">Join our community of learners.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Name */}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* Profile Photo */}
            <div className="form-group">
              <label>Profile Photo</label>
              <div className="file-upload">
                <p>
                  <span className="link">Upload a file</span> or drag and drop
                </p>
                <p className="hint">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>

            {/* Studying For with datalist */}
            <div className="form-group">
              <label>Studying For</label>
              <input
                type="text"
                name="studyingFor"
                placeholder="Type your course"
                list="courseOptions"
                value={form.studyingFor}
                onChange={handleChange}
              />
              <datalist id="courseOptions">
                <option value="UPSC" />
                <option value="SSC" />
                <option value="Placement" />
                <option value="MBA" />
              </datalist>
            </div>

            {/* Contact Number */}
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                name="contact"
                placeholder="Enter 10-digit number"
                value={form.contact}
                onChange={handleChange}
                maxLength={10}
              />
            </div>

            {/* ✅ Aadhar Number (optional) */}
            <div className="form-group">
              <label>Aadhar Number (Optional)</label>
              <input
                type="text"
                name="aadhar"
                placeholder="Enter Aadhar number"
                value={form.aadhar}
                onChange={handleChange}
                maxLength={12}
              />
            </div>

            {/* ✅ Address (optional) */}
            <div className="form-group">
              <label>Address (Optional)</label>
              <textarea
                name="address"
                placeholder="Enter your address"
                value={form.address}
                onChange={handleChange}
                rows="3"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your valid email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {/* Auto-generated ID */}
            <div className="form-group">
              <label>ID</label>
              <input type="text" value={form.id} readOnly />
            </div>

            {/* Seat Number */}
            <div className="form-group">
              <label>Seat Number</label>
              <input
                type="number"
                name="seatNumber"
                placeholder="Enter seat number"
                value={form.seatNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Seat Type */}
          <div className="form-group full-width">
            <label>Seat Type</label>
            <select
              name="seatType"
              value={form.seatType}
              onChange={handleChange}
            >
              <option value="">Select seat type</option>
              <option value="reserved">Reserved</option>
              <option value="unreserved">Unreserved</option>
            </select>
          </div>

          {/* Timing */}
          <div className="form-group full-width">
            <label>Timing</label>
            <select
              name="timing"
              value={form.timing}
              onChange={handleChange}
            >
              <option value="">Choose timing</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="full-time">Full Time</option>
            </select>
          </div>

          <button type="submit" className="btn primary">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
