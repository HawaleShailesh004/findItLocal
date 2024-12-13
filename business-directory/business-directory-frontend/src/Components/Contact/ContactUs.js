import React, { useState } from "react";
import axios from "axios";
import styles from "./ContactUs.module.css";
import Header from "../Header";
import Footer from "../Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faHomeLg, faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false); // Popup state

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Sending...");

    try {
      // Send form data to backend API
      await axios.post("http://localhost:8080/contact/contact-us", formData);
      setFormStatus("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setShowPopup(true); // Show popup on success

      // Hide popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setFormStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        <section className={styles.heroSection}>
          <img
            src={`${process.env.PUBLIC_URL}/Images/about.png`}
            alt="Contact Us"
            className={styles.heroImage}
          />
          <div className={styles.overlay}></div>
          <h1 className={styles.heroTitle}>
            Contact <span className={styles.brandName}>FindItLocal</span>
          </h1>
        </section>

        <div className={styles.infoContainer}>
          <div className={styles.infoItem}>
            <h2><FontAwesomeIcon icon={faHomeLg}/> Our Address</h2>
            <p>123 Main Street, Suite 500</p>
            <p>Cityville, ST 54321</p>
          </div>
          <div className={styles.infoItem}>
            <h2><FontAwesomeIcon icon={faPhone}/> Call Us</h2>
            <p>1800 6767 5656</p>
          </div>
          <div className={styles.infoItem}>
            <h2><FontAwesomeIcon icon={faMailBulk}/> Email Us</h2>
            <p>contact@finditlocal.com</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Send Us a Message</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.inputField}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.inputField}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={styles.inputField}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            className={styles.textArea}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
          {/* {formStatus && <p className={styles.formStatus}>{formStatus}</p>} */}
        </form>

        {/* Popup message */}
        {showPopup && (
          <div className={styles.popup}>
            <p className={styles.popupMsg}>Message Sent Successfully!</p>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
