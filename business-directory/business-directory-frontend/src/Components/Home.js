import React, { useState, useEffect } from "react";
import FeaturedBusinesses from "./Featured Business";
import HeroSection from "./HeroSection";

import styles from "../Styles/HomePage.module.css";
import ServiceListHorizontal from "./ServiceListHorizontal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeadset } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header"; // Import your Header component
import Footer from "./Footer";
import axios from "axios";

const services = [
  { name: "Plumbing", image: "path/to/plumbing.jpg" },
  { name: "Electrical", image: "path/to/electrical.jpg" },
  { name: "Cleaning", image: "path/to/cleaning.jpg" },
  { name: "Plumbing", image: "path/to/plumbing.jpg" },
  { name: "Electrical", image: "path/to/electrical.jpg" },
  { name: "Cleaning", image: "path/to/cleaning.jpg" },
  { name: "Plumbing", image: "path/to/plumbing.jpg" },
  { name: "Electrical", image: "path/to/electrical.jpg" },
  { name: "Cleaning", image: "path/to/cleaning.jpg" },
  { name: "Plumbing", image: "path/to/plumbing.jpg" },
  { name: "Electrical", image: "path/to/electrical.jpg" },
  { name: "Cleaning", image: "path/to/cleaning.jpg" },
  // Add more services as needed
];
const Home = () => {
  const [affordableServices, setAffordableServices] = useState([]);
  const [mostBookedServices, setMostBookedServices] = useState([]);
  const [popularBusinessServices, setPopularBusinessServices] = useState([]);

  const [standardServices, setStandardServices] = useState([]);
  const [premiumServices, setPremiumServices] = useState([]);
  const [exclusiveServices, setExclusiveServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/service/allserviceslist"
        );
        const services = response.data;

        // Filter services based on categories
        setStandardServices(
          services.filter((service) => service.service_category === "standard")
        );
        setPremiumServices(
          services.filter((service) => service.service_category === "premium")
        );
        setExclusiveServices(
          services.filter((service) => service.service_category === "exclusive")
        );
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchAffordableServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/service/allserviceslist"
        );
        const services = response.data;

        // Filter affordable services (sort by price ascending)
        const affordable = services
          .sort((a, b) => a.price - b.price)
          .slice(0, 5); // Adjust number as per your requirement
        setAffordableServices(affordable);
      } catch (error) {
        console.error("Error fetching affordable services:", error);
      }
    };
    fetchAffordableServices();
  }, []);

  // Fetch Most Booked Services
  useEffect(() => {
    const fetchMostBookedServices = async () => {
      try {
        // Assuming you have a route or field to track bookings, adjust accordingly
        const response = await axios.get(
          "http://localhost:8080/service/allserviceslist"
        );
        const services = response.data;

        // You need a way to track bookings, e.g., `bookings` field or separate data
        // Sort by most booked, for now assuming services have a `bookings` field
        const mostBooked = services
          .sort((a, b) => b.bookings - a.bookings)
          .slice(0, 5);
        setMostBookedServices(mostBooked);
      } catch (error) {
        console.error("Error fetching most booked services:", error);
      }
    };
    fetchMostBookedServices();
  }, []);

  // Fetch Services from Most Popular Businesses
  useEffect(() => {
    const fetchPopularBusinessServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/service/allserviceslist"
        );
        const services = response.data;

        // Assuming services have a populated business object with `average_rating`
        const popularBusinessServices = services
          .filter(
            (service) =>
              service.business_id && service.business_id.average_rating >= 4.5
          ) // Filter businesses with high ratings
          .slice(0, 5);
        setPopularBusinessServices(popularBusinessServices);
      } catch (error) {
        console.error(
          "Error fetching services from popular businesses:",
          error
        );
      }
    };
    fetchPopularBusinessServices();
  }, []);

  return (
    <div>
      <Header />

      <HeroSection />

      <div className={styles["service-rating-container"]}>
        <div className={styles["rating"]}>
          <h2>4.8</h2>
          <p>Service Rating</p>
        </div>
        <div className={styles["customers"]}>
          <h2>12M+</h2>
          <p>Customers Globally</p>
        </div>
        <div className={styles["info-item"]}>
          <div className={styles["icon"]}>
            <FontAwesomeIcon icon={faStar} />
          </div>
          <p>Top Quality Services</p>
        </div>
        <div className={styles["info-item"]}>
          <div className={styles["icon"]}>
            <FontAwesomeIcon icon={faHeadset} />
          </div>
          <p>24/7 Customer Support</p>
        </div>
      </div>

      <ServiceListHorizontal
        title="New & Affordable"
        services={affordableServices}
      />
      <ServiceListHorizontal
        title="Most Booked"
        services={mostBookedServices}
      />
   
      <ServiceListHorizontal
        title="Standard Services"
        services={standardServices}
      />
      <ServiceListHorizontal
        title="Premium Services"
        services={premiumServices}
      />
      <ServiceListHorizontal
        title="Exclusive Services"
        services={exclusiveServices}
      />

      <FeaturedBusinesses />
      <Footer />
    </div>
  );
};

export default Home;
