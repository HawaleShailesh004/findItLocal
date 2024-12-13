import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./UserProfile.module.css"; // Importing the CSS Module
import Header from "../Header";
import Footer from "../Footer";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faUser,
  faUserEdit,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading/Loading";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Function to fetch the user data
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get("http://localhost:8080/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Error fetching user data");
      setLoading(false);
    }
  };

  // useEffect to trigger the fetch when the component mounts
  useEffect(() => {
    fetchUser();
  }, []);

  // If loading show a loading state
  if (loading) {
    return <Loading/>;
  }

  // If there is an error and it's due to no token, show the alternative UI
  if (error === "No token found") {
    return (
      <>
        <Header />
        <div className={styles.welcomeContainer}>
          <h2>Welcome to Our Service!</h2>
          <p>Please login or signup to access your profile and services.</p>
          <div className={styles.buttonGroup}>
            <button
              className={styles.loginButton}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className={styles.signupButton}
              onClick={() => navigate("/register")}
            >
              Signup
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the profile content if the user is available
  return (
    <>
      <Header />
      <div className={styles.profileContainer}>
        <div className={styles.heroProfileImage}>
          <img
            className={styles.heroImage}
            src="https://images.unsplash.com/photo-1692520883706-3dd39fc6a896?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGFyayUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Profile Background"
          />
          <div className={styles.overlay}>
            <h2 className={styles.welcomeText}>{`Hi, ${user.first_name}`}</h2>
          </div>
        </div>
        {user ? (
          <div className={styles.profileRow}>
            <div className={styles.profileHeader}>
              {user.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt="Profile"
                  className={styles.profileImage}
                />
              ) : (
                <div className={styles.profilePlaceholder}>No Image</div>
              )}
              <h2>{`${user.first_name} ${user.last_name}`}</h2>
              <p className={styles.userEmail}>{user.email}</p>
              {user.is_verified && (
                <p className={styles.verifiedStatus}>Verified</p>
              )}
              <div className={styles.buttonGroup}>
                <button className={styles.updateButton}>
                  <FontAwesomeIcon icon={faUserEdit} /> Update Profile
                </button>
                <button className={styles.passwordButton}>
                  Change Password
                </button>
                {user.role === "business_owner" && (
                  <button
                    className={styles.businessButton}
                    onClick={() => navigate("/business-dashboard")}
                  >
                  Business Page
                  </button>
                )}
              </div>
            </div>

            <div className={styles.profileInfo}>
              <h3>Profile Information</h3>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                  <h4>Contact Info</h4>
                </div>
                <p>
                  <strong>Phone:</strong> {user.phone_number}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className={styles.icon}
                  />
                  <h4>Address</h4>
                </div>
                <p>
                  <strong>Line 1:</strong> {user.address.line_1}
                </p>
                <p>
                  <strong>City:</strong> {user.address.city}
                </p>
                <p>
                  <strong>State:</strong> {user.address.state}
                </p>
                <p>
                  <strong>Postal Code:</strong> {user.address.postal_code}
                </p>
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon} />
                  <h4>Role</h4>
                </div>
                <p>
                  <strong>Role:</strong>{" "}
                  {user.role === "business_owner" ? "Business Owner" : "Customer"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>No user data available</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
