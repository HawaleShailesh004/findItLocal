import React, { useRef } from "react";
import styles from "../Styles/HomePage.module.css";
import { useNavigate } from "react-router-dom";

const ServiceListHorizontal = ({ title, services, contact_no }) => {
  const scrollRef = useRef(null);

  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollRef.current) {
      let scrollAmount = 265; // Scroll by the width of the container
      scrollAmount += 5;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles["service-list"]}>
      <h2 className={styles["service-list-title"]}>{title}</h2>
      <div className={styles["services-wrapper"]} ref={scrollRef}>
        {services.map((service, index) => (
          <div key={index}>
            <div
              className={styles["service-list-item-card"]}
              onClick={() => {
                const slug = service.service_name
                  .toLowerCase()
                  .replace(/\s+/g, "-");
                navigate(`/service/${slug}`, {
                  state: {
                    id: service._id,
                    contact_no: contact_no ? contact_no : "",
                  },
                });
              }}
            >
              <div className={styles["text-in-item"]}>
                <p className={styles["service-name"]}>{service.service_name}</p>
                <p className={styles["service-price"]}>{service.price + "₹"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles["navigation-buttons"]}>
        <button className={styles["nav-button"]} onClick={() => scroll("left")}>
          ←
        </button>
        <button
          className={styles["nav-button"]}
          onClick={() => scroll("right")}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ServiceListHorizontal;
