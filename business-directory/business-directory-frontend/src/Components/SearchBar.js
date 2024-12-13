import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faWrench,
  faLeaf,
  faTruck,
  faHandshake,
  faQuestionCircle,
  faDollarSign,
  faArrowRight,
  faBriefcase,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../Styles/HomePage.module.css";
import { redirect, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]); // State for filtered categories
  const [placeholder, setPlaceholder] = useState(
    "Search for 'Services' or 'Businesses'"
  );
  const [isFading, setIsFading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const hints = [
    "Plumbing",
    "Electrician",
    "Carpentry",
    "AC Repair",
    "Gardener",
  ];

  const navigate = useNavigate();
  // Fetch services and businesses from API on component mount
  useEffect(() => {
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

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/category/allservicenames"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    };
    fetchBusinesses();
    fetchCategories();
  }, []);

  // Filter businesses based on the query
  useEffect(() => {
    if (query) {
      const lowercasedQuery = query.toLowerCase();

      // Filter businesses
      const filteredBusinesses = businesses.filter((business) =>
        business.business_name.toLowerCase().startsWith(lowercasedQuery)
      );

      setFilteredResults(filteredBusinesses.slice(0, 5));

      // Filter categories
      const filteredCategories = categories.filter((category) =>
        category.toLowerCase().startsWith(lowercasedQuery)
      );

      setFilteredCategories(filteredCategories.slice(0, 10));
    } else {
      setFilteredResults([]);
      setFilteredCategories([]);
    }
  }, [query, businesses, categories]);

  // Placeholder animation logic
  useEffect(() => {
    let index = 0;
    if (!isFocused) {
      const intervalId = setInterval(() => {
        setIsFading(true);
        setTimeout(() => {
          setPlaceholder(`Search for '${hints[index]}'`);
          setIsFading(false);
        }, 500);
        index = (index + 1) % hints.length;
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [isFocused]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", e.target.value);
  };

  const handleSearchBtnClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/business/category/${query.toLowerCase()}`
      );
  
      if (response.data && response.data.length > 0) {
        console.log("Businesses in category:", response.data);
      } else {
        console.log("No businesses found in this category.");
      }
      
      // Navigate to the business listings regardless of the result
      navigate(`/business-listings/${query}`);
    } catch (error) {
      console.error("Error fetching businesses:", error.message);
      // Navigate to the business listings even in case of an error
      navigate(`/business-listings/${query}`);
    }
  };
  
  

  const fetchBusinessByID = async (businessId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/business/business/${businessId}`
      );
      const business = response.data;
      console.log("Business:", response.data);
      const slug = business.business_name.toLowerCase().replace(/\s+/g, "-");
      navigate(`/business/${slug}`, { state: { id: businessId } });

      return response.data; // This will return the business data
    } catch (error) {
      console.error("Error fetching business by ID:", error.message);
      return null;
    }
  };

  const fetchBusinessByCategory = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/business/category/${category.toLowerCase()}`
      );
      console.log("Businesses in category:", response.data);
      navigate(`/business-listings/${category}`);
      return response.data; // This will return the list of businesses in the category
    } catch (error) {
      console.error("Error fetching businesses by category:", error.message);
      return [];
    }
  };

  return (
    <div className={styles["search-bar"]}>
      <form onSubmit={handleSearch} className={styles["searchForm"]}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (!query) {
              setIsFocused(false);
            }
          }}
          className={styles["search-input"]}
        />
        <div
          className={`${styles["placeholder-text"]} ${
            isFading || isFocused ? styles["placeholder-fade"] : ""
          }`}
        >
          {placeholder}
        </div>
        <button
          type="submit"
          className={styles["search-button"]}
          onClick={() => handleSearchBtnClick()}
        >
          Search
        </button>
      </form>

      {/* Display filtered categories if search matches categories */}
      {query && filteredCategories.length > 0 && (
        <ul className={styles["dropdown"]}>
          {filteredCategories.map((category, index) => (
            <li
              key={category + index}
              className={styles["dropdown-item"]}
              onClick={() => fetchBusinessByCategory(category)}
            >
              <div className={styles["business-logo"]}>
                <FontAwesomeIcon
                  icon={faArrowTrendUp}
                  className={styles["dropdown-list-item-icon"]}
                />
              </div>
              <div className={styles["business-info"]}>
                <strong>{category}</strong>
                <br />
                <span>{"Category"}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Display filtered businesses */}
      {filteredResults.length > 0 && (
        <ul className={styles["dropdown"]}>
          {filteredResults.map((business) => (
            <li
              key={business._id}
              className={styles["dropdown-item"]}
              onClick={() => fetchBusinessByID(business._id)}
            >
              <div className={styles["business-logo"]}>
                <FontAwesomeIcon
                  className={styles["dropdown-list-item-icon"]}
                  icon={faBriefcase}
                />
              </div>
              <div className={styles["business-info"]}>
                <strong>{business.business_name}</strong>
                <br />
                <span>{business.location || "No location"}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
