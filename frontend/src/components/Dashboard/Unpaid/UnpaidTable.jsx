import React from "react";
import { useNavigate } from "react-router-dom";

const UnpaidTable = ({ members }) => {
  const navigate = useNavigate();

  // ✅ Filter only users whose feeStatus is false
  const unpaidMembers = members.filter((member) => member.feeStatus === false);

  return (
    <div className="table-responsive mt-4">
      <h4 className="mb-3">📌 Unpaid Members</h4>

      {unpaidMembers.length === 0 ? (
        <p className="text-muted">✅ All members have paid their fees.</p>
      ) : (
        <table className="table table-bordered table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Membership</th>
              <th>Plan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unpaidMembers.map((member) => (
              <tr key={member._id}>
                <td>{member.name}</td>
                <td>{member.email || "—"}</td>
                <td>{member.number}</td>
                <td>{member.membershipType}</td>
                <td>{member.plan}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/members/${member._id}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UnpaidTable;
