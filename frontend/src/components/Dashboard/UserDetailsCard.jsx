import React from "react";
import { useNavigate } from "react-router-dom";

const UserDetailsCard = ({ user }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:5000/admin/users/${user._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("User deleted successfully.");
        navigate("/members"); // go back to members list
      } else {
        alert("Failed to delete user.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting user.");
    }
  };

  return (
    <div className="container my-5">
      <div className="card w-100">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">User Details</h2>
        </div>
        <div className="card-body">
          {[
            { label: "Name", value: user.name },
            { label: "Email", value: user.email || "-" },
            { label: "Number", value: user.number },
            { label: "Seat", value: user.seat?.seatNo || "N/A" },
            { label: "Membership", value: user.membershipType },
            { label: "Plan", value: user.plan },
            { label: "Shift", value: user.shift },
            { label: "Fees", value: `₹${user.fees}` },
            { label: "Start Date", value: user.startDate ? new Date(user.startDate).toLocaleDateString("en-GB") : "-" },
            { label: "End Date", value: user.endDate ? new Date(user.endDate).toLocaleDateString("en-GB") : "-" },
          ].map((field, idx) => (
            <div className="row mb-2" key={idx}>
              <div className="col-sm-4 fw-bold">{field.label}:</div>
              <div className="col-sm-8">{field.value}</div>
            </div>
          ))}

          {/* Buttons */}
          <div className="mt-4 d-flex gap-2">
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/members/${user._id}/edit`)}
            >
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
