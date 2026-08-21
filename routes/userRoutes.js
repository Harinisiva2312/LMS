const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* ---------- GET ALL USERS (ADMIN) ---------- */

router.get("/", async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

});


/* ---------- GET STUDENTS ONLY ---------- */

router.get("/students", async (req, res) => {

  try {

    const students = await User.find({
      role: "user"
    }).select("-password");

    res.json(students);

  } catch (error) {

    res.status(500).json({
      success: false
    });

  }

});

module.exports = router;