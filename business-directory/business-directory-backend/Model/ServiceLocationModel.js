const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
  location_name: {
    type: String,
    required: [true, 'Location name is required']
  },
  postal_codes: {
    type: [String], // Array of strings for postal codes
    required: [true, 'Postal codes are required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
