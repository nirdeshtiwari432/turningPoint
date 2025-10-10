import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code"; // ✅ modern replacement
import "./payment.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state || !location.state.plan) {
    navigate("/membership");
    return null;
  }

  const { plan } = location.state;
  const upiId = "nirdeshtiwari432-1@okhdfcbank";
  const upiLink = `upi://pay?pa=${upiId}&pn=Library&am=${plan.price}&cu=INR&tn=${encodeURIComponent(plan.title)} Payment`;

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Payment for {plan.title}</h2>
      <p>Amount: ₹{plan.price}</p>

      <div style={{ margin: "20px auto", width: "220px" }}>
        <QRCode value={upiLink} size={200} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => (window.location.href = upiLink)}
          style={{ padding: "10px 20px", marginRight: "10px" }}
        >
          Pay via UPI
        </button>
        <button onClick={() => navigate("/membership")} style={{ padding: "10px 20px" }}>
          Back
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
