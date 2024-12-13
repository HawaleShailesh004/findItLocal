const mongoose = require('mongoose');
const { Schema } = mongoose;

const issueSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: [true, 'User ID is required']
  },
  issue_type: {
    type: String,
    enum: ['Booking issue', 'Payment issue', 'Service issue', 'Other'], // Customize categories as needed
    required: [true, 'Issue type is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  status: {
    type: String,
    enum: ['open', 'in progress', 'resolved'],
    default: 'open'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  resolved_at: {
    type: Date,
    default: null // Initially set to null until resolved
  }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
