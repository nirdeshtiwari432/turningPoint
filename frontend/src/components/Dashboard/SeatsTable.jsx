import React from "react";

const SeatsTable = ({ seats, filter, setFilter }) => (
  <div className="container my-4">
    <div className="card w-100">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <span>Seat Details</span>
        <select
          className="form-select w-auto"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="booked">Booked</option>
          <option value="notBooked">Not Booked</option>
          <option value="registered">Registered</option>
          <option value="notRegistered">Not Registered</option>
        </select>
      </div>
      <div className="card-body">
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
              {seats.map(seat => (
                <tr key={seat._id}>
                  <td>{seat.seatNo}</td>
                  <td>{seat.isBooked ? "Yes" : "No"}</td>
                  <td>{seat.bookedBy?.name || "-"}</td>
                  <td>{seat.timing?.replace("_", " ") || "-"}</td>
                  <td className="text-center">
                    <button className="btn btn-primary btn-sm">Book</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default SeatsTable;
