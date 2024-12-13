const express = require("express");
const router = express.Router();
const Service = require("../Model/ServicesModel");

// Create a new service
router.post("/create", async (req, res) => {
  const {
    business_id,
    service_name,
    description,
    price,
    duration,
    available_days,
    discount_percentage,
    service_category,
  } = req.body;
  console.log("id" + req.body.business_id); // Log the business ID received


  try {
    const newService = new Service({
      business_id,
      service_name,
      description,
      price,
      duration,
      available_days,
      discount_percentage,
      service_category,
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all services
router.get("/allservices", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/allserviceslist", async (req, res) => {
  try {
    const services = await Service.find()
      .populate("business_id", "business_name average_rating") // Populate business_name field
      .exec();

    const filteredServices = services.filter(
      (service) => service.business_id !== null
    );
    res.status(200).json(filteredServices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get service by ID
router.get("/service/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update service
router.put("/update/:id", async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedService)
      return res.status(404).json({ message: "Service not found" });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete service
router.delete("/:id", async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndRemove(req.params.id);
    if (!deletedService)
      return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get services by business ID
router.get("/business/:businessId", async (req, res) => {
  try {
    const services = await Service.find({ business_id: req.params.businessId });
    if (!services.length)
      return res
        .status(404)
        .json({ message: "No services found for this business" });
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Search services
router.get("/search", async (req, res) => {
  const { name, category } = req.query;
  try {
    const query = {};
    if (name) query.service_name = new RegExp(name, "i"); // case-insensitive search
    if (category) query.service_category = category;

    const services = await Service.find(query);
    if (!services.length)
      return res
        .status(404)
        .json({ message: "No services found matching your criteria" });
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get services by availability status
// Get services by availability for a specific day
router.get("/availability/:day", async (req, res) => {
  const day =
    req.params.day.charAt(0).toUpperCase() +
    req.params.day.slice(1).toLowerCase(); // Capitalize the first letter

  try {
    const services = await Service.find({
      [`available_days.${day}`]: { $exists: true, $ne: null }, // Check if the day exists and is not null
    });

    if (!services.length)
      return res
        .status(404)
        .json({ message: "No services found available on this day" });
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
