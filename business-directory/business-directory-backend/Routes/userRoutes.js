const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../Model/UserModel");
const router = express.Router();
const { ObjectId } = mongoose.Types;
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const config = { secret: "Secret" }; // Change this to a secure secret in production

const { verifyToken, verifyAdmin } = require('../MiddleWares/authMiddleware');
router.post("/signup", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone_number,
    address,
    role,
  } = req.body;

  try {
    // Validate required fields
      // Validate fields
      if (!first_name) {
        console.log("First name is not provided");
      }
      if (!last_name) {
        console.log("Last name is not provided");
      }
      if (!email) {
        console.log("Email is not provided");
      }
      if (!password) {
        console.log("Password is not provided");
      }
      if (!phone_number) {
        console.log("Phone number is not provided");
      }
      if (!address) {
        console.log("Address is not provided");
      }
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !phone_number ||
      !address
    ) {
      console.log("ALL fields are Required")
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("UAE")
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone_number,
      address,
      role: role || "customer", // Default to customer if no role provided
    });

    const userinfo = await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: userinfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});



// User Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      config.secret
      // { expiresIn: "1h" }  Token expires in 1 hour
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user ID from token
router.get("/user-id", verifyToken, (req, res) => {
  // The user ID is available in req.user.id after verification
  console.log(req.user.id)
  res.json({ user_id: req.user.id });
});


router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from the results
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users (admin access)



router.get("/allusers", verifyAdmin, getAllUsers);

router.get("/:id", async (req, res) => {
  try {
    // Use await to properly handle the asynchronous operation
    const user = await User.findById(new ObjectId(req.params.id));

    if (user) {
      // If user is found, send the user data with status 200
      res.status(200).send(user);
    } else {
      // If user is not found, send a 404 status with message
      res.status(404).send("User Not Found");
    }
  } catch (error) {
    // Handle any errors (e.g., invalid ObjectId or database issues)
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userIdFromToken = req.user.id; // userId from JWT token

    // Validate the user ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    console.log(userIdFromToken);

    // Only allow if the user is updating their own profile or if they are an admin
    if (userIdFromToken === id || req.user.role === "admin") {
      const updatedData = req.body;

      // Validate that there is data to update
      if (Object.keys(updatedData).length === 0) {
        return res.status(400).json({ message: "No data provided for update" });
      }

      // Find the user by ID and update
      const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User updated successfully", user: updatedUser });
    } else {
      return res.status(403).json({
        message:
          "Access denied. You can only update your own profile or must be an admin.",
      });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const userId = req.params.id;

    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

router.put('/change-password', verifyToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        // Await the user retrieval
        const user = await User.findById(req.user.id);
        console.log(user);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect.' });
        }

        // Hash new password and save
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: 'Password changed successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user =  User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found.' });

        // Generate reset token
        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send email (you'll need to configure nodemailer)
        const transporter = nodemailer.createTransport(/* your SMTP settings */);
        const mailOptions = {
            to: user.email,
            subject: 'Password Reset',
            text: `Click the link to reset your password: http://localhost:8080/users/reset-password/${token}`
        };
        
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Password reset link sent to your email.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});


// Reset Password Route
router.post('/reset-password/:token', async (req, res) => {
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ message: 'Invalid or expired token.' });

        // Hash new password and save
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined; // Clear token
        user.resetPasswordExpires = undefined; // Clear expiration
        await user.save();

        res.json({ message: 'Password reset successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});


module.exports = router;
