import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./BusinessDetail.module.css";
import styles2 from "./global.css";
import Header from "../Header";
import Footer from "../Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../../Context/UserContext";
import Swal from "sweetalert2"; // For popup confirmation dialogs
import {
  faArrowTrendUp,
  faCamera,
  faCheckCircle,
  faLocationDot,
  faMailBulk,
  faPhone,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import ServiceListHorizontal from "../ServiceListHorizontal";
import Loading from "../Loading/Loading";

const BusinessDetail = () => {
  const { setUserId } = useUser();
  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState(null);
  const [currentBusId, setCurrentBusId] = useState();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview"); // State for active link
  const location = useLocation();
  const { id } = location.state; // Get the actual business._id
  setUserId(id);
  console.log(id);
  const containerRef = useRef(null); // Use a ref to get the container element

  const handlePhoneClick = (phone) => {
    Swal.fire({
      title: `Call ${phone} or Copy?`,
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Call",
      denyButtonText: "Copy",
      customClass: {
        title: "swal-title", // Title styling
        icon: "swal-icon", // Icon styling
        popup: "swal-popup", // Popup box styling
        confirmButton: "swal-button-confirm", // Confirm button styling
        denyButton: "swal-button-deny", // Deny button styling
        cancelButton: "swal-button-cancel", // Cancel button styling
      },
      backdrop: "rgba(0, 0, 0, 0.6)", // Light backdrop
      buttonsStyling: false, // Disabling default SweetAlert button styling
    }).then((result) => {
      if (result.isConfirmed) {
        // Open the dialer with the phone number
        window.location.href = `tel:${phone}`;
      } else if (result.isDenied) {
        // Copy phone number to clipboard
        navigator.clipboard.writeText(phone);
        Swal.fire("Copied to clipboard!", "", "success");
      }
    });
  };

  const handleEmailClick = (email, businessName) => {
    const subject = `Service Inquiry: ${businessName}`;
    const body = `Hello,\n\nI am interested in the services provided by ${businessName}. Please provide more information. Thank you!\n\nBest regards,\n[Your Name]`;

    // URL encode subject and body
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open the default email client with the encoded mailto link

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = mailtoLink;

    // Open the link in a new tab
    window.open(mailtoLink, "_blank");
  };

  const handleWebsiteClick = (website) => {
    // Open the website in a new tab
    window.open(website, "_blank");
  };

  // Scroll left by two images
  const scrollLeft = () => {
    if (containerRef.current) {
      const scrollAmount =
        containerRef.current.querySelector("img").offsetWidth * 2;
      containerRef.current.scrollBy({
        left: -scrollAmount, // Scroll left by the width of two images
        behavior: "smooth",
      });
    }
  };

  // Scroll right by two images
  const scrollRight = () => {
    if (containerRef.current) {
      const scrollAmount =
        containerRef.current.querySelector("img").offsetWidth * 2;
      containerRef.current.scrollBy({
        left: scrollAmount, // Scroll right by the width of two images
        behavior: "smooth",
      });
    }
  };

  const fetchBusinessDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/business/business/${id}`
      );
      setBusiness(response.data);
      setCurrentBusId(response.data._id);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching business details:", error);
      setLoading(false);
    }
  };

  const fetchBusinessServices = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/service/business/${id}`
      );
      console.log(response.data);
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching business Services:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessDetails();
    fetchBusinessServices();
  }, [id]);

  useEffect(() => {
    // Add event listener for scroll
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "overview";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120; // Adjusted offset based on header height
        if (window.pageYOffset >= sectionTop) {
          currentSection = section.getAttribute("id");
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) return <Loading />;
  if (!business) return <p>No business found.</p>;

  // Scroll to the section with smooth scrolling and precise offset adjustment
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const headerOffset = 80; // Adjust this value based on your actual header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />
      <div className={styles["business-detail"]}>
        <header className={styles["business-header"]}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2X3zNW0EK1HqAQIt4cf3VR9-GG9WFTIPelg&s"
            alt={`${business.business_name} logo`}
            className={styles["business-logo"]}
          />
          <div className={styles["business-info"]}>
            <h2>{business.business_name}</h2>
            <p className={styles["description"]}>{business.description}</p>
            <p className={styles.location}>
              <FontAwesomeIcon icon={faLocationDot} />
              {"  "}
              {business.location}
            </p>
            <p className={styles.rating}>
              <span className={styles.ratingHighlight}>
                {business.average_rating}
              </span>{" "}
              ({business.total_reviews} reviews)
            </p>
            <div className={styles["contact-info"]}>
              {/* Phone */}
              <p
                className={styles["phone"]}
                onClick={() => handlePhoneClick(business.contact_number)}
              >
                <FontAwesomeIcon icon={faPhone} /> {business.contact_number}
              </p>

              {/* Email */}
              <p
                className={styles["email"]}
                onClick={() =>
                  handleEmailClick(business.email, business.business_name)
                }
              >
                <FontAwesomeIcon icon={faMailBulk} /> Email
              </p>

              {/* Website */}
              <p
                className={styles["website"]}
                onClick={() => handleWebsiteClick(business.website)}
              >
                <FontAwesomeIcon icon={faArrowTrendUp} /> Website
              </p>
            </div>
          </div>
        </header>

        <nav className={styles["navbar"]}>
          <ul className={styles["navbar-ul"]}>
            <li
              className={activeSection === "overview" ? styles.active : ""}
              onClick={() => scrollToSection("photos")}
            >
              Overview
            </li>
            <li
              className={activeSection === "photos" ? styles.active : ""}
              onClick={() => scrollToSection("photos")}
            >
              Photos
            </li>
            <li
              className={activeSection === "working-hours" ? styles.active : ""}
              onClick={() => scrollToSection("working-hours")}
            >
              Working Hours
            </li>
            <li
              className={activeSection === "services" ? styles.active : ""}
              onClick={() => scrollToSection("services")}
            >
              Services
            </li>
            <li
              className={activeSection === "reviews" ? styles.active : ""}
              onClick={() => scrollToSection("reviews")}
            >
              Reviews
            </li>
          </ul>
        </nav>

        <section id="photos" className={styles["section"]}>
          <h3>Photos</h3>
          <div className={styles["photos-section-container"]} ref={containerRef}>
            {business.business_images && business.business_images.length > 0 ? (
              <>
                <div className={styles["photos-container"]} ref={containerRef} >
                  {business.business_images.map((image, index) => (
                    <img
                      src={image}
                      alt={`Business Image ${index + 1}`}
                      className={styles["business_image"]}
                      key={index}
                    />
                  ))}
                </div>
                {business.business_images.length > 5 ? (
                   <div className={styles["button-container"]}>
                   <button
                     className={`${styles["scroll-btn"]} ${styles["left"]}`}
                     onClick={() => scrollLeft()}
                   >
                     ← {/* Left arrow */}
                   </button>
                   <button
                     className={`${styles["scroll-btn"]} ${styles["right"]}`}
                     onClick={() => scrollRight()}
                   >
                     → {/* Right arrow */}
                   </button>
                 </div>
                ) : (<>
                </>)}
               
              </>
            ) : (
              <div className={styles["no-photos-container"]}>
                <FontAwesomeIcon
                  icon={faCamera}
                  size="2x"
                  className={styles["noPhotosIcon"]}
                />
                <p className={styles["noPhotosText"]}>No Photos Available!</p>
              </div> // Text to show if there are no images
            )}
          </div>
        </section>

        <section id="working-hours" className={styles["section"]}>
          <h3>Working Hours</h3>
          <div className={styles["table-container"]}>
            <table className={styles["working-hours-table"]}>
              <thead>
                <tr>
                  <th className={styles["day-header"]}>Day</th>
                  <th className={styles["hours-header"]}>Hours</th>
                  <th className={styles["status-header"]}>Status</th>{" "}
                  {/* New column for status */}
                </tr>
              </thead>
              <tbody>
                {business.working_hours &&
                  Object.entries(business.working_hours).map(([day, hours]) => {
                    // Example logic to determine if open (you can replace this with your logic)
                    const isOpen = hours !== "Closed"; // Customize based on your data structure

                    return (
                      <tr key={day} className={styles["working-hours-row"]}>
                        <td className={styles["day-cell"]}>{day}</td>
                        <td className={styles["hours-cell"]}>{hours}</td>
                        <td className={styles["status-cell"]}>
                          {isOpen ? (
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className={styles["open-icon"]}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faTimesCircle}
                              className={styles["closed-icon"]}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>

        <section id="services" className={styles["section"]}>
          <h3>Services</h3>
          <p>Here are some services offered by the business (dummy data).</p>
          <div className={styles["services-container"]}>
            {services && (
              <ServiceListHorizontal
                title={null}
                services={services}
                contact_no={business.contact_number}
                style={{ backgroundColor: "lightgray", padding: "5rem" }}
              />
            )}
            ;
          </div>
        </section>

        <section id="reviews" className={styles["section"]}>
          <h3>Reviews</h3>
          <p>No Reviews</p>
        </section>

        <button
          className={styles["call-to-action"]}
          onClick={() => handleEmailClick(business.email, business.name)}
        >
          Contact Us
        </button>
      </div>

      <Footer />
    </>
  );
};

export default BusinessDetail;
