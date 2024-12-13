import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./OwnerDashboard.module.css";

import { useUser } from "../../Context/UserContext";

const Dashboard = () => {
  const [business, setBusiness] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);

  const { userId } = useUser();

  // const businessId = "66efc31d8be8f319c6178ac2"; 
  // Replace with actual ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const businessResponse = await axios.get(
          `http://localhost:8080/business/${userId}`
        );
        setBusiness(businessResponse.data);

        const bookingsResponse = await axios.get(
          `http://localhost:8080/booking/business/${userId}`
        );
        setBookings(bookingsResponse.data);

        const servicesResponse = await axios.get(
          `http://localhost:8080/service/business/${userId}`
        );
        setServices(servicesResponse.data);

        const reviewsResponse = await axios.get(
          `http://localhost:8080/review/business/${userId}`
        );
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleAddService = async (newService) => {
    try {
      await axios.post("http://localhost:8080/service", newService);
      // Optionally refresh the services
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div className={styles['dashboard']}>
    <h1>Business Owner Dashboard</h1>

    {business && (
      <div className={styles['business-info']}>
        <h2>{business.business_name}</h2>
        <p>{business.description}</p>
      </div>
    )}

    <h3>Bookings</h3>
    <ul className={styles['bookings-list']}> {/* New class name */}
      {bookings.map((booking) => (
        <li key={booking._id} className={styles['booking-item']}> {/* New class name */}
          {booking.service_name} - {booking.date} - {booking.status}
        </li>
      ))}
    </ul>

    <h3>Services</h3>
    <ul className={styles['services-list']}> {/* New class name */}
      {services.map((service) => (
        <li key={service._id} className={styles['service-item']}> {/* New class name */}
          {service.service_name} - ${service.price}
        </li>
      ))}
    </ul>

    <h3>Reviews</h3>
    <ul className={styles['reviews-list']}> {/* New class name */}
      {reviews.map((review) => (
        <li key={review._id} className={styles['review-item']}> {/* New class name */}
          {review.review_text} - Rating: {review.rating}
        </li>
      ))}
    </ul>

    {/* Component to add a new service */}
    <AddServiceForm onAddService={handleAddService} />
  </div>
  );
};

const AddServiceForm = ({ onAddService }) => {
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddService({ service_name: serviceName, price });
    setServiceName("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Service Name"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit" className="add-service-btn">Add Service</button>
    </form>
  );
};

export default Dashboard;
