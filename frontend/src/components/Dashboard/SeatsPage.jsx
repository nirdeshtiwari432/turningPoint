import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import SeatsTable from "./SeatsTable";

const SeatsPage = () => {
  const [seats, setSeats] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/admin/seats?filter=${filter}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setSeats(data.seats))
      .catch(err => console.error(err));
  }, [filter]);

  return (
    <div className="bg-light">
      <DashboardHeader/>
      <div className="container my-4">
        <h3>Seat Details</h3>
      </div>
      <SeatsTable seats={seats} filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default SeatsPage;
