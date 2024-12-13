import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBullseye,
  faHandshake,
  faEnvelope,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./AboutUs.module.css";
import Header from "../Header";
import Footer from "../Footer";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <img
            src={`${process.env.PUBLIC_URL}/Images/about.png`}
            alt="About Us"
            className={styles.heroImage}
          />

          <div className={styles.overlay}></div>

          <h1 className={styles.heroTitle}>
            About <span className={styles.brandName}>FindItLocal</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Your Go-To Local Business Directory
          </p>
        </section>

        {/* Mission Section */}
        <section className={styles.missionSection}>
          <FontAwesomeIcon icon={faBullseye} className={styles.icon} />
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.text}>
            At <strong>FindItLocal</strong>, our mission is to connect local
            businesses with the community by offering an easy and efficient way
            for people to discover, book, and connect with service providers. We
            aim to empower small businesses and make local shopping a breeze.
          </p>
        </section>

        {/* Why Choose Us Section */}
        <section className={styles.whyChooseUs}>
          <FontAwesomeIcon icon={faHandshake} className={styles.icon} />
          <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={styles.listIcon}
              />{" "}
              Curated Local Listings
            </li>
            <li className={styles.listItem}>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={styles.listIcon}
              />{" "}
              Trusted Reviews & Ratings
            </li>
            <li className={styles.listItem}>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={styles.listIcon}
              />{" "}
              Easy Booking and Payments
            </li>
            <li className={styles.listItem}>
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={styles.listIcon}
              />{" "}
              Supporting Local Communities
            </li>
          </ul>
        </section>

        {/* Meet Our Team Section */}
        <section className={styles.teamSection}>
          <FontAwesomeIcon icon={faUsers} className={styles.icon} />
          <h2 className={styles.sectionTitle}>Meet Our Team</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <img
                src={`${process.env.PUBLIC_URL}/Images/shresha.jpg`}
                alt="John Doe"
                className={styles.teamImage}
              />
              <h3 className={styles.teamName}>Shresha Sinha</h3>
            </div>
            <div className={styles.teamMember}>
              <img
                src={`${process.env.PUBLIC_URL}/Images/shravani.jpg`}
                alt="Jane Smith"
                className={styles.teamImage}
              />
              <h3 className={styles.teamName}>Shravani Rodge</h3>
            </div>
            <div className={styles.teamMember}>
              <img
                src={`${process.env.PUBLIC_URL}/Images/shailesh.jpg`}
                alt="Alice Brown"
                className={styles.teamImage}
              />
              <h3 className={styles.teamName}>Shailesh Hawale</h3>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <p className={styles.text}>
            Have questions or need support? Reach out to us at:
          </p>
          <p className={styles.email}>support@finditlocal.com</p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
