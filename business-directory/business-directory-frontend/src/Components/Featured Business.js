import React, { useEffect, useState } from 'react';
import BusinessCard from './Business Card';
import axios from 'axios';
import Loading from './Loading';
import styles from "../Styles/HomePage.module.css"

const FeaturedBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        // Fetch all businesses
        const response = await axios.get("http://localhost:8080/business/allbusinesses");
        const businesses = response.data;

        if (businesses && businesses.length > 0) {
          // Sort businesses by their average_rating in descending order
          const sortedBusinesses = businesses.sort((a, b) => b.average_rating - a.average_rating);

          // Select the top 6 businesses
          const topSixBusinesses = sortedBusinesses.slice(0, 6);

          // Update state with the top 6 businesses
          setBusinesses(topSixBusinesses);
          setLoading(false)
        }
      } catch (err) {
        console.log("Error fetching businesses:", err.message);
      }
    };

    fetchBusiness();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className={styles['featured-businesses']}>
  <h2>Featured Businesses</h2>
  <div className={styles['business-cards']}>
    {businesses.map((business) => (
      <BusinessCard key={business._id} business={business} />
    ))}
  </div>
</div>
  );
};

export default FeaturedBusinesses;
