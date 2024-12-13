import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMoneyBillWave,
  faInfoCircle,
  faMoneyCheck,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./UserBooking.module.css"; // Assuming you're using CSS Modules
import { useUser } from "../../Context/UserContext"; // Assuming you have a UserContext for fetching user details

import Header from "../Header";
import Footer from "../Footer";
import Loading from "../Loading/Loading";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uId, setUId] = useState(null);

  const { userId } = useUser();

  useEffect(() => {
    if (userId) {
      setUId(userId);
    }
  }, [userId]); // This effect only runs when userId changes
  
  useEffect(() => {
    // Only fetch bookings if userId is available
    if (uId) {
      axios
        .get(`http://localhost:8080/booking/userBookings/${uId}`)
        .then((response) => {
          setBookings(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching bookings", error);
          setLoading(false);
        });
    }
  }, [uId]); // Effect runs when uId changes or is available

  // Function to cancel the booking
  const handleCancelBooking = (bookingId) => {
    axios
      .put(`http://localhost:8080/booking/${bookingId}`, {
        status: "Cancelled",
        payment_status: null, // Nullify payment status on cancel
      })
      .then((response) => {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "Cancelled", payment_status: null }
              : booking
          )
        );
      })
      .catch((error) => {
        console.error("Error cancelling the booking", error);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className={styles.bookingsContainer}>
        <h2>Your Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className={styles.bookingGrid}>
            {bookings.map((booking) => (
              <div key={booking._id} className={styles.bookingCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitles}>
                  <h3>{booking.service_id.service_name}</h3>
                  <p>{booking.business_id.business_name}</p>
                  </div>
                   {/* Cancel Booking Button */}
                {booking.status !== "canceled" && (
                  <div className={styles.cnclBtnDiv}>
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className={styles.cancelButton}
                  >
                    <FontAwesomeIcon icon={faTimesCircle} /> Cancel Booking
                  </button>
                  </div>
                )}
                </div>
                
                <div className={styles.cardBody}>
                  <div className={styles.cardDetail}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <p>
                      Scheduled:{" "}
                      {new Date(booking.scheduled_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={styles.cardDetail}>
                    <FontAwesomeIcon icon={faMoneyBillWave} />
                    <p>Total: ₹{booking.total_amount}</p>
                  </div>
                  <div className={styles.cardDetail}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <p>Status: {booking.status}</p>
                  </div>
                  {/* Only show payment status if the booking is not cancelled */}
                  {booking.status !== "Cancelled" && (
                    <div className={styles.cardDetail}>
                      <FontAwesomeIcon icon={faMoneyCheck} />
                      <p>Payment: {booking.payment_status}</p>
                    </div>
                  )}
                </div>
               
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserBookings;
