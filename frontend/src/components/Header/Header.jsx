import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h2>Turning Point</h2>
        </div>
        <nav className="nav" >
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/membership">Membership</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <Link to="/login">
          <button className="join-btn">Join Now</button>
        </Link>
      </div>
      
    </header>
  );
};

export default Header;
