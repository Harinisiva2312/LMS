const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");

/* ENROLL COURSE */

router.post("/", async (req, res) => {

  try {

    const { userEmail, courseId } = req.body;

    const existing = await Enrollment.findOne({
      userEmail,
      courseId
    });

    if (existing) {
      return res.json({ message: "Already enrolled" });
    }

    const enrollment = new Enrollment({
      userEmail,
      courseId
    });

    await enrollment.save();

    res.json({ message: "Enrollment successful" });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Server error" });

  }

});


/* GET USER ENROLLMENTS */

router.get("/:email", async (req, res) => {

  try {

    const enrollments = await Enrollment.find({
      userEmail: req.params.email
    });

    res.json(enrollments);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Server error" });

  }

});

module.exports = router;