import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCardAlt } from "@fortawesome/free-solid-svg-icons";
import { faApplePay, faGooglePay, faPaypal } from "@fortawesome/free-brands-svg-icons";
import styles from "./Payment.module.css";
import Footer from "../Footer";
import Header from "../Header";
import { useUser } from "../../Context/UserContext";
import Loading from "../Loading/Loading";

const Payment = () => {
  const location = useLocation();
  const { serviceId, bookingId, businessId } = location.state || {};

  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [booking, setBooking] = useState(null);
  const [business, setBusiness] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypalId, setPaypalId] = useState("");
  const [applePayId, setApplePayId] = useState("");

  const {userId} = useUser();

  const handleVerify = async () => {
    let isValid = true;
    let transactionId = `txn_${Date.now()}`; // Example transaction ID; replace with actual logic if needed.

    // Validate inputs based on the selected payment method
    if (selectedPaymentMethod === "Credit/Debit Card") {
      if (!/^\d{16}$/.test(cardNumber)) {
        alert("Invalid Card Number. It should be 16 digits.");
        isValid = false;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        alert("Invalid Expiry Date. Format should be MM/YY.");
        isValid = false;
      }
      if (!/^\d{3}$/.test(cvv)) {
        alert("Invalid CVV. It should be 3 digits.");
        isValid = false;
      }
    } else if (selectedPaymentMethod === "Google Pay") {
      if (!upiId) {
        alert("UPI ID is required.");
        isValid = false;
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/.test(upiId)) {
        alert("Invalid UPI ID format.");
        isValid = false;
      }
    } else if (selectedPaymentMethod === "PayPal") {
      if (!paypalId) {
        alert("PayPal ID is required.");
        isValid = false;
      } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+$/.test(paypalId)) {
        alert("Invalid PayPal ID format.");
        isValid = false;
      }
    } else if (selectedPaymentMethod === "Apple Pay") {
      if (!applePayId) {
        alert("Apple Pay ID is required.");
        isValid = false;
      } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+$/.test(applePayId)) {
        alert("Invalid Apple Pay ID format.");
        isValid = false;
      }
    }

    if (isValid) {
      // If validation passes, proceed with payment
      const paymentData = {
        booking_id: bookingId,
        user_id: userId, // Replace with actual user ID
        amount: service.price,
        payment_method: selectedPaymentMethod,
        transaction_id: transactionId,
      };

      try {
        // Save payment details to the backend
        await axios.post("http://localhost:8080/payment", paymentData);

        // Update booking status
        const u = await axios.put(`http://localhost:8080/booking/${bookingId}`, {
          status: "confirmed",
          payment_status: "paid",
        });

        console.log(u)

        alert("Payment successful!");
        navigate("/myBookings")
      } catch (error) {
        console.error("Error processing payment:", error);
        alert("Payment failed. Please try again.");
      }
    }
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setUpiId("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setPaypalId("");
    setApplePayId("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceResponse = await axios.get(`http://localhost:8080/service/service/${serviceId}`);
        setService(serviceResponse.data);

        const bookingResponse = await axios.get(`http://localhost:8080/booking/details/${bookingId}`);
        setBooking(bookingResponse.data);

        const businessResponse = await axios.get(`http://localhost:8080/business/business/${businessId}`);
        setBusiness(businessResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [serviceId, bookingId, businessId]);

  if (!service || !booking || !business) {
    return <Loading/>;
  }

  const gstPercentage = 18;
  const servicePrice = service.price;
  const discountPercentage = service.discount_percentage;

  const gstAmount = (servicePrice * gstPercentage) / 100;
  const discountAmount = (servicePrice * discountPercentage) / 100;
  const discountedPrice = servicePrice - discountAmount;
  const totalAmount = discountedPrice + gstAmount;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <h1 className={styles.title}>Payment Summary</h1>

          <div className={styles.summaryContainer}>
            <div className={styles.summaryCard}>
              <p><strong>Paying To:</strong> {business.business_name}</p>
              <p><strong>Service:</strong> {service.service_name}</p>
              <p><strong>Booking ID:</strong> {booking._id}</p>
              <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <h3>Price Breakdown</h3>
          <div className={styles.priceBreakdown}>
            <div className={styles.breakdownItem}>
              <span>Service Price:</span>
              <span>₹{servicePrice.toFixed(2)}</span>
            </div>
            <div className={styles.breakdownItem}>
              <span>GST (18%):</span>
              <span>₹{gstAmount.toFixed(2)}</span>
            </div>
            <div className={styles.breakdownItem}>
              <span>Discount ({discountPercentage}%):</span>
              <span>-₹{discountAmount.toFixed(2)}</span>
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

          <h2 className={styles.paymentMethodsTitle}>Select Payment Method</h2>
          <div className={styles.paymentMethodsContainer}>
            {["Credit/Debit Card", "PayPal", "Apple Pay", "Google Pay"].map(method => (
              <div key={method} className={styles.paymentMethod}>
                <input
                  type="radio"
                  id={method}
                  name="paymentMethod"
                  value={method}
                  checked={selectedPaymentMethod === method}
                  onChange={() => handlePaymentMethodChange(method)}
                />
                <label htmlFor={method}>
                  {method}
                  {method === "Credit/Debit Card" && (
                    <FontAwesomeIcon icon={faCreditCardAlt} className={styles.paymentIcon} />
                  )}
                  {method === "Apple Pay" && (
                    <FontAwesomeIcon icon={faApplePay} className={styles.paymentIcon} />
                  )}
                  {method === "Google Pay" && (
                    <FontAwesomeIcon icon={faGooglePay} className={styles.paymentIcon} />
                  )}
                  {method === "PayPal" && (
                    <FontAwesomeIcon icon={faPaypal} className={styles.paymentIcon} />
                  )}
                </label>
              </div>
            ))}
          </div>

          {selectedPaymentMethod && (
            <div className={styles.inputSection}>
              {selectedPaymentMethod === "Credit/Debit Card" && (
                <>
                  <h3>Enter Card Details</h3>
                  <input
                    type="text"
                    placeholder="Card Number (16 digits)"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Expiry Date (MM/YY)"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="CVV (3 digits)"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </>
              )}
              {selectedPaymentMethod === "Google Pay" && (
                <>
                  <h3>Enter UPI ID</h3>
                  <input
                    type="text"
                    placeholder="UPI ID"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </>
              )}
              {selectedPaymentMethod === "PayPal" && (
                <>
                  <h3>Enter PayPal ID</h3>
                  <input
                    type="text"
                    placeholder="PayPal ID"
                    value={paypalId}
                    onChange={(e) => setPaypalId(e.target.value)}
                  />
                </>
              )}
              {selectedPaymentMethod === "Apple Pay" && (
                <>
                  <h3>Enter Apple Pay ID</h3>
                  <input
                    type="text"
                    placeholder="Apple Pay ID"
                    value={applePayId}
                    onChange={(e) => setApplePayId(e.target.value)}
                  />
                </>
              )}
            </div>
          )}

          <button onClick={handleVerify} className={styles.verifyButton}>
            Verify and Pay
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
