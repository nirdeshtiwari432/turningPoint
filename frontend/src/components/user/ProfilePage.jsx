import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/user/profile", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  const handlePaymentClick = () => {
    navigate("/membership");
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem("user"); // Clear localStorage
        navigate("/login"); // Redirect to login
      } else {
        alert(data.message || "Logout failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during logout");
    }
  };

  return (
    <div className="container my-5">
      <h2>My Profile</h2>
      <img
        src={user.profilePic || "/default-avatar.png"}
        alt="Profile"
        width="150"
        style={{ borderRadius: "50%" }}
      />
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email || "Not provided"}</p>
      <p><strong>Number:</strong> {user.number}</p>
      <p><strong>Membership Type:</strong> {user.membershipType}</p>
      <p><strong>Plan:</strong> {user.plan}</p>
      <p><strong>Shift:</strong> {user.shift}</p>
      <p><strong>Start Date:</strong> {user.startDate?.slice(0, 10) || "-"}</p>
      <p><strong>End Date:</strong> {user.endDate?.slice(0, 10) || "-"}</p>
      <p><strong>Seat:</strong> {user.seat || "-"}</p>
      <p><strong>Fees Paid:</strong> {user.feeStatus ? "Yes" : "No"}</p>

      {!user.feeStatus && (
        <button className="btn btn-primary mt-3" onClick={handlePaymentClick}>
          Pay Membership
        </button>
      )}

      {/* Logout Button */}
      <button
        className="btn btn-secondary mt-3 ms-3"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
