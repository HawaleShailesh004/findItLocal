const mongoose = require("mongoose");

// Define the category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure category names are unique
  },
  description: {
    type: String,
    required: true,
  },
  subcategories: [
    {
      // Array to hold references to subcategories
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to current date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set to current date
  },
});

// Middleware to update `updatedAt` before saving
categorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
