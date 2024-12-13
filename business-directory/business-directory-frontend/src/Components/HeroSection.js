import React from "react";
import styles from "../Styles/HomePage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Make sure to import axios

const services = [
  { icon: "🌐", title: "Web Development" },
  { icon: "🔧", title: "Plumbing" },
  { icon: "💡", title: "Electrician" },
  { icon: "🏠", title: "Home Cleaning" },
  { icon: "🚚", title: "Moving Services" },
  { icon: "👨‍🍳", title: "Catering" },
  { icon: "🧹", title: "Cleaning Services" },
  { icon: "📦", title: "Packing Services" },
  { icon: "🏢", title: "Office Maintenance" },
];

const HeroSection = () => {
  const navigate = useNavigate();

  // Handle button click and fetch businesses based on the service title
  const handleBtnClick = async (serviceTitle) => {
    try {
      // Fetch businesses based on the clicked service title
      const response = await axios.get(
        `http://localhost:8080/business/category/${serviceTitle}`
      );

      if (response.data && response.data.length > 0) {
        console.log("Businesses in category:", response.data);
      } else {
        console.log("No businesses found in this category.");
      }

      // Navigate to the business listings page with the service title
      navigate(`/business-listings/${serviceTitle}`);
    } catch (error) {
      console.error("Error fetching businesses:", error.message);
      
      // Navigate to the business listings even in case of an error
      navigate(`/business-listings/${serviceTitle}`);
    }
  };

  return (
    <div>
      <div className={styles["hero-section"]}>
        <div className={styles["hero-content"]}>
          <h1>Welcome to the Business Directory</h1>
          <p>
            Discover local businesses, services, and professionals in your area.
            Easily find and connect with service providers that meet your needs.
          </p>
          <div className={styles["services-section"]}>
            <h2>What Services Are You Looking For?</h2>
            <div className={styles["services-grid"]}>
              {services.map((service, index) => (
                <div
                  key={index}
                  className={styles["service-card"]}
                  onClick={() => handleBtnClick(service.title)}
                >
                  <div className={styles["service-icon"]}>{service.icon}</div>
                  <h3 className={styles["service-title-hero"]}>{service.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/images/hero.jpg`}
          alt="Hero"
          className={styles["hero-image"]}
        />
      </div>
    </div>
  );
};

export default HeroSection;
