import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import MembersTable from "./MembersTable";
import UserDetailsCard from "./UserDetailsCard";

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/admin/members", { credentials: "include" })
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-light">
      <DashboardHeader />
      <div className="container my-4">
        <h3>Member Details</h3>
      </div>
      <MembersTable members={members} setUser={setSelectedUser} />
      {selectedUser && <UserDetailsCard user={selectedUser} />}
    </div>
  );
};

export default MembersPage;
