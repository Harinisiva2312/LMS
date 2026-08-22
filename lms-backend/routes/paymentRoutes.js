const express = require("express");
const Payment = require("../models/Payment");

const router = express.Router();

/* ---------- SAVE PAYMENT ---------- */

router.post("/create", async (req, res) => {

  try {

    const { userEmail, courseId, amount } = req.body;

    const payment = new Payment({
      userEmail,
      courseId,
      amount
    });

    await payment.save();

    res.json({
      success: true,
      payment
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false
    });

  }

});


/* ---------- GET USER PAYMENTS ---------- */

router.get("/user/:email", async (req, res) => {

  try {

    const payments = await Payment.find({
      userEmail: req.params.email
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      payments
    });

  } catch (error) {

    res.status(500).json({
      success: false
    });

  }

});


/* ---------- GET ALL PAYMENTS (ADMIN) ---------- */

router.get("/", async (req, res) => {

  try {

    const payments = await Payment.find()
      .sort({ createdAt: -1 });

    res.json(payments);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false
    });

  }

});


module.exports = router;