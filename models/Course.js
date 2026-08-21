const mongoose = require("mongoose");

/* ---------- LESSON SCHEMA ---------- */

const lessonSchema = new mongoose.Schema({
  id: String,
  title: String,
  duration: String,
  videoUrl: String,
  thumbnail: String,
  description: String,
  notes: String
});

/* ---------- UNIT SCHEMA ---------- */

const unitSchema = new mongoose.Schema({
  id: Number,
  unitTitle: String,
  lessons: [lessonSchema]
});

/* ---------- COURSE SCHEMA ---------- */

const courseSchema = new mongoose.Schema({

  /* Basic Info */

  title: {
    type: String,
    required: true
  },

  description: String,

  category: String,

  level: String,

  language: String,

  instructor: String,

  rating: {
    type: Number,
    default: 0
  },

  learners: {
    type: Number,
    default: 0
  },

  price: {
    type: Number,
    default: 0
  },

  isPaid: {
    type: Boolean,
    default: false
  },

  instructorId: String,

  studentsEnrolled: {
    type: Number,
    default: 0
  },

  /* Course Content */

  units: [unitSchema]

},
{ timestamps: true });

module.exports = mongoose.model("Course", courseSchema);