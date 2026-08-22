const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

/* ================= REGISTER ================= */

router.post("/register", async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      role,
      dob,
      phone,
      interest,
      photo
    } = req.body;

    /* ---------- VALIDATION ---------- */

    if (!name || !email || !password || !dob || !phone || !interest) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    /* ---------- CHECK EXISTING USER ---------- */

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    /* ---------- HASH PASSWORD ---------- */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* ---------- DEFAULT ROLE ---------- */

    const userRole = role || "user";

    /* ---------- AUTO AVATAR ---------- */

    const avatar =
      photo ||
      `https://ui-avatars.com/api/?name=${name}&background=3b82f6&color=fff`;

    /* ---------- CREATE USER ---------- */

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole,
      dob,
      phone,
      interest,
      photo: avatar
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo
      }
    });

  } catch (error) {

    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
});


/* ================= LOGIN ================= */

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    /* ---------- FIND USER ---------- */

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    /* ---------- CHECK PASSWORD ---------- */

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    /* ---------- LOGIN SUCCESS ---------- */

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo
      }
    });

  } catch (error) {

    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
});

module.exports = router;