import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import styles from "../Styles/HomePage.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; 
import { useUser } from '../Context/UserContext';
import axios from 'axios';
const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle dropdown

  const navigate = useNavigate();

  const {userId, setUserId} = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);

      // Fetch the user ID from the server
      axios.get('http://localhost:8080/users/user-id', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const user_id = response.data.user_id; // Assuming the response is { userId: "..." }
        setUserId(user_id); // Set the userId in context
        console.log(userId)
      })
      .catch(error => {
        console.error('Error fetching user ID:', error);
        // Optionally handle error, e.g., log out the user if the token is invalid
        setIsAuthenticated(false);
      });
    }
  }, [setUserId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/")
    setIsAuthenticated(false);
    setIsMenuOpen(false); // Close the dropdown when logged out
  };

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // Toggle dropdown menu on icon click
  };

  return (
    <header className={styles['header']}>
      <div className={styles['logo']} onClick={()=> navigate("/")}>
        <img className={styles['logo-image']} src={`${process.env.PUBLIC_URL}/Images/logo.png`} alt="Logo" />
      </div>
      <SearchBar />
      <nav className={styles['nav']}>
        <Link to="/">Home</Link>
        
      
        {isAuthenticated ? (
          <>
          <Link to="/business-dashboard">My Business</Link>
          <div className={styles['profile-container']}>
            <div onClick={toggleMenu} className={styles['profile-icon-wrapper']}>
              <FontAwesomeIcon icon={faUserCircle} size="2x" className={styles['profile-icon']} />
            </div>
            {isMenuOpen && (
              <div className={styles['dropdown-menu']}>
                <ul className={styles['dropdown-menu-ul']}>
                  <li className={styles['dropdown-menu-ul']}><Link to="/profile">View Profile</Link></li>
                  <li className={styles['dropdown-menu-ul']}><Link to="/myBookings">My Bookings</Link></li>
                  <li className={styles['dropdown-menu-ul']}><button onClick={handleLogout} className={styles['logout-btn']}>Logout</button></li>
                  {/* You can add more menu options here */}
                </ul>
              </div>
             
            )}
          </div>
          </>
        ) : (
          <>
            <Link to="/register">Free Business Listings</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
