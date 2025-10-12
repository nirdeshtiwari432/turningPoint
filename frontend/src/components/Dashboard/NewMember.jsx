import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";

const NewMember = () => {
  const { seatId, seatNo } = useParams(); // get seat info from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    seatId: seatId || "",
    name: "",
    email: "",
    number: "",
    membershipType: "",
    plan: "",
    shift: "full",
    fees: "",
    password: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      member: {
        name: formData.name,
        email: formData.email,
        number: formData.number,
        membershipType: formData.membershipType.toLowerCase(),
        plan: formData.plan.toLowerCase(),
        shift: formData.shift.toLowerCase(),
        fees: formData.fees,
        seat: formData.seatId,             // hidden seatId field sent to backend
        startDate: formData.startDate ? new Date(formData.startDate) : new Date(),
        endDate: formData.endDate ? new Date(formData.endDate) : new Date(),
      },
      pass: {
        password: formData.password,
      },
    };

    try {
      console.log(payload)
      const res = await fetch(`http://localhost:5000/admin/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Member booked successfully!");
        setTimeout(() => navigate("/admin/seats"), 1500);
      } else {
        setMessage(`❌ ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <DashboardHeader />
      <div className="container my-4 p-4 bg-white shadow-sm rounded">
        <h3 className="mb-4">🧾 Add New Member for Seat #{seatNo}</h3>

        {message && (
          <div className={`alert ${message.startsWith("✅") ? "alert-success" : "alert-danger"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Hidden Seat ID */}
          <input type="hidden" name="seatId" value={seatId} />

          {/* Seat No (read-only) */}
          <div className="mb-3">
            <label className="form-label">Seat No</label>
            <input
              type="text"
              name="seatNo"
              className="form-control"
              value={seatNo}
              readOnly
            />
          </div>

          {/* Full Name & Email */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          {/* Number & Membership Type */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Number</label>
              <input type="text" name="number" className="form-control" value={formData.number} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Membership Type</label>
              <select name="membershipType" className="form-select" value={formData.membershipType} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Reserved">Reserved</option>
                <option value="Non_reserved">Non_reserved</option>
              </select>
            </div>
          </div>

          {/* Plan & Shift */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Plan</label>
              <select name="plan" className="form-select" value={formData.plan} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Full_time">Full_time</option>
                <option value="Part_time">Part_time</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Shift</label>
              <select name="shift" className="form-select" value={formData.shift} onChange={handleChange}>
                <option value="Full">Full</option>
                <option value="Morning">Morning</option>
                <option value="Night">Night</option>
              </select>
            </div>
          </div>

          {/* Fees & Password */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Fees</label>
              <input type="number" name="fees" className="form-control" value={formData.fees} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
            </div>
          </div>

          {/* Start Date & End Date */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Start Date</label>
              <input type="date" name="startDate" className="form-control" value={formData.startDate} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">End Date</label>
              <input type="date" name="endDate" className="form-control" value={formData.endDate} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Booking..." : "Book Seat"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewMember;
