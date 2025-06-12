import React, { useState, useEffect } from "react";
import styles from "./CreateBusiness.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faPhone,
  faMapMarkerAlt,
  faEnvelope,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateBusiness = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialWorkingHours = {
    Monday: { from: "", to: "", isClosed: true },
    Tuesday: { from: "", to: "", isClosed: true },
    Wednesday: { from: "", to: "", isClosed: true },
    Thursday: { from: "", to: "", isClosed: true },
    Friday: { from: "", to: "", isClosed: true },
    Saturday: { from: "", to: "", isClosed: true },
    Sunday: { from: "", to: "", isClosed: true },
  };

  const [formData, setFormData] = useState({
    owner_id: location.state?.data,
    business_name: "",
    description: "",
    category: [],
    location: "",
    contact_number: "",
    email: "",
    website: "",
    working_hours: initialWorkingHours,
    business_logo: null,
    business_images: [],
  });

  const [categoryInput, setCategoryInput] = useState("");
  const [categorySuggestions, setCategorySuggestions] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [addedDays, setAddedDays] = useState([]); // Track added days
  const [selectedDay, setSelectedDay] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/category/allservicenames"
        );
        setAllCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories", error.response.data.message);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryInput = (e) => {
    const input = e.target.value;
    setCategoryInput(input);

    if (input.trim()) {
      const filteredSuggestions = allCategories
        .filter((cat) => cat.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 5);
      setCategorySuggestions(filteredSuggestions);
    } else {
      setCategorySuggestions([]);
    }
  };

  const handleAddCategory = (category) => {
    if (!formData.category.includes(category)) {
      setFormData((prevData) => ({
        ...prevData,
        category: [...prevData.category, category],
      }));
    }
    setCategoryInput("");
    setCategorySuggestions([]);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 500000) {
      setFormData({ ...formData, business_logo: file });
      setErrors({ ...errors, logo: null });
      console.log(errors)
    } else {
      setErrors({ ...errors, logo: "Logo size should be under 500KB." });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.size < 500000);
    if (validFiles.length === files.length) {
      setFormData({ ...formData, business_images: validFiles });
      setErrors({ ...errors, images: null });
    } else {
      setErrors({ ...errors, images: "Each image should be under 500KB." });
    }
  };

  const handleWorkingHoursChange = (field, value) => {
    const updatedWorkingHours = { ...formData.working_hours };
    updatedWorkingHours[selectedDay][field] = value;

    if (field === "from" || field === "to") {
      updatedWorkingHours[selectedDay].isClosed = !(
        updatedWorkingHours[selectedDay].from &&
        updatedWorkingHours[selectedDay].to
      );
    }

    setFormData({ ...formData, working_hours: updatedWorkingHours });
  };

  const handleAddWorkingHours = () => {
    if (selectedDay) {
      const { from, to } = formData.working_hours[selectedDay];
      if (from && to) {
        const updatedWorkingHours = { ...formData.working_hours };
        updatedWorkingHours[selectedDay].isClosed = false;

        // Add the selected day to addedDays if not already present
        if (!addedDays.includes(selectedDay)) {
          setAddedDays((prev) => [...prev, selectedDay]);
        }

        setFormData({ ...formData, working_hours: updatedWorkingHours });
        setSelectedDay(""); // Reset selected day
      } else {
        alert("Please set both opening and closing times.");
      }
    } else {
      alert("Please select a day.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workingHoursMap = {};
    Object.keys(formData.working_hours).forEach((day) => {
      const { from, to, isClosed } = formData.working_hours[day];
      workingHoursMap[day] = isClosed ? "Closed" : `${from}AM - ${to}PM`;
    });

    console.log(workingHoursMap);
    // formData.working_hours = workingHoursMap;

    const formDataToSubmit = {};

    // Loop through the keys of formData to build the JSON object
    Object.keys(formData).forEach((key) => {
      if (key === "business_logo" && formData[key]) {
        formDataToSubmit[key] = formData[key];
      } else if (key === "business_images" && formData[key].length > 0) {
        formDataToSubmit[key] = formData[key]; // Assign array of images directly
      } else if (key === "working_hours") {
        formDataToSubmit[key] = workingHoursMap; // Assuming workingHoursMap is already structured as needed
      } else {
        formDataToSubmit[key] = formData[key]; // For all other fields
      }
    });

    // Now formDataToSubmit is a JSON object that can be used to send as a JSON payload

    try {
      const res = await axios.post(
        "http://localhost:8080/business/create",
        formDataToSubmit
      );
      if (res.status === 201) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(
        "Error creating business",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
   
    <div className={styles.container}>
      {!isSubmitted ? (
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2 className={styles.heading}>Create New Business</h2>

          <div className={styles.inputGroup}>
            <label htmlFor="business_logo">Business Logo (Max 500KB)</label>
            <input
              type="file"
              name="business_logo"
              onChange={handleLogoUpload}
            />
            {errors.logo && <p className={styles.error}>{errors.logo}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="business_name">Business Name</label>
            <div className={styles.inputWrapper}>
              <FontAwesomeIcon icon={faBuilding} className={styles.icon} />
              <input
                type="text"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              value={categoryInput}
              onChange={handleCategoryInput}
              placeholder="Start typing to search categories"
            />
            <ul className={styles.suggestionsList}>
              {categorySuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleAddCategory(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
            <ul className={styles.categoryList}>
              {formData.category.map((cat, index) => (
                <li key={index}>{cat}</li>
              ))}
            </ul>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="location">Location</label>
            <div className={styles.inputWrapper}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="contact_number">Contact Number</label>
            <div className={styles.inputWrapper}>
              <FontAwesomeIcon icon={faPhone} className={styles.icon} />
              <input
                type="tel"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrapper}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="website">Website</label>
            <div className={styles.inputWrapper}>
              <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="business_images">
              Business Images (Max 500KB each)
            </label>
            <input
              type="file"
              name="business_images"
              onChange={handleImageUpload}
              multiple
            />
            {errors.images && <p className={styles.error}>{errors.images}</p>}
          </div>

          <div className={styles.workingHoursContainer}>
            <h3>Working Hours</h3>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              required
            >
              <option value="">Select a day</option>
              {Object.keys(formData.working_hours).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>

            {selectedDay && (
              <div className={styles.hoursInputs}>
                <input
                  type="time"
                  placeholder="From"
                  value={formData.working_hours[selectedDay].from}
                  onChange={(e) =>
                    handleWorkingHoursChange("from", e.target.value)
                  }
                />
                <input
                  type="time"
                  placeholder="To"
                  value={formData.working_hours[selectedDay].to}
                  onChange={(e) =>
                    handleWorkingHoursChange("to", e.target.value)
                  }
                />
                <button type="button" onClick={handleAddWorkingHours}>
                  Add Working Hours
                </button>
              </div>
            )}

            {addedDays.length > 0 && (
              <ul className={styles.addedDays}>
                {addedDays.map((day) => (
                  <li key={day}>
                    {day}:{" "}
                    {formData.working_hours[day].isClosed
                      ? "Closed"
                      : `${formData.working_hours[day].from}AM - ${formData.working_hours[day].to}PM`}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Create Business
          </button>
        </form>
      ) : (
        <div className={styles.successMessage}>
          <h2>Business Created Successfully!</h2>
          <p>Your business has been created. Thank you!</p>
          <button
            className={styles.submitButton}
            onClick={() => navigate("/business-dashboard")}
          >
            Go to Business Dashboard
          </button>
        </div>
      )}
    </div>
    </>
   
  );
  
};

export default CreateBusiness;
