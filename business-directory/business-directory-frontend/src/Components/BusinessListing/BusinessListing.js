import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import styles from "./BusinessListing.module.css";
import Footer from "../Footer";
import Header from "../Header";

const BusinessListing = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    rating: "",
  });

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/business/allbusinesses"
      );
      setBusinesses(response.data);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredBusinesses = businesses.filter((business) => {
    const matchesCategory = filters.category
      ? business.category === filters.category
      : true;
    const matchesLocation = filters.location
      ? business.location.includes(filters.location)
      : true;
    const matchesRating = filters.rating
      ? business.rating >= Number(filters.rating)
      : true;
    return matchesCategory && matchesLocation && matchesRating;
  });

  return (
    <>
      <Header />
      <div className={styles['business-listings']}>
      <h2>Business Listings</h2>
      <div className={styles['filters']}>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
          className={styles['location-input']} // New class name
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className={styles['category-select']} // New class name
        >
          <option value="">All Categories</option>
          <option value="plumbing">Plumbing</option>
          <option value="electrician">Electrician</option>
          {/* ... other options omitted for brevity ... */}
        </select>
        <input
          type="number"
          name="rating"
          placeholder="Min Rating"
          value={filters.rating}
          onChange={handleFilterChange}
          className={styles['rating-input']} // New class name
        />
      </div>
      <div className={styles['business-list']}>
        {filteredBusinesses.length ? (
          filteredBusinesses.map((business) => (
            <Link to={`/business/${business._id}`} key={business._id} className={styles['listing-business-card']}>
              <h3>{business.business_name}</h3>
              <p>Category: {business.category}</p>
              <p>Location: {business.location}</p>
              <p>Rating: {business.rating}</p>
            </Link>
          ))
        ) : (
          <p>No businesses found.</p>
        )}
      </div>
    </div>
      <Footer />
    </>
  );
};

export default BusinessListing;
