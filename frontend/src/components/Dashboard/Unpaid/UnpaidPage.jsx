import React, { useEffect, useState } from "react";
import DashboardHeader from "../DashboardHeader";
import UnpaidTable from "./UnpaidTable";

const UnpaidPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/members", { credentials: "include" })
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error(err));
  }, []);

  const unpaidCount = members.filter(member => !member.feeStatus).length;

  return (
    <DashboardHeader>
      <div className="unpaid-page-container">
        {/* Improved Header with better spacing */}
        <div className="page-header-section">
          <div className="header-content">
            <h1 className="page-title">Unpaid Members</h1>
            <p className="page-subtitle">
              Manage unpaid member accounts • {unpaidCount} member{unpaidCount !== 1 ? 's' : ''} pending payment
            </p>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="content-section">
          <UnpaidTable members={members} />
        </div>
      </div>
    </DashboardHeader>
  );
};

export default UnpaidPage;