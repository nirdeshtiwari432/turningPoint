import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/logout", {
        method: "GET", 
        credentials: "include",
      });

      if (res.ok) {
        navigate("/login"); // redirect to login page
      } else {
        alert("Logout failed. Try again.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed. Check console.");
    }
  };

  return (
    <div className="container my-4">
      <h3>Welcome to Admin Dashboard</h3>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="btn btn-dark navbar-brand"
            onClick={() => navigate("/dashboard")}
          >
            Library Admin
          </button>
          
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-1">
                <button
                  className="btn btn-outline-light"
                  onClick={() => navigate("/members")}
                >
                  Member Details
                </button>
              </li>
              <li className="nav-item mx-1">
                <button
                  className="btn btn-outline-light"
                  onClick={() => navigate("/unpaid")}
                >
                  Unpaid Member
                </button>
              </li>
              <li className="nav-item mx-1">
                <button
                  className="btn btn-outline-light"
                  onClick={() => navigate("/plan")}
                >
                  Plan
                </button>
              </li>
              <li className="nav-item mx-1">
                <button
                  className="btn btn-outline-light"
                  onClick={() => navigate("/seats")}
                >
                  Seat Details
                </button>
              </li>
              <li className="nav-item mx-1">
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardHeader;
