const express = require('express');
const router = express.Router();
const Review = require('../Model/ReviewModel'); // Make sure the path is correct for your project

// Route: Create a new review
router.post('/', async (req, res) => {
  const { user_id, business_id, service_id, rating, review_text } = req.body;

  try {
    const review = new Review({
      user_id,
      business_id,
      service_id,
      rating,
      review_text,
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route: Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('user_id business_id service_id');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Get a review by ID
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('user_id business_id service_id');
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Get reviews by User ID
router.get('/user/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ user_id: req.params.userId }).populate('business_id service_id');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Get reviews by Business ID
router.get('/business/:businessId', async (req, res) => {
  try {
    const reviews = await Review.find({ business_id: req.params.businessId }).populate('user_id service_id');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Update a review by ID
router.put('/:id', async (req, res) => {
  const { rating, review_text } = req.body;
  
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, review_text },
      { new: true, runValidators: true }
    );
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route: Delete a review by ID
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
