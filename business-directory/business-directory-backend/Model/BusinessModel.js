const mongoose = require("mongoose");
const { Schema } = mongoose;

const businessSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: [true, "Owner ID is required"],
  },
  business_name: {
    type: String,
    required: [true, "Business name is required"],
    trim: true,
    minlength: [2, "Business name must be at least 2 characters long"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [10, "Description must be at least 10 characters long"],
  },
  category: {
    type: [String],
    required: [true, "Category is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
  },
  contact_number: {
    type: String,
    required: [true, "Contact number is required"],
    match: [
      /^\+\d{1,15}$/,
      "Please enter a valid contact number with country code",
    ],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  website: {
    type: String,
    match: [
      /^https?:\/\/[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid website URL",
    ],
    default: "",
  },
  working_hours: {
    type: Map,
    of: String,
    required: [true, "Working hours are required"],
  },
  average_rating: {
    type: Number,
    min: [0, "Rating cannot be lower than 0"],
    max: [5, "Rating cannot be higher than 5"],
    default: 0,
  },
  total_reviews: {
    type: Number,
    default: 0,
  },
  business_logo: {
    type: String,
    default: "",
  },
  business_images: {
    type: [String],
    default: [],
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
