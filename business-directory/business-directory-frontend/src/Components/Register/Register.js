import React, { useState } from "react";
import axios from "axios";
import styles from "./Register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Header from "../Header"
import Footer from "../Footer"

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    address: {
      line_1: "",
      line_2: "",
      city: "",
      state: "",
      postal_code: "",
    },
    role: "customer",
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // Track the current form step
  const navigate = useNavigate(); // Initialize navigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address_")) {
      const s = name.split("_")[2];

      let field = name.split("_")[1];
      if (s) {
        field = field + "_" + name.split("_")[2];
      }
      console.log(field);
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [field]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateStep1 = () => {
    let newErrors = {};
    if (!formData.first_name) newErrors.first_name = "First Name is required";
    if (!formData.last_name) newErrors.last_name = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // No errors means validation passed
  };

  const validateStep2 = () => {
    let newErrors = {};
    if (!formData.phone_number)
      newErrors.phone_number = "Phone Number is required";
    if (!formData.address.line_1)
      newErrors.address_line_1 = "Address Line 1 is required";
    if (!formData.address.city) newErrors.address_city = "City is required";
    if (!formData.address.state) newErrors.address_state = "State is required";
    if (!formData.address.postal_code)
      newErrors.address_postal_code = "Postal Code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // No errors means validation passed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1 && validateStep1()) {
      setStep(step + 1);
      return;
    }

    if (step === 2 && validateStep2()) {
      const dataToSend = {
        ...formData,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/users/signup",
          dataToSend
        );
        console.log("Registration Successful:", response.data);
        alert("Registration Successful! Redirecting to login...");
        navigate("/login");
      } catch (error) {
        console.error(
          "Registration Failed:",
          error.response ? error.response.data : error
        );
        if (error.response) {
          setErrors(error.response.data); // Set server errors
        }
      }
    }
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <>
 
    <div className={styles["register-main-container"]}>
      <h2 className={styles["register-title"]}>Register</h2>

      <form className={styles["register-form"]} onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={styles["register-container"]}>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className={`${styles["form-input"]} ${
                errors.first_name ? styles["input-error"] : ""
              }`}
            />
            {errors.first_name && (
              <p className={styles["error-message"]}>{errors.first_name}</p>
            )}

            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className={`${styles["form-input"]} ${
                errors.last_name ? styles["input-error"] : ""
              }`}
            />
            {errors.last_name && (
              <p className={styles["error-message"]}>{errors.last_name}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`${styles["form-input"]} ${
                errors.email ? styles["input-error"] : ""
              }`}
            />
            {errors.email && (
              <p className={styles["error-message"]}>{errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`${styles["form-input"]} ${
                errors.password ? styles["input-error"] : ""
              }`}
            />
            {errors.password && (
              <p className={styles["error-message"]}>{errors.password}</p>
            )}

            <button
              type="button"
              className={styles["form-button"]}
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className={styles["register-container"]}>
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className={`${styles["form-input"]} ${
                errors.phone_number ? styles["input-error"] : ""
              }`}
            />
            {errors.phone_number && (
              <p className={styles["error-message"]}>{errors.phone_number}</p>
            )}

            <input
              type="text"
              name="address_line_1"
              placeholder="Address Line 1"
              value={formData.address.line_1}
              onChange={handleChange}
              required
              className={`${styles["form-input"]} ${
                errors.address_line_1 ? styles["input-error"] : ""
              }`}
            />
            {errors.address_line_1 && (
              <p className={styles["error-message"]}>{errors.address_line_1}</p>
            )}

            <input
              type="text"
              name="address_line_2"
              placeholder="Address Line 2 (optional)"
              value={formData.address.line_2}
              onChange={handleChange}
              className={styles["form-input"]}
            />

            <input
              type="text"
              name="address_city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleChange}
              required
              className={`${styles["form-input"]} ${
                errors.address_city ? styles["input-error"] : ""
              }`}
            />
            {errors.address_city && (
              <p className={styles["error-message"]}>{errors.address_city}</p>
            )}

            <input
              type="text"
              name="address_state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleChange}
              required
              className={`${styles["form-input"]} ${
                errors.address_state ? styles["input-error"] : ""
              }`}
            />
            {errors.address_state && (
              <p className={styles["error-message"]}>{errors.address_state}</p>
            )}

            <input
              type="text"
              name="address_postal_code"
              placeholder="Postal Code"
              value={formData.address.postal_code}
              onChange={handleChange}
              required
              className={`${styles["form-input"]} ${
                errors.address_postal_code ? styles["input-error"] : ""
              }`}
            />
            {errors.address_postal_code && (
              <p className={styles["error-message"]}>
                {errors.address_postal_code}
              </p>
            )}

            <label htmlFor="role">Account Type:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={styles["form-select"]}
            >
              <option value="customer">Customer</option>
              <option value="business_owner">Business Owner</option>
              <option value="admin">Admin</option>
            </select>

            <div className={styles["button-grp"]}>
              <button
                type="button"
                className={styles["back-button"]}
                onClick={prevStep}
              >
                <FontAwesomeIcon icon={faArrowLeft} /> {/* Left Arrow Icon */}
              </button>
              <button type="submit" className={styles["form-button"]}>
                Register
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
       <Footer/>
    </>
  );
};

export default Register;
