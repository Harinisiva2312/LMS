const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },

  courseId: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    default: "Demo Payment"
  },

  status: {
    type: String,
    default: "Success"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Payment", paymentSchema);