import React from "react";
import "./AboutPage.css";
import { FaWifi, FaSnowflake, FaPlug, FaBook, FaUtensils } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";

const AboutPage = () => {
  const amenities = [
    {
      icon: <FaWifi size={30} color="#2b6cb0" />,
      title: "High-Speed WiFi",
      desc: "Stay connected with our fast and reliable internet.",
    },
    {
      icon: <FaSnowflake size={30} color="#2b6cb0" />,
      title: "Air Conditioning",
      desc: "Comfortable study environment with optimal temperature.",
    },
    {
      icon: <FaPlug size={30} color="#2b6cb0" />,
      title: "Charging Points",
      desc: "Keep your devices charged and ready.",
    },
    {
      icon: <MdMeetingRoom size={30} color="#2b6cb0" />,
      title: "Study Cabins",
      desc: "Private and quiet spaces for focused study.",
    },
    {
      icon: <FaBook size={30} color="#2b6cb0" />,
      title: "Extensive Book Collection",
      desc: "Access a wide range of academic resources.",
    },
    {
      icon: <FaUtensils size={30} color="#2b6cb0" />,
      title: "On-Site Canteen",
      desc: "Enjoy convenient meals and snacks at our canteen.",
    },
  ];

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>Welcome to StudySpace</h1>
        <p>
          Find the perfect study spot with all the amenities you need. 
          Explore our facilities and book your space today.
        </p>
      </div>

      <div className="amenities-section">
        <h2>Our Amenities</h2>
        <div className="amenities-grid">
          {amenities.map((item, index) => (
            <div key={index} className="amenity-card">
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
