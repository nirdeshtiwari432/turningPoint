import React, { useState, useEffect } from "react";
import "./Alert.css";

const Alerts = () => {
  // Sample seat/member data
  const seatsData = [
    { seatNumber: "A01", name: "John Doe", endDate: "2024-09-30" },
    { seatNumber: "A02", name: "Jane Smith", endDate: "2024-10-15" },
    { seatNumber: "B01", name: "Sam Wilson", endDate: "2024-08-30" },
  ];

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const today = new Date();
    const expiredMembers = seatsData.filter((seat) => {
      const end = new Date(seat.endDate);
      return end < today;
    });
    setAlerts(expiredMembers);
  }, []);

  return (
    <div className="alerts-page">
      <h2>Member Alerts</h2>
      <div className="alerts-container">
        {alerts.length > 0 ? (
          alerts.map((member, index) => (
            <div key={index} className="alert-card">
              <p>
                🚨 <strong>{member.name}</strong> (Seat: {member.seatNumber}) membership has ended on <strong>{member.endDate}</strong>
              </p>
            </div>
          ))
        ) : (
          <p className="no-alerts">No expired memberships today.</p>
        )}
      </div>
    </div>
  );
};

export default Alerts;
