const mongoose = require('mongoose');
const { Schema } = mongoose;

const discountSchema = new Schema({
  business_id: {
    type: Schema.Types.ObjectId,
    ref: 'Business', // Reference to the Business model
    required: [true, 'Business ID is required']
  },
  service_id: {
    type: Schema.Types.ObjectId,
    ref: 'Service', // Reference to the Business model
    required: [true, 'Service ID is required']
  },
  discount_code: {
    type: String,
    required: [true, 'Discount code is required'],
    unique: true // Ensure discount codes are unique
  },
  discount_percentage: {
    type: Number,
    required: [true, 'Discount percentage is required'],
    min: [0, 'Discount percentage cannot be negative'],
    max: [100, 'Discount percentage cannot exceed 100']
  },
  valid_from: {
    type: Date,
    required: [true, 'Valid from date is required']
  },
  valid_until: {
    type: Date,
    required: [true, 'Valid until date is required']
  },
  is_active: {
    type: Boolean,
    default: true // Assume discounts are active by default
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
