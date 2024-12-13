const express = require('express');
const router = express.Router();
const Discount = require('../Model/DiscountModel'); // Ensure the correct path

// Route: Create a new discount
router.post('/', async (req, res) => {
  const { business_id, service_id, discount_code, discount_percentage, valid_from, valid_until } = req.body;

  try {
    const discount = new Discount({
      business_id,
      service_id,
      discount_code,
      discount_percentage,
      valid_from,
      valid_until,
    });

    await discount.save();
    res.status(201).json(discount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route: Get all discounts
router.get('/', async (req, res) => {
  try {
    const discounts = await Discount.find().populate('business_id service_id');
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Get a discount by ID
router.get('/:id', async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id).populate('business_id service_id');
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.json(discount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Get discounts by Business ID
router.get('/business/:businessId', async (req, res) => {
  try {
    const discounts = await Discount.find({ business_id: req.params.businessId }).populate('service_id');
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Get discounts by Service ID
router.get('/service/:serviceId', async (req, res) => {
  try {
    const discounts = await Discount.find({ service_id: req.params.serviceId }).populate('business_id');
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Update a discount by ID
router.put('/:id', async (req, res) => {
  const { discount_code, discount_percentage, valid_from, valid_until, is_active } = req.body;

  try {
    const discount = await Discount.findByIdAndUpdate(
      req.params.id,
      { discount_code, discount_percentage, valid_from, valid_until, is_active },
      { new: true, runValidators: true }
    );
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.json(discount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route: Delete a discount by ID
router.delete('/:id', async (req, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.json({ message: 'Discount deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
