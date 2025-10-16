import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import BankDetailsTable from "./Fees/BankDetailsTable";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [monthlyData, setMonthlyData] = useState({ totalAmount: 0, users: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyCollection = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/monthly-collection", {
          credentials: "include",
        });
        const result = await res.json();
        setMonthlyData(result);
      } catch (error) {
        console.error("Error fetching monthly collection:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyCollection();
  }, []);

  return (
    <DashboardHeader>
      <div className="admin-dashboard-container">
        {/* Main Dashboard Header */}
        <div className="dashboard-header-section">
          <h1 className="dashboard-main-title">Turning Point</h1>
          <p className="dashboard-subtitle">Library Management Dashboard</p>
        </div>

        {/* Monthly Collection Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Monthly Collection</h3>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="loading-state">Loading data...</div>
            ) : (
              <div className="monthly-collection-content">
                <div className="total-amount-section">
                  <span className="amount-label">Total Amount</span>
                  <div className="amount-value">₹{monthlyData.totalAmount || 0}</div>
                </div>
                
                {monthlyData.users.length > 0 ? (
                  <div className="table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Membership Type</th>
                          <th>Plan</th>
                          <th>Fees</th>
                          <th>End Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyData.users.map((user) => (
                          <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.membershipType}</td>
                            <td>{user.plan}</td>
                            <td className="fees-amount">₹{user.fees}</td>
                            <td>{new Date(user.endDate).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="no-data">
                    <p>No paid members this month.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Today's Payments - Stacked Format */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Today's Payments</h3>
          </div>
          <div className="card-body">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ACCOUNT HOLDER</th>
                    <th>UPI MOBILE</th>
                    <th>PLAN</th>
                    <th>AMOUNT</th>
                    <th>VERIFIED</th>
                    <th>SUBMITTED AT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rohit Sharma</td>
                    <td>9990001111</td>
                    <td>Gold Plan</td>
                    <td className="fees-amount">₹1500</td>
                    <td>
                      <span className="status-badge verified">Yes</span>
                    </td>
                    <td>10/15/2024 6:34:55</td>
                  </tr>
                  <tr>
                    <td>Priya Verma</td>
                    <td>8881112222</td>
                    <td>Silver Plan</td>
                    <td className="fees-amount">₹1000</td>
                    <td>
                      <span className="status-badge not-verified">No</span>
                    </td>
                    <td>10/15/2024 5:20:30</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Seat Booking Status - Stacked Format */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Seat Booking Status</h3>
          </div>
          <div className="card-body">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>SEAT NO.</th>
                    <th>STATUS</th>
                    <th>BOOKED BY</th>
                    <th>TIMING</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1A</td>
                    <td>
                      <span className="status-badge booked">BOOKED</span>
                    </td>
                    <td>John Doe</td>
                    <td>10:00 - 11:00</td>
                  </tr>
                  <tr>
                    <td>1B</td>
                    <td>
                      <span className="status-badge available">AVAILABLE</span>
                    </td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>2A</td>
                    <td>
                      <span className="status-badge booked">BOOKED</span>
                    </td>
                    <td>Jane Smith</td>
                    <td>09:00 - 12:00</td>
                  </tr>
                  <tr>
                    <td>2B</td>
                    <td>
                      <span className="status-badge available">AVAILABLE</span>
                    </td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardHeader>
  );
};

export default AdminDashboard;