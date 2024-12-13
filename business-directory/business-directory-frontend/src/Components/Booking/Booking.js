import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Booking.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent, faCalendar } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarAlt,
  faClock,
  faStickyNote,
  faDollarSign,
  faTag,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../Header";
import Footer from "../Footer";

import { useUser } from "../../Context/UserContext";
import Loading from "../Loading/Loading";

const Booking = () => {
  const location = useLocation();

  const { service_id } = location.state || {}; // Provide a fallback
  const { userId } = useUser();

  const [serviceDetails, setServiceDetails] = useState(null);
  const [scheduledDate, setScheduledDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);
  const [serviceTitle, setServiceTitle] = useState("");

  const [totalAmountAfterAll, setTotalAmountAfterAll] = useState(0);

  const navigate = useNavigate();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/service/service/${service_id}`
        );
        setServiceDetails(response.data);
        setServiceTitle(capitalizeFirstLetter(response.data.service_name));
        const gst = response.data.price * 0.18;
        setGstAmount(gst);
        const total = response.data.price + gst;
        setTotalAmount(total);
        setDiscountedPrice(response.data.price);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchServiceDetails();
  }, []);

  useEffect(() => {
    if (serviceDetails && discountCode) {
      const discountValue =
        (serviceDetails.discount_percentage / 100) * serviceDetails.price;
      const finalPrice = totalAmount - discountValue;
      setDiscountedPrice(finalPrice < 0 ? 0 : finalPrice);
    }
  }, [discountCode, totalAmount, serviceDetails]);

  useEffect(() => {
    if (serviceDetails && scheduledDate) {
      const selectedDay = new Date(scheduledDate)
        .toLocaleString("en-US", {
          weekday: "long",
        })
        .toLowerCase(); // Convert to lowercase
  
      // Normalize the available days from the database
      const availableDays = Object.keys(serviceDetails.available_days);
      const normalizedDays = availableDays.map((day) => day.toLowerCase());
  
      // Find the original day key from serviceDetails based on case-insensitive match
      const originalDayKey = availableDays.find(
        (day) => day.toLowerCase() === selectedDay
      );
  
      console.log(normalizedDays, selectedDay, originalDayKey);
  
      // Check if the selected day is available
      if (originalDayKey) {
        const availableDayTimes = serviceDetails.available_days[originalDayKey];
        if (availableDayTimes && availableDayTimes !== "Closed") {
          const slots = generateTimeSlots(
            availableDayTimes,
            serviceDetails.duration
          );
          setAvailableTimes(slots);
          setAvailabilityMessage("");
        } else {
          setAvailableTimes([]);
          setAvailabilityMessage(
            `Service not available on ${capitalizeFirstLetter(selectedDay)}. Please select a different day.`
          );
        }
      } else {
        setAvailableTimes([]);
        setAvailabilityMessage(
          `Service not available on ${capitalizeFirstLetter(selectedDay)}. Please select a different day.`
        );
      }
    }
  }, [scheduledDate, serviceDetails]);
  

  const generateTimeSlots = (timeRange, duration) => {
    const [startTimeStr, endTimeStr] = timeRange.split(" - ");
    const startTimeMatch = startTimeStr.match(/(\d{1,2})(?::(\d{2}))?(am|pm)/i);
    const endTimeMatch = endTimeStr.match(/(\d{1,2})(?::(\d{2}))?(am|pm)/i);

    if (!startTimeMatch || !endTimeMatch) {
      return [];
    }

    const startHour = parseInt(startTimeMatch[1]);
    const startMinute = startTimeMatch[2] ? parseInt(startTimeMatch[2]) : 0;
    const endHour = parseInt(endTimeMatch[1]);
    const endMinute = endTimeMatch[2] ? parseInt(endTimeMatch[2]) : 0;
    const startPeriod = startTimeMatch[3].toLowerCase();
    const endPeriod = endTimeMatch[3].toLowerCase();

    const startHour24 = (startHour % 12) + (startPeriod === "pm" ? 12 : 0);
    const endHour24 = (endHour % 12) + (endPeriod === "pm" ? 12 : 0);

    const startTime = new Date();
    startTime.setHours(startHour24, startMinute, 0);
    const endTime = new Date();
    endTime.setHours(endHour24, endMinute, 0);

    const slots = [];
    let currentTime = new Date(startTime);
    while (currentTime < endTime) {
      const formattedStartTime = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const nextTime = new Date(currentTime.getTime() + duration * 60000);
      const formattedEndTime = nextTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      slots.push(`${formattedStartTime} to ${formattedEndTime}`);
      currentTime = nextTime;
    }

    return slots;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!service_id) {
      alert("Service ID is missing. Please return to the previous page.");
      navigate("/");
      return;
    }

    const bookingData = {
      scheduled_date: scheduledDate,
      selected_time: selectedTime,
      notes,
      total_amount: totalAmount,
      discount_code: discountCode,
      payment_status: paymentStatus,
      user_id: userId, // Replace with actual user ID
      business_id: serviceDetails.business_id, // Replace with actual business ID
      service_id,
    };

    console.log("Booking Data", bookingData);

    try {
      const response = await axios.post(
        "http://localhost:8080/booking/new",
        bookingData
      );
      console.log("Booking saved successfully:", response.data);
      const book = response.data;
      navigate("/pay", {
        state: {
          bookingId: book._id,
          serviceId: book.service_id,
          businessId: book.business_id,
        },
      });
      // Optionally, navigate to a different page or reset the form
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("There was an error saving your booking. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.bookingPage}>
        <h1 className={styles.title}>Booking for {serviceTitle}</h1>
        <p style={{ "margin-top": "-1rem" }}>
          {serviceDetails ? serviceDetails.description : ""}
        </p>

        {serviceDetails ? (
          <div className={styles.serviceCard}>
            <h2 className={styles.serviceTitle}>
              {serviceDetails.service_name}
            </h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <FontAwesomeIcon icon={faTag} className={styles.iconincard} />
                <span className={styles.label}>Price:</span>
                <span className={styles.value}>₹{serviceDetails.price}</span>
              </div>
              <div className={styles.detailItem}>
                <FontAwesomeIcon icon={faClock} className={styles.iconincard} />
                <span className={styles.label}>Duration:</span>
                <span className={styles.value}>
                  {serviceDetails.duration} minutes
                </span>
              </div>
              <div className={styles.detailItem}>
                <FontAwesomeIcon
                  icon={faPercent}
                  className={styles.iconincard}
                />
                <span className={styles.label}>Discount:</span>
                <span className={styles.value}>
                  {serviceDetails.discount_percentage}%
                </span>
              </div>
              <div className={styles.detailItem}>
                <FontAwesomeIcon
                  icon={faCalendar}
                  className={styles.iconincard}
                />
                <span className={styles.label}>Available Days:</span>
                <span className={styles.value}>
                  {Object.keys(serviceDetails.available_days).join(", ")}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <><Loading/></>
        )}
        <form className={styles.form} onSubmit={handleBookingSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="scheduledDate">
              <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />{" "}
              Scheduled Date
            </label>
            <input
              type="date"
              id="scheduledDate"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              min={getTodayDate()}
              className={styles.input}
              required
            />
          </div>
          {availabilityMessage && (
            <p className={styles.availabilityMessage}>{availabilityMessage}</p>
          )}
          {scheduledDate && availableTimes.length > 0 ? (
            <div className={styles.inputGroup}>
              <label htmlFor="availableTime">
                <FontAwesomeIcon icon={faClock} className={styles.icon} />{" "}
                Select Time
              </label>
              <select
                id="availableTime"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className={styles.select}
                required
              >
                <option value="" disabled>
                  Select a time
                </option>
                {availableTimes.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <></>
          )}
          <div className={styles.inputGroup}>
            <label htmlFor="notes">
              <FontAwesomeIcon icon={faStickyNote} className={styles.icon} />{" "}
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={styles.textarea}
              placeholder="Additional information or requests..."
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="discountCode">
              <FontAwesomeIcon icon={faTag} className={styles.icon} /> Discount
              Code
            </label>
            <input
              type="text"
              id="discountCode"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className={styles.input}
              placeholder="Enter discount code if applicable"
            />
          </div>

          {serviceDetails && (
            <div className={styles.priceBreakdown}>
              <h3>Price Breakdown</h3>
              <div className={styles.breakdownItem}>
                <span>Service Price:</span>
                <span>₹{serviceDetails.price.toFixed(2)}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>GST (18%):</span>
                <span>₹{gstAmount.toFixed(2)}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>Discount ({serviceDetails.discount_percentage}%):</span>
                <span>
                  -₹
                  {(
                    serviceDetails.price *
                    (serviceDetails.discount_percentage / 100)
                  ).toFixed(2)}
                </span>
              </div>
              <div className={styles.breakdownItem}>
                <span>Total Amount (After Discount):</span>
                <span>₹{discountedPrice.toFixed(2)}</span>
              </div>
              <div className={styles.breakdownItem}>
                <span>Total Amount (with GST):</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className={styles.submitButtonContainer}>
            <button type="submit" className={styles.submitButton}>
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Booking;
