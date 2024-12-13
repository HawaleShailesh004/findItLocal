import React from "react";
import styles from "./BusinessCard.module.css"; // Assuming CSS Module for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLocation,
  faLocationDot,
  faLocationPin,
  faLocationPinLock,
  faPhone,
  faStar,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";



const BusinessCard = ({ business }) => {

  const navigate =  useNavigate();
  return (
    <div className={styles.card}>
      <img
        className={styles.businessImage}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2X3zNW0EK1HqAQIt4cf3VR9-GG9WFTIPelg&s"
        alt={business.business_name}
      />
      <div className={styles.cardContent}>
        <h2 className={styles.businessName}>
          <FontAwesomeIcon icon={faThumbsUp}> </FontAwesomeIcon>
          {"    " + business.business_name}
        </h2>
        <p className={styles.description}>{business.description}</p>
        <p className={styles.location}>
          <FontAwesomeIcon icon={faLocationDot}> </FontAwesomeIcon>{" "}
          {business.location}
        </p>
        <p className={styles.rating}>
        <span className={styles.ratingHighlight}> {business.average_rating} </span>({business.total_reviews} reviews)
      </p>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => {
              const slug = business.business_name.toLowerCase().replace(/\s+/g, '-');
              navigate(`/business/${slug}`, { state: { id: business._id } });           }}
          >
            View Details
          </button>
          <button
            onClick={() => {
              /* Open booking modal */
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
