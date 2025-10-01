import React from "react";
import "./membership.css"; // create CSS file for styling

const MembershipPage = () => {
  return (
    <section className="membership">
      <div className="container">
        <h2 className="membership-title">Choose Your Membership</h2>
        <p className="membership-subtitle">
          Unlock your full potential with our flexible membership plans.
        </p>

        <div className="membership-cards">
          {/* Daily Plan */}
          <div className="card">
            <h3>Daily</h3>
            <p className="price">$5 <span>/day</span></p>
            <ul>
              <li>✔ Access to WiFi</li>
              <li>✔ Air Conditioning</li>
              <li>✔ Silent Study Cabins</li>
            </ul>
            <button className="btn">Apply Now</button>
          </div>

          {/* Monthly Plan */}
          <div className="card popular">
            <div className="badge">POPULAR</div>
            <h3>Monthly</h3>
            <p className="price">$30 <span>/month</span></p>
            <ul>
              <li>✔ All daily benefits</li>
              <li>✔ Priority Booking</li>
            </ul>
            <button className="btn">Apply Now</button>
          </div>

          {/* Yearly Plan */}
          <div className="card">
            <h3>Yearly</h3>
            <p className="price">$300 <span>/year</span></p>
            <ul>
              <li>✔ All monthly benefits</li>
              <li>✔ Exclusive Events Access</li>
            </ul>
            <button className="btn">Apply Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipPage;
