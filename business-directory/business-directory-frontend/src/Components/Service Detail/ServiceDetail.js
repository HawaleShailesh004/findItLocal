import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ServiceDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faClock,
  faCalendarAlt,
  faTag,
  faClipboardList,
  faCheckCircle,
  faTimesCircle,
  faRupee,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../Header";
import Footer from "../Footer";
import Loading from "../Loading/Loading";

const ServiceDetail = () => {
  const location = useLocation();
  const { id, contact_no } = location.state;

  const [service, setService] = useState(null);
  const navigate = useNavigate();

  const allDaysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const formatPhoneNumber = (phone) => {
    if (!phone) return ""; // Return empty string if no phone number is provided

    const countryCode = phone.slice(0, 3);
    const part1 = phone.slice(3, 6);
    const part2 = phone.slice(6, 9);
    const part3 = phone.slice(9);

    return `${part1} ${part2} ${part3}`;
  };

  // Fetch service by ID from backend
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/service/service/${id}`
        );
        const serviceData = response.data;
        setService(serviceData);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [id]);

  if (!service) {
    return <Loading/>;
  }

  const openWhatsapp = (phone) => {
    const phoneNumber = formatPhoneNumber(phone);
    const whatsappURL = `https://wa.me/${phoneNumber}`;
    window.open(whatsappURL, "_blank");
  };

  // Navigate to booking page
  const handleBookNow = () => {
    const slug = service.service_name.replace(/\s+/g, "-").toLowerCase(); // Slugify service name
    navigate(`/book/${slug}`, {
      state: { service_id: id, slug: slug },
    });
  };

  return (
    <>
      <Header />
      <div className={styles.serviceDetailPage}>
        <div className={styles.serviceContainer}>
          <h1 className={styles.serviceName}>{service.service_name}</h1>
          {/* <img
            src={service.image || "placeholder-image-url"}
            alt={service.service_name}
            className={styles.serviceImage}
          /> */}
          <div className={styles.serviceDetails}>
            <p className={styles.description}>{service.description}</p>

            <div className={styles.serviceInfo}>
              <div className={styles.infoCard}>
                <FontAwesomeIcon icon={faRupee} className={styles.icon} />
                <div>
                  <strong>Price:</strong> ₹{service.price}
                </div>
              </div>

              <div className={styles.infoCard}>
                <FontAwesomeIcon icon={faClock} className={styles.icon} />
                <div>
                  <strong>Duration:</strong> {service.duration} minutes
                </div>
              </div>

              <div className={styles.infoCard}>
                <FontAwesomeIcon icon={faTag} className={styles.icon} />
                <div>
                  <strong>Discount:</strong> {service.discount_percentage}% off
                </div>
              </div>

              <div className={styles.infoCard}>
                <FontAwesomeIcon
                  icon={faClipboardList}
                  className={styles.icon}
                />
                <div>
                  <strong>Category:</strong> {service.service_category}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.availableDays}>
            <h3>Available Days & Time:</h3>
            <table className={styles.availabilityTable}>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {allDaysOfWeek.map((day) => {
                  const availableTime = service.available_days[day];
                  const isAvailable = availableTime ? true : false;

                  return (
                    <tr key={day}>
                      <td>{day}</td>
                      <td>
                        {isAvailable ? (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className={styles.availableIcon}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faTimesCircle}
                            className={styles.unavailableIcon}
                          />
                        )}
                      </td>
                      <td>{isAvailable ? availableTime : "Not Available"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.bookButton}
              onClick={() => handleBookNow()}
            >
              Book Now
            </button>

            <button
              className={styles.contactButton}
              onClick={() => openWhatsapp(contact_no)}
            >
              Contact Owner
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetail;
