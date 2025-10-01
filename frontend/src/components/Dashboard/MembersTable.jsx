import React from "react";

const MembersTable = ({ members, setUser }) => (
  <div className="container my-4">
    <div className="card w-100">
      <div className="card-header bg-success text-white">Member Details</div>
      <div className="card-body">
        <div className="table-responsive" >
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Seat</th>
                <th>Fees</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th className="text-center">Full Details</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  <td>{member.number}</td>
                  <td>{member.seat?.seatNo || "-"}</td>
                  <td>₹{member.fees}</td>
                  <td>{member.startDate ? new Date(member.startDate).toLocaleDateString("en-GB") : "-"}</td>
                  <td>{member.endDate ? new Date(member.endDate).toLocaleDateString("en-GB") : "-"}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setUser(member)}
                    >
                      Show
                    </button>
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

export default MembersTable;
