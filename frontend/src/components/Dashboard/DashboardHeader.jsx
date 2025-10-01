import React from "react";
import { Link } from "react-router-dom";

const DashboardHeader = () => (
  <div className="container my-4">
    <h3>Welcome to Admin Dashboard</h3>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">Library Admin</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/members">Member Details</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/seats">Seat Details</Link></li>
            <li className="nav-item"><a className="nav-link" href="/admin/logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);

export default DashboardHeader;
