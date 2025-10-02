import React from "react";
import { useNavigate } from "react-router-dom";

const MembersTable = ({ members }) => {
  const navigate = useNavigate();

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.number}</td>
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
    </div>
  );
};

export default MembersTable;
