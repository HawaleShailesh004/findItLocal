const express = require('express');
const router = express.Router();
const Contact = require('../Model/ContactModel');

// Route for submitting the contact form
router.post('/contact-us', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required." });
    }

    // Create a new contact entry
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    // Save to database
    await newContact.save();
    res.status(201).json({ message: "Your message has been sent successfully." });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ message: "There was a problem submitting your message. Please try again later." });
  }
});

module.exports = router;
