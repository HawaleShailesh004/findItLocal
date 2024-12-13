const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [2, "First name must be at least 2 characters long"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: [2, "Last name must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  phone_number: {
    type: String,
    required: [true, "Phone number is required"],
    match: [
      /^\d{10}$/,
      "Please enter a valid phone number with exactly 10 digits",
    ],
    
  },
  address: {
    line_1: { type: String, required: [true, "Address line 1 is required"] },
    line_2: { type: String },
    city: { type: String, required: [true, "City is required"] },
    state: { type: String, required: [true, "State is required"] },
    postal_code: {
      type: String,
      required: [true, "Postal code is required"],
      match: [
        /^\d{6}$/,
        "Please enter a valid Postal Code with 6 digits",
      ],
    },
  },
  role: {
    type: String,
    enum: ["customer", "business_owner", "admin"],
    default: "customer",
    required: [true, "Role is required"],
  },
  profile_picture: { type: String, default: "" },
  is_verified: { type: Boolean, default: false },
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_login: { type: Date },
});


const User = mongoose.model("User", userSchema);

module.exports = User;
