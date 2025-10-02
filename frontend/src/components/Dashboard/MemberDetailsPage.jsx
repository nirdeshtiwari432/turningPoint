import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import UserDetailsCard from "./UserDetailsCard";

const MemberDetailsPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/admin/users/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!user) return <p className="text-center my-4">Loading...</p>;

  return (
    <div className="bg-light">
      <DashboardHeader />
      <UserDetailsCard user={user} />
    </div>
  );
};

export default MemberDetailsPage;
