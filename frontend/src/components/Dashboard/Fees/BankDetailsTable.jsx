import React, { useEffect, useState } from "react";
import "./BankDetailsTable.css";
import { useNavigate } from "react-router-dom";

const BankDetailsTable = () => {
  const navigate = useNavigate();
  const [bankDetails, setBankDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/fees",{
          method:"GET",
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBankDetails(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bank details");
        setLoading(false);
      }
    };

    fetchBankDetails();
  }, []);

  // ✅ Verify handler
  const handleVerify = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/varify/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to verify");

      setBankDetails((prev) =>
        prev.map((detail) =>
          detail._id === id ? { ...detail, verified: true } : detail
        )
      );
      alert("Verification successful ✅");
    } catch (err) {
      alert("Verification failed ❌");
    }
  };

  // 🗑️ Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const response = await fetch(`http://localhost:5000/admin/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete record");

      // Remove deleted item from state
      setBankDetails((prev) => prev.filter((detail) => detail._id !== id));
      alert("Bank detail deleted successfully 🗑️");
    } catch (err) {
      alert("Failed to delete ❌");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bank-details-container">
      <h2>Bank Details</h2>
      <table className="bank-details-table">
        <thead>
          <tr>
            <th>Account Holder</th>
            <th>UPI Mobile</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Verified</th>
            <th>Submitted At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bankDetails.map((detail) => (
            <tr key={detail._id}>
              <td>{detail.accountHolder}</td>
              <td>{detail.upiMobile}</td>
              <td>{detail.plan}</td>
              <td>{detail.amount}</td>
              <td>{detail.verified ? "Yes" : "No"}</td>
              <td>{new Date(detail.submittedAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/members/${detail.user}`)}
                  style={{ marginRight: "5px" }}
                >
                  View
                </button>
                {!detail.verified && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleVerify(detail._id)}
                    style={{ marginRight: "5px" }}
                  >
                    Verify
                  </button>
                )}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(detail._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BankDetailsTable;
