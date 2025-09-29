import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Study in Focus — at Our Library</h1>
          <p>
            Modern study cubicles, peaceful atmosphere, and membership plans 
            for students and professionals.
          </p>
          <div className="hero-buttons">
            {/* ✅ Redirects to About page */}
            <button 
              className="btn primary"
              onClick={() => navigate("/about")}
            >
              Explore Library
            </button>

            {/* ✅ Redirects to Login page */}
            <button
              className="btn secondary"
              onClick={() => navigate("/login")}
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
