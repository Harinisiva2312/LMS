const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");

/* Request certificate */
router.post("/", async (req, res) => {
  try {
    const { userEmail, courseId } = req.body;

    const existing = await Certificate.findOne({
      userEmail,
      courseId,
    });

    if (existing) {
      return res.json({ message: "Already requested" });
    }

    const certificate = new Certificate({
      userEmail,
      courseId,
      status: "pending",
    });

    await certificate.save();

    res.json({ message: "Certificate requested" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* Get pending certificates */
router.get("/pending", async (req, res) => {
  try {
    const certs = await Certificate.find({ status: "pending" });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* Approve certificate */
router.put("/approve/:id", async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json(cert);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
/* Get approved certificates */
router.get("/approved", async (req, res) => {
  try {
    const certs = await Certificate.find({ status: "approved" });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* Get certificates for specific user */
router.get("/user/:email", async (req, res) => {
  try {
    const certs = await Certificate.find({
      userEmail: req.params.email,
      status: "approved",
    });

    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
