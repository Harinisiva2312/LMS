const express = require("express");
const router = express.Router();
const Course = require("../models/Course");


/* ================= GET ALL COURSES ================= */

router.get("/", async (req, res) => {

  try {

    const courses = await Course.find();

    res.json(courses);

  } catch (err) {

    console.error("Error fetching courses:", err);

    res.status(500).json({
      error: "Server error"
    });

  }

});


/* ================= CREATE COURSE ================= */

router.post("/", async (req, res) => {

  try {

    const { title, description, price, instructorId } = req.body;

    const course = new Course({

      title,
      description,
      price,
      instructorId

    });

    await course.save();

    res.json({
      message: "Course created successfully",
      course
    });

  } catch (err) {

    console.error("Error creating course:", err);

    res.status(500).json({
      error: "Server error"
    });

  }

});


/* ================= GET SINGLE COURSE ================= */

router.get("/:id", async (req, res) => {

  try {

    const course = await Course.findById(req.params.id);

    if (!course) {

      return res.status(404).json({
        error: "Course not found"
      });

    }

    res.json(course);

  } catch (err) {

    res.status(500).json({
      error: "Server error"
    });

  }

});


/* ================= DELETE COURSE ================= */

router.delete("/:id", async (req, res) => {

  try {

    await Course.findByIdAndDelete(req.params.id);

    res.json({
      message: "Course deleted successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: "Server error"
    });

  }

});


module.exports = router;