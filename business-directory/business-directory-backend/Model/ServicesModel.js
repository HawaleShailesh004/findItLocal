const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  business_id: {
    type: Schema.Types.ObjectId,
    ref: 'Business', // Reference to the Business model
    required: [true, 'Business ID is required']
  },
  service_name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    minlength: [3, 'Service name must be at least 3 characters long']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    minlength: [10, 'Description must be at least 10 characters long']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
  availability_status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available'
  },
  available_days: {
    type: Map,
    of: String,
    required: [true, 'Available days are required']
  },
  discount_percentage: {
    type: Number,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%'],
    default: 0
  },
  service_category: {
    type: String,
    enum: ['standard', 'premium', 'exclusive'],
    default: 'standard'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
