import React, { useEffect, useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // get user from localStorage
    if (user) {
      // add joining + expiry dates if missing
      if (!user.joinDate) {
        user.joinDate = new Date().toLocaleDateString();
        user.expiryDate = new Date(
          new Date().setMonth(new Date().getMonth() + 1)
        ).toLocaleDateString();
        localStorage.setItem("user", JSON.stringify(user));
      }
      setUserData(user);
    }
  }, []);

  if (!userData) {
    return (
      <div className="profile-page">
        <h2>You are not logged in.</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>My Profile</h2>
        <div className="profile-details">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Contact:</strong> {userData.contact}</p>
          <p><strong>Studying For:</strong> {userData.studyingFor}</p>
          <p><strong>Aadhar:</strong> {userData.aadhar || "Not provided"}</p>
          <p><strong>Address:</strong> {userData.address || "Not provided"}</p>
          <p><strong>Seat Number:</strong> {userData.seatNumber}</p>
          <p><strong>Seat Type:</strong> {userData.seatType}</p>
          <p><strong>Timing:</strong> {userData.timing}</p>
          <p><strong>ID:</strong> {userData.id}</p>
          <hr />
          <p><strong>Date of Joining:</strong> {userData.joinDate}</p>
          <p><strong>Package Expiry:</strong> {userData.expiryDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
