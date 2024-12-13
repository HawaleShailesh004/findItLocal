import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import styles from "../Styles/HomePage.module.css"


const Footer = () => {
  return (
    

<footer className={styles['footer']}>
  <div className={styles['footer-container']}>

    {/* Section 1: Quick Links */}
    <div className={styles['footer-section']}>
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact-us">Contact</a></li>
        <li><a href="/faq">FAQ</a></li>
      </ul>
    </div>

    {/* Section 2: Contact Info */}
    <div className={styles['footer-section']}>
      <h4>Contact Us</h4>
      <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Business Street, City, State 12345</p>
      <p><FontAwesomeIcon icon={faEnvelope} /> info@business.com</p>
      <p><FontAwesomeIcon icon={faPhone} /> (123) 456-7890</p>
    </div>

    {/* Section 3: Social Media */}
    <div className={styles['footer-section']}>
      <h4>Follow Us</h4>
      <div className={styles['social-icons']}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      </div>
    </div>

    {/* Section 4: Copyright */}
    <div className={`${styles['footer-section']} ${styles['copyright']}`}>
      <p>&copy; {new Date().getFullYear()} findItLocal. All Rights Reserved.</p>
    </div>

  </div>
  <div className={styles['footer-logo-container']}>
    <img className={styles['logo-image']} src={`${process.env.PUBLIC_URL}/Images/logo.png`} alt="Logo" />
  </div>
</footer>
  );
};

export default Footer;
