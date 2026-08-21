const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const Payment = require("../models/Payment");
const Certificate = require("../models/Certificate");

router.get("/dashboard", async (req, res) => {
  try {

    const users = await User.countDocuments();
    const courses = await Course.countDocuments();
    const enrollments = await Enrollment.countDocuments();
    const payments = await Payment.countDocuments();
    const certificates = await Certificate.countDocuments();

    res.json({
      users,
      courses,
      enrollments,
      payments,
      certificates
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error"
    });

  }
});

module.exports = router;