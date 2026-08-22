const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    interest: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "instructor"],
      default: "user",
    },

    photo: {
      type: String, // base64 string or image URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
