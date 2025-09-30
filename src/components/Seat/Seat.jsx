import React, { useState } from "react";
import "./Seat.css";

const Seat = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data - you can replace this with API or state
  const seatsData = [
    { seatNumber: "A01", name: "John Doe", contact: "9876543210", studyingFor: "Engineering", startDate: "2024-09-01", endDate: "2024-12-31" },
    { seatNumber: "A02", name: "Jane Smith", contact: "9123456780", studyingFor: "Medical", startDate: "2024-09-05", endDate: "2024-12-20" },
    { seatNumber: "B01", name: "Sam Wilson", contact: "9988776655", studyingFor: "Law", startDate: "2024-08-15", endDate: "2024-11-30" },
    // Add more rows here
  ];

  const filteredSeats = seatsData.filter(
    (seat) =>
      seat.seatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seat.contact.includes(searchTerm) ||
      seat.studyingFor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="seat-page">
      <h2>Seat Management</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by seat, name, contact or field..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="seat-table">
          <thead>
            <tr>
              <th>Seat Number</th>
              <th>Name</th>
              <th>Contact No</th>
              <th>Studying For</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSeats.length > 0 ? (
              filteredSeats.map((seat, index) => (
                <tr key={index}>
                  <td>{seat.seatNumber}</td>
                  <td>{seat.name}</td>
                  <td>{seat.contact}</td>
                  <td>{seat.studyingFor}</td>
                  <td>{seat.startDate}</td>
                  <td>{seat.endDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Seat;
