const mongoose = require('mongoose');
const { Schema } = mongoose;

const timeSlotSchema = new Schema({
  start_time: {
    type: String,
    required: [true, 'Start time is required']
  },
  end_time: {
    type: String,
    required: [true, 'End time is required']
  },
  is_booked: {
    type: Boolean,
    default: false
  }
});

// Method to validate time slots
timeSlotSchema.methods.isValid = function() {
  const start = new Date(`1970-01-01T${this.start_time}`);
  const end = new Date(`1970-01-01T${this.end_time}`);
  
  // Check if start is before end
  if (start >= end) {
    return false; // Invalid time slot
  }
  
  return true; // Valid time slot
};

const availabilitySchema = new Schema({
  service_id: {
    type: Schema.Types.ObjectId,
    ref: 'Service', // Reference to the Service model
    required: [true, 'Service ID is required']
  },
  available_date: {
    type: Date,
    required: [true, 'Available date is required']
  },
  available_time_slots: [timeSlotSchema], // Array of time slots
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to validate all time slots
availabilitySchema.pre('save', function(next) {
  const { available_time_slots } = this;

  for (const slot of available_time_slots) {
    if (!slot.isValid()) {
      return next(new Error('Invalid time slot: start time must be before end time.'));
    }

    // Additional logic to check for overlaps can go here
  }
  
  next();
});

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;
