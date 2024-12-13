const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Business = require("../Model/BusinessModel"); // Adjust the path as needed

const { verifyToken, verifyAdmin } = require("../MiddleWares/authMiddleware");

// Create a new business
router.post("/create", async (req, res) => {
  const {
    owner_id,
    business_name,
    description,
    category,
    location,
    contact_number,
    email,
    website,
    working_hours,
    business_logo,
    business_images,
  } = req.body;

  const newBusiness = new Business({
    owner_id,
    business_name,
    description,
    category,
    location,
    contact_number,
    email,
    website,
    working_hours,
    business_logo,
    business_images,
  });

  try {
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/allbusinesses", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single business by ID
router.get("/business/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const business = await Business.findById(id);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a business by ID
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const business = await Business.findById(id);

    // Check if the business exists
    if (!business) {
      return res.status(404).json({ message: "Business not found." });
    }

    // Check if the requester is the owner
    if (business.owner_id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Access denied. You are not the owner." });
    }

    // Update the business
    Object.assign(business, updates);
    const updatedBusiness = await business.save();

    res.status(200).json(updatedBusiness);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a business by ID
// Delete a business by ID
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the business exists and delete it
    const business = await Business.findByIdAndDelete(id);

    // Check if the business was found and deleted
    if (!business) {
      return res.status(404).json({ message: "Business not found." });
    }

    // Check if the requester is the owner
    if (business.owner_id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Access denied. You are not the owner." });
    }

    res.status(200).json({ message: "Business deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get businesses by category
router.get("/category/:categories", async (req, res) => {
  try {
    // Split the categories string into an array
    const categories = req.params.categories.split(",");

    // Find businesses where the category matches any of the provided categories
    const businesses = await Business.find({ category: { $in: categories } });

    // Return 200 with an empty array if no businesses are found
    if (!businesses.length) {
      return res.status(200).json({ message: "No businesses found in these categories", businesses: [] });
    }

    res.status(200).json(businesses);
  } catch (error) {
    // Handle any server errors with a 500 status code
    res.status(500).json({ message: error.message });
  }
});


// Search businesses
router.get("/search", async (req, res) => {
  const { name, location } = req.query;
  console.log(name, location);
  try {
    const query = {};
    if (name) query.business_name = new RegExp(name, "i"); // Case-insensitive search
    if (location) query.location = new RegExp(location, "i");

    const businesses = await Business.find(query);

    if (!businesses.length) {
      return res
        .status(404)
        .json({ message: "No businesses found matching your criteria" });
    }

    res.status(200).json({
      message: "Businesses found",
      data: businesses,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get businesses by owner ID
router.get("/owner/:ownerId", async (req, res) => {
  try {
    const businesses = await Business.find({ owner_id: req.params.ownerId });
    if (!businesses.length)
      return res
        .status(404)
        .json({ message: "No businesses found for this owner" });
    res.status(200).json(businesses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
