import React from "react";
import styles from "../Styles/HomePage.module.css";
import { useNavigate } from "react-router-dom";

const BusinessCard = ({ business }) => {
  const navigate = useNavigate();
  return (
    <div className={styles["business-card"]}>
      <img
        src={`${process.env.PUBLIC_URL}/Images/business.png`}
        alt={`${business.business_name} logo`}
        className={styles["business-card-logo"]}
      />
      <h2>{business.business_name}</h2>
      <p>{business.description}</p>

      {/* Uncomment these lines if needed */}
      {/* <p><strong>Category:</strong> {business.category}</p>
  <p><strong>Location:</strong> {business.location}</p>
  <p><strong>Contact:</strong> {business.contact_number}</p>
  <p><strong>Email:</strong> {business.email}</p> */}

      <p>
        <strong>Rating:</strong> {business.average_rating} (
        {business.total_reviews} reviews)
      </p>
      <div className={styles["button-container"]}>

      <button className={styles["business-detail-button"]}
        onClick={() => {
          const slug = business.business_name
            .toLowerCase()
            .replace(/\s+/g, "-");
          navigate(`/business/${slug}`, { state: { id: business._id } });
        }}
      >
        View Details
      </button>
      </div>
    </div>
  );
};

export default BusinessCard;
