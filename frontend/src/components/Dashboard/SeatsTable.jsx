import React from "react";
import "./SeatTable.css";

const SeatsTable = ({ seats, filter, setFilter }) => {
  const handleBook = (seatId, seatNo) => {
    // Add your booking logic here
    console.log(`Booking seat ${seatNo} with ID ${seatId}`);
    // navigate(`/admin/new/${seatId}/${seatNo}`);
  };

  return (
    <div className="seats-table-container">
      <div className="table-card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3 className="card-title">Seat Booking Status</h3>
              <p className="card-subtitle">
                Total {seats.length} seat{seats.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="filter-section">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">All Seats</option>
                <option value="booked">Booked</option>
                <option value="available">Available</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card-body">
          {seats.length === 0 ? (
            <div className="no-data-message">
              <div className="text-center py-5">
                <h4 className="text-muted">No Seats Found</h4>
                <p className="text-muted">There are no seats to display.</p>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="seats-table">
                <thead>
                  <tr>
                    <th width="100">SEAT NO</th>
                    <th width="120">STATUS</th>
                    <th>BOOKED BY</th>
                    <th>TIMING</th>
                    <th width="120">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {seats.map((seat) => (
                    <tr key={seat._id}>
                      <td className="text-center fw-bold">{seat.seatNo}</td>
                      <td>
                        <span className={`status-badge ${seat.isBooked ? 'booked' : 'available'}`}>
                          {seat.isBooked ? 'Booked' : 'Available'}
                        </span>
                      </td>
                      <td>{seat.bookedBy?.name || "-"}</td>
                      <td>{seat.timing?.replace(/_/g, " ") || "-"}</td>
                      <td>
                        <button
                          className={`action-btn ${seat.isBooked ? 'booked' : 'available'}`}
                          onClick={() => handleBook(seat._id, seat.seatNo)}
                          disabled={seat.isBooked}
                        >
                          {seat.isBooked ? 'Booked' : 'Book'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatsTable;