import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CreateService.module.css"; // CSS Module for styling
import Header from "../Header";
import Footer from "../Footer";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate for navigation

const CreateService = () => {
  const location = useLocation();
  const navigate = useNavigate(); // For redirecting after success
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    business_id: location.state?.data.id || "", // Default to empty if not available
    service_name: "",
    description: "",
    price: "",
    duration: "",
    available_days: {},
    discount_percentage: "",
    service_category: "standard",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Log business_id to ensure it's set correctly
  useEffect(() => {
    console.log("Business ID:", location.state?.data.id);
    if (!location.state?.data.id) {
      setError("Business ID is missing. Please select a valid business.");
    }
  }, [location.state?.data.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/service/create`,
        formData
      );
      setIsSubmitted(true); // Mark the form as submitted
      setMessage("Service created successfully!");
      setError("");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      setError("Error creating service. Please try again.");
      setMessage("");
    }
  };

  return (
    <>
      <Header />
      {!isSubmitted ? (
        <>
          <h1 className={styles.businessHeading}>
            {location.state?.data.name}
          </h1>
          <div className={styles.container}>
            <h1 className={styles.heading}>Create a New Service</h1>
            {message && <p className={styles.success}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}

            <form onSubmit={handleFormSubmit} className={styles.form}>
              {/* Input fields for service creation */}
              <div className={styles.formGroup}>
                <label htmlFor="service_name" className={styles.label}>
                  Service Name:
                </label>
                <input
                  type="text"
                  id="service_name"
                  name="service_name"
                  value={formData.service_name}
                  onChange={handleInputChange}
                  className={styles.input}
                  minLength="3"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  minLength="10"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="price" className={styles.label}>
                  Price (₹):
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={styles.input}
                  min="0"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="duration" className={styles.label}>
                  Duration (minutes):
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className={styles.input}
                  min="1"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="discount_percentage" className={styles.label}>
                  Discount (%):
                </label>
                <input
                  type="number"
                  id="discount_percentage"
                  name="discount_percentage"
                  value={formData.discount_percentage}
                  onChange={handleInputChange}
                  className={styles.input}
                  min="0"
                  max="100"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="service_category" className={styles.label}>
                  Service Category:
                </label>
                <select
                  id="service_category"
                  name="service_category"
                  value={formData.service_category}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="exclusive">Exclusive</option>
                </select>
              </div>

              <button type="submit" className={styles.button}>
                Create Service
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className={styles.successMessage}>
          <h2>Service Created Successfully!</h2>
          <p>Your service has been created. Thank you!</p>
          <button
            className={styles.submitButton}
            onClick={() => navigate("/business-dashboard")} // Redirect to dashboard
          >
            Go to Business Dashboard
          </button>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CreateService;
