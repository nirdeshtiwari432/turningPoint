import React from "react";
import "./membership.css";

const MembershipPage = () => {
  return (
    <section className="membership">
      <div className="container">
        <h2 className="membership-title">Choose Your Membership</h2>
        <p className="membership-subtitle">
          Unlock your full potential with our flexible membership plans.
        </p>

        {/* Seat Plans */}
        <h3 className="category-title">Seat Plans</h3>
        <div className="membership-cards">
          <div className="card">
            <h3>Morning Seat</h3>
            <p className="price">₹400 <span>/month</span></p>
            <ul>
              <li>Unreserved seat</li>
              <li>Timing: 10 AM – 4 PM</li>
            </ul>
            <button className="btn">Pay Now</button>
          </div>

          <div className="card">
            <h3>Evening Seat</h3>
            <p className="price">₹400 <span>/month</span></p>
            <ul>
              <li>Unreserved seat</li>
              <li>Timing: 4 PM – 8 PM</li>
            </ul>
            <button className="btn">Pay Now</button>
          </div>

          <div className="card">
            <h3>Full Time</h3>
            <p className="price">₹500 <span>/month</span></p>
            <ul>
              <li>Unreserved seat</li>
              <li>Timing: Full Time</li>
            </ul>
            <button className="btn">Pay Now</button>
          </div>

          <div className="card popular">
            <div className="badge">RESERVED</div>
            <h3>Full Time</h3>
            <p className="price">₹600 <span>/month</span></p>
            <ul>
              <li>Reserved seat</li>
              <li>Timing: Full Time</li>
            </ul>
            <button className="btn">Pay Now</button>
          </div>
        </div>

        {/* Long-term Plans */}
        <h3 className="category-title">Long-Term Plans</h3>
        <div className="membership-cards">
          <div className="card">
            <h3>3 Month Plan</h3>
            <p className="price">₹1500</p>
            <ul>
              <li>Flexible seat access</li>
              <li>Valid for 3 months</li>
            </ul>
            <button className="btn">Pay Now</button>
          </div>

          <div className="card">
            <h3>6 Month Plan</h3>
            <p className="price">₹2500</p>
            <ul>
              <li>Flexible seat access</li>
              <li>Valid for 6 months</li>
            </ul>
            <button className="btn">Pay Now</button>
          </div>

          <div className="card">
            <h3>1 Year Plan</h3>
            <p className="price">₹5000 <span>/year</span></p>
            <ul>
              <li>Flexible seat access</li>
              <li>Valid for 12 months</li>
            </ul>
            <button className="btn">Pay Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipPage;
