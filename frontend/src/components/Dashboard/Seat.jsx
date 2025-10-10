import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 for navigation
import "./Seat.css";
import DashboardHeader from "./DashboardHeader";

const Seat = () => {
  const [seats, setSeats] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch seats from API
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/admin/seats?filter=${filter}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setSeats(data.seats || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching seats:", err);
        setLoading(false);
      });
  }, [filter]);

  // 👇 Handle Book button click
  const handleBook = (seatId, seatNo) => {
    navigate(`/admin/new/${seatId}/${seatNo}`);
  };

  return (
    <div className="container my-4">
      <DashboardHeader />

      <div className="card w-100">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <span>Seat Details</span>
          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="booked">Booked</option>
            <option value="notBooked">Not Booked</option>
            <option value="registered">Registered</option>
            <option value="notRegistered">Not Registered</option>
          </select>
        </div>

        <div className="card-body">
          {loading ? (
            <p>Loading seat data...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Seat No</th>
                    <th>Is Booked</th>
                    <th>Booked By</th>
                    <th>Timing</th>
                    <th className="text-center">Book</th>
                  </tr>
                </thead>
                <tbody>
                  {seats.length > 0 ? (
                    seats.map((seat) => (
                      <tr key={seat._id}>
                        <td>{seat.seatNo}</td>
                        <td>{seat.isBooked ? "Yes" : "No"}</td>
                        <td>{seat.bookedBy?.name || "-"}</td>
                        <td>{seat.timing?.replace("_", " ") || "-"}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleBook(seat._id, seat.seatNo)}
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Seat;
