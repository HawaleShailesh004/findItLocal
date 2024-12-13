import React, { useEffect, useState } from "react";
import styles from "./BusinessListingsPage.module.css"; // CSS Module for styling
import axios from "axios";
import BusinessCard from "./BusinessCard"; // Assuming you have a BusinessCard component
import Footer from "../Footer";
import Header from "../Header";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

const BusinessListingsPage = () => {
  const { category } = useParams(); // use destructuring to extract category
  const [businesses, setBusinesses] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("Most Relevant");
  const [topRated, setTopRated] = useState("Show All");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const response = category
          ? await axios.get(`http://localhost:8080/business/category/${category.toLowerCase()}`)
          : await axios.get("http://localhost:8080/business/allbusinesses");

        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setBusinesses(response.data);
        } else {
          console.error("Unexpected response data:", response.data);
          setBusinesses([]);
        }
      } catch (error) {
        console.error("Error fetching businesses:", error);
        setBusinesses([]); // Set to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [category]);

  const sortBusinesses = (businesses) => {
    let sortedBusinesses = [...businesses];

    // Sort based on selected options
    if (sortBy === "Alphabetical (A-Z)") {
      sortedBusinesses.sort((a, b) => a.business_name.localeCompare(b.business_name));
    } else if (sortBy === "Alphabetical (Z-A)") {
      sortedBusinesses.sort((a, b) => b.business_name.localeCompare(a.business_name));
    } else if (sortBy === "Distance") {
      // Assume businesses have a distance property
      sortedBusinesses.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "Price (Low to High)") {
      sortedBusinesses.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price (High to Low)") {
      sortedBusinesses.sort((a, b) => b.price - a.price);
    }

    if (topRated === "4 Stars and Above") {
      sortedBusinesses = sortedBusinesses.filter(b => b.average_rating >= 4);
    } else if (topRated === "3 Stars and Above") {
      sortedBusinesses = sortedBusinesses.filter(b => b.average_rating >= 3);
    } else if (topRated === "2 Stars and Above") {
      sortedBusinesses = sortedBusinesses.filter(b => b.average_rating >= 2);
    }

    return sortedBusinesses;
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleTopRatedChange = (e) => {
    setTopRated(e.target.value);
  };

  const sortedBusinesses = sortBusinesses(businesses);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.sortOptions}>
          <div className={styles.sortBy}>
            <label>Sort By:</label>
            <select value={sortBy} onChange={handleSortChange} className={styles.select}>
              <option value="Most Relevant">Most Relevant</option>
              <option value="Alphabetical (A-Z)">Alphabetical (A-Z)</option>
              <option value="Alphabetical (Z-A)">Alphabetical (Z-A)</option>
              <option value="Distance">Distance</option>
              <option value="Price (Low to High)">Price (Low to High)</option>
              <option value="Price (High to Low)">Price (High to Low)</option>
            </select>
          </div>
          <div className={styles.topRated}>
            <label>Top Rated:</label>
            <select value={topRated} onChange={handleTopRatedChange} className={styles.select}>
              <option value="Show All">Show All</option>
              <option value="4 Stars and Above">4 Stars and Above</option>
              <option value="3 Stars and Above">3 Stars and Above</option>
              <option value="2 Stars and Above">2 Stars and Above</option>
            </select>
          </div>
        </div>

        {loading ? (
         <Loading/>
        ) : businesses.length === 0 ? (
          <p className={styles.noBusinessesText}>No businesses found in this category {category}</p>
        ) : (
          <div className={styles.businessList}>
            {sortedBusinesses.map((business) => (
              <BusinessCard key={business._id} business={business} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BusinessListingsPage;
