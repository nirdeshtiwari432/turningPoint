import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    membershipType: "",
    plan: "",
    shift: "full",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      name: form.name,
      email: form.email,
      number: form.number,
      membershipType: form.membershipType.toLowerCase(),
      plan: form.plan.toLowerCase(),
      shift: form.shift.toLowerCase(),
      password: form.password,
    };

    try {
      const res = await fetch("http://localhost:5000/user/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include", // send session cookies
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Account created successfully!");
        setForm({
          name: "",
          email: "",
          number: "",
          membershipType: "",
          plan: "",
          shift: "full",
          password: "",
        });

        // Redirect to profile
        navigate("/user/profile");
      } else {
        setMessage(`❌ ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage("❌ Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create Account</h2>
        <p className="subtitle">Sign up to get started</p>

        {message && (
          <div className={`alert ${message.startsWith("✅") ? "alert-success" : "alert-danger"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Name */}
            <div className="form-group">
              <label>Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
            </div>

            {/* Number */}
            <div className="form-group">
              <label>Mobile Number *</label>
              <input type="text" name="number" value={form.number} onChange={handleChange} placeholder="Enter 10-digit number" maxLength={10} required />
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password *</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" required />
            </div>

            {/* Membership Type */}
            <div className="form-group">
              <label>Membership Type *</label>
              <select name="membershipType" value={form.membershipType} onChange={handleChange} required>
                <option value="">Select type</option>
                <option value="reserved">Reserved</option>
                <option value="non_reserved">Non Reserved</option>
              </select>
            </div>

            {/* Plan */}
            <div className="form-group">
              <label>Plan *</label>
              <select name="plan" value={form.plan} onChange={handleChange} required>
                <option value="">Select plan</option>
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
              </select>
            </div>

            {/* Shift */}
            <div className="form-group">
              <label>Shift *</label>
              <select name="shift" value={form.shift} onChange={handleChange} required>
                <option value="morning">Morning</option>
                <option value="night">Night</option>
                <option value="full">Full</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
