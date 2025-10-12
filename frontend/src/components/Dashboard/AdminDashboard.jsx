import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import BankDetailsTable from "./Fees/BankDetailsTable"

const AdminDashboard = () => {
  const [data, setData] = useState({ totalAmount: 0, users: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyCollection = async () => {
      try {
        const res = await fetch("/admin/monthly-collection", {
          credentials: "include",
        });
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching monthly collection:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyCollection();
  }, []);

  return (
    <div className="bg-light min-vh-100">
      <DashboardHeader />


      {/* Monthly Collection */}
      <div className="container my-5 p-4 bg-white shadow-sm rounded">
        <h3 className="mb-3">💰 This Month's Collection</h3>

        {loading ? (
          <p className="text-center mt-4">Loading data...</p>
        ) : (
          <>
            <h5 className="text-success mb-4">
              Total Amount: ₹{data.totalAmount || 0}
            </h5>

            {data.users.length > 0 ? (
              <table className="table table-striped table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Membership Type</th>
                    <th>Plan</th>
                    <th>Fees</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.membershipType}</td>
                      <td>{user.plan}</td>
                      <td>₹{user.fees}</td>
                      <td>{new Date(user.endDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">No paid members this month.</p>
            )}
          </>
        )}
      </div>
      <div>
        <h1>Today Payments</h1>
        <BankDetailsTable/>
      </div>
    </div>
  );
};

export default AdminDashboard;
