const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending", // pending | approved
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Certificate", CertificateSchema);
