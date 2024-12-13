import React from "react";
import styles from "./BusinessDashboard.module.css";
import { useUser } from "../../Context/UserContext";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faClipboardCheck,
  faFire,
  faArrowRight,
  faExclamationCircle,
  faFrown,
} from "@fortawesome/free-solid-svg-icons";

import Header from "../Header";
import Footer from "../Footer";
import ServiceListHorizontal from "../ServiceListHorizontal";

const BusinessDashboard = () => {
  const [business, setBusiness] = useState(null);

  const [ownerId, setOwnerId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  const { userId } = useUser();

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

      setOwnerId(response.data._id);
    } catch (err) {
      alert(err.message || "Error fetching user data");
    }
  };

  const goToCreateBusinessPage = () => {
    navigate("/create-business", { state: { data: ownerId } });
  };

  const goToCreateServicePage = () => {
    const bizData = {
      id: business._id,
      name: business.business_name,
    };
    navigate("/create-service", { state: { data: bizData } });
  };

  useEffect(() => {
    fetchUser();
    const fetchData = async () => {
      try {
        const businessResponse = await axios.get(
          `http://localhost:8080/business/owner/${ownerId}`
        );
        setBusiness(businessResponse.data[0]);
        // alert(business.business_name);

        // const reviewsResponse = await axios.get(
        //   `http://localhost:8080/review/business/${businessResponse.data._id}`
        // );
        // setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (ownerId) fetchData();
  }, [ownerId]);

  useEffect(() => {
    const fetchServices = async () => {
      // const bookingsResponse = await axios.get(
      //   `http://localhost:8080/booking/business/${businessResponse.data._id}`
      // );
      // setBookings(bookingsResponse.data);
      try {
        const servicesResponse = await axios.get(
          `http://localhost:8080/service/business/${business._id}`
        );
        setServices(servicesResponse.data);
        console.log(services);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    if (business && business._id) {
      fetchServices();
    }
  }, [business]);

  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.dashboardContainer}>
          {business ? (
            <>
              {/* Business Overview Section */}
              <section className={styles.businessOverview}>
                <div className={styles.businessLogo}>
                  <img
                    src="https://res.cloudinary.com/dequcdx8a/image/upload/v1727342402/jsbvqddukxfe1aypmilx.png"
                    alt="Business Logo"
                  />
                </div>
                <div className={styles.businessInfo}>
                  <div className={styles.basicBusinessInfo}>
                    <h1 className={styles.businessName}>
                      {business.business_name}
                    </h1>
                    <p className={styles.description}>{business.description}</p>
                    <p className={styles.category}>
                      {Array.isArray(business.category) &&
                      business.category.length > 1
                        ? "Categories: "
                        : "Category: "}
                      {Array.isArray(business.category) &&
                      business.category.length > 1
                        ? business.category.map((cat, index) => (
                            <span key={index}>
                              {cat}
                              {index < business.category.length - 1 && ", "}
                            </span>
                          ))
                        : business.category[0]}
                    </p>
                  </div>
                  <div className={styles.basicContactInfo}>
                    <p className={styles.location}>
                      Location: {business.location}
                    </p>
                    <div className={styles.contactInfo}>
                      <p>Phone: {business.contact_number}</p>
                      <p>Email: {business.email}</p>
                    </div>

                    <a className={styles.websiteLink} href={business.website}>
                      Visit Website
                    </a>
                  </div>
                </div>
              </section>

              {/* Services Offered Section */}
              <section className={styles.servicesOffered}>
                {services.length === 0 ? (
                  <>
                    <p className={styles["noServiceTxt"]}>
                      <FontAwesomeIcon icon={faExclamationCircle} /> No services
                      available
                    </p>

                    <button
                      className={styles.addNewService}
                      onClick={() => goToCreateServicePage()}
                    >
                      Add New Service
                    </button>
                  </>
                ) : (
                  <>
                    <ServiceListHorizontal
                      title="Services Offered"
                      services={services}
                    />
                    <button
                      className={styles.addNewService}
                      onClick={() => goToCreateServicePage()}
                    >
                      Add New Service
                    </button>
                  </>
                )}
              </section>

              {/* Working Hours Section */}
              <section className={styles.workingHours}>
                <div className={styles.workingHoursHead}>
                  <h2>Working Hours</h2>
                  <button className={styles.updateWorkingHours}>Update</button>
                </div>
                {/* Display working hours data */}
                <table className={styles.hoursTable}>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Working Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(business.working_hours).map(
                      ([day, hours]) => (
                        <tr key={day}>
                          <td>{day}</td>
                          <td>{hours}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </section>

              {/* Current Bookings Section */}
              <section className={styles.twoColumnSection}>
                <div className={styles.column}>
                  <h2>Current Bookings</h2>
                  <table className={styles.bookingsTable}>
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Customer</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Display bookings data here */}
                      {bookings.map((booking, index) => (
                        <tr key={index}>
                          <td>{booking.serviceName}</td>
                          <td>{booking.customerName}</td>
                          <td>{booking.date}</td>
                          <td>{booking.status}</td>
                          <td>{booking.paymentStatus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

             
              </section>
            </>
          ) : (
            <div className={styles.noBusinessFound}>
              <FontAwesomeIcon
                icon={faFrown}
                className={styles.noBusinessIcon}
              />
              <h2>No Business Found</h2>
              <p>
                You don't have any businesses listed yet. Please create one to
                get started.
              </p>
              <button
                className={styles.createBusinessButton}
                onClick={() => goToCreateBusinessPage()}
              >
                Create New Business
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BusinessDashboard;
