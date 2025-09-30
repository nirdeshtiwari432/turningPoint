import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let userData;

    // Check for admin credentials
    if (email === "admin@library.com" && password === "Admin123") {
      userData = {
        email,
        username: "Admin",
        role: "admin",
      };
    } else {
      // Default normal user
      userData = {
        email,
        username: email.split("@")[0],
        role: "user",
      };
    }

    // Save user info to localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    // Redirect to profile or dashboard
    navigate("/profile");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue your journey.</p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn primary">
            Login
          </button>
        </form>

        <p className="switch">
          Don’t have an account?{" "}
          <a href="/signup" className="link">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
