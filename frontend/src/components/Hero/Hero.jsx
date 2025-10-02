import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import "./hero.css";

const Hero = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showGallery, setShowGallery] = useState(false);

  // Sample photos - replace with your actual images
  const photos = [
    "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1497636577773-f1231844b336?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1569163139394-de44cb54d0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  ];

  // Show gallery on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowGallery(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to library section if coming from another page
  useEffect(() => {
    if (location.state?.scrollTo === "library") {
      const section = document.getElementById("library-section");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);

  return (
    <div className="hero-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Study in Focus — at Our Library</h1>
            <p>
              Modern study cubicles, peaceful atmosphere, and membership plans 
              for students and professionals.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn primary"
                onClick={() => {
                  const section = document.getElementById("library-section");
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Library
              </button>
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

      {/* Photo Gallery Section */}
      <section id="library-section" className={`photo-gallery ${showGallery ? 'visible' : ''}`}>
        <div className="gallery-container">
          <h2>Our Library Spaces</h2>
          <p>Explore our modern facilities designed for optimal learning</p>
          <div className="photos-grid">
            {photos.map((photo, index) => (
              <div key={index} className="photo-card">
                <img src={photo} alt={`Library space ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
