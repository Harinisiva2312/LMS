const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");

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