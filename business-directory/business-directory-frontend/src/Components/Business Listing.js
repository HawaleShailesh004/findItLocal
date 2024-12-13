import React, { useState, useEffect } from "react";
import axios from "axios";
const BusinessListing = () => {
  const [businessList, setBusinessList] = useState([]);

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
          setTopBusinesses(topSixBusinesses);
        }
      } catch (err) {
        console.log("Error fetching businesses:", err.message);
      }
    };

    fetchBusiness();
  }, []);

  return <div></div>;
};

export default BusinessListing;
