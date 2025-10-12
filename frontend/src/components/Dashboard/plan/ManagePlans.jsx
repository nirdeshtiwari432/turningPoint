import React, { useEffect, useState } from "react";
import "./managePlans.css";

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "seat",
    timing: "",
    duration: "",
    reserved: false,
  });
  const [editId, setEditId] = useState(null);

  // Fetch all plans
  const fetchPlans = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/plans");
      const data = await res.json();
      if (data.success) setPlans(data.plans);
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/admin/plans/${editId}`
      : "http://localhost:5000/admin/plans/addPlan";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        alert(editId ? "Plan updated successfully!" : "Plan added successfully!");
        setForm({
          title: "",
          price: "",
          category: "seat",
          timing: "",
          duration: "",
          reserved: false,
        });
        setEditId(null);
        fetchPlans();
      } else {
        alert("Failed to save plan.");
      }
    } catch (err) {
      console.error("Error saving plan:", err);
      alert("Error saving plan.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      const res = await fetch(`http://localhost:5000/admin/plans/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        alert("Plan deleted successfully!");
        fetchPlans();
      } else {
        alert("Failed to delete plan.");
      }
    } catch (err) {
      console.error("Error deleting plan:", err);
    }
  };

  // Handle edit
  const handleEdit = (plan) => {
    setForm({
      title: plan.title,
      price: plan.price,
      category: plan.category,
      timing: plan.timing || "",
      duration: plan.duration || "",
      reserved: plan.reserved || false,
    });
    setEditId(plan._id);
  };

  // Reset form on category change
  useEffect(() => {
    if (form.category === "seat") {
      setForm((f) => ({ ...f, duration: "" }));
    } else {
      setForm((f) => ({ ...f, timing: "", reserved: false }));
    }
  }, [form.category]);

  return (
    <div className="manage-plans-container">
      <h2>Manage Membership Plans</h2>

      {/* Form Section */}
      <form className="plan-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            placeholder="Plan Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>

        <div className="form-row">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="seat">Seat Plan</option>
            <option value="longterm">Long Term Plan</option>
          </select>

          {form.category === "seat" ? (
            <input
              type="text"
              placeholder="Timing (e.g., 10 AM - 4 PM)"
              value={form.timing}
              onChange={(e) => setForm({ ...form, timing: e.target.value })}
            />
          ) : (
            <input
              type="text"
              placeholder="Duration (e.g., 6 months)"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />
          )}
        </div>

        {form.category === "seat" && (
          <label className="reserved-checkbox">
            <input
              type="checkbox"
              checked={form.reserved}
              onChange={(e) => setForm({ ...form, reserved: e.target.checked })}
            />
            Reserved Seat
          </label>
        )}

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {editId ? "Update Plan" : "Add Plan"}
          </button>

          {editId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setForm({
                  title: "",
                  price: "",
                  category: "seat",
                  timing: "",
                  duration: "",
                  reserved: false,
                });
                setEditId(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table Section */}
      <table className="plan-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Timing/Duration</th>
            <th>Reserved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.title}</td>
              <td>₹{plan.price}</td>
              <td>{plan.category}</td>
              <td>{plan.category === "seat" ? plan.timing : plan.duration}</td>
              <td>{plan.reserved ? "Yes" : "No"}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(plan)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(plan._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {plans.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No plans found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePlans;
