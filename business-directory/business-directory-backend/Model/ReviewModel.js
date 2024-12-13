const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: [true, 'User ID is required']
  },
  business_id: {
    type: Schema.Types.ObjectId,
    ref: 'Business', // Reference to the Business model
    required: [true, 'Business ID is required']
  },
  service_id: {
    type: Schema.Types.ObjectId,
    ref: 'Service', // Reference to the Service model
    required: [true, 'Service ID is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  review_text: {
    type: String,
    required: [true, 'Review text is required'],
    minlength: [2, 'Review text must be at least 2 characters long']
  },
  review_date: {
    type: Date,
    required: [true, 'Review date is required'],
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
