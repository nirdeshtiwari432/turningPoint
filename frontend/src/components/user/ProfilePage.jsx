import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
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

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10 MB!");
      e.target.value = null;
      return;
    }
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      // ✅ Match backend route
      const res = await fetch("http://localhost:5000/user/upload-photo", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile photo updated successfully!");
        setUser((prev) => ({ ...prev, profilePic: data.imageUrl }));
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while uploading");
    }
  };

  const handlePaymentClick = () => navigate("/membership");

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem("user");
        navigate("/login");
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
        height="150"
        style={{ borderRadius: "50%", objectFit: "cover" }}
      />

      <div className="mt-3">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button className="btn btn-success ms-2" onClick={handleUpload}>
          Upload Photo
        </button>
      </div>

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

      <button className="btn btn-secondary mt-3 ms-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
