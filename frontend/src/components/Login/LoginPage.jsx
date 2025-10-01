import React, { useState } from "react";
import "./login.css";

const LoginPage = () => {
  const [mobile, setMobile] = useState(""); // changed from email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // for passport sessions/cookies
        body: JSON.stringify({ mobile, password }) // send mobile instead of username
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message); // or redirect
        window.location.href = "/dashboard"; 
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong, please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back Admin</h2>
        <p className="subtitle">Login to continue your journey.</p>

        <form onSubmit={handleSubmit}>
          {/* Mobile */}
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
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

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
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
