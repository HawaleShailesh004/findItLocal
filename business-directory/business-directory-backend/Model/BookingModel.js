const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: [true, 'User ID is required']
  },
  service_id: {
    type: Schema.Types.ObjectId,
    ref: 'Service', // Reference to the Service model
    required: [true, 'Service ID is required']
  },
  business_id: {
    type: Schema.Types.ObjectId,
    ref: 'Business', // Reference to the Business model
    required: [true, 'Business ID is required']
  },
  booking_date: {
    type: Date,
    required: [true, 'Booking date is required'],
    default: Date.now
  },
  scheduled_date: {
    type: Date,
    required: [true, 'Scheduled date is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled', 'completed'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: ''
  },
  total_amount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  payment_status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  discount_code: {
    type: String,
    default: ''
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
