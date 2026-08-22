const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

router.get("/dashboard/:instructorId", async (req, res) => {
  try {
    const { instructorId } = req.params;

    const courses = await Course.find({ instructorId });

    let totalStudents = 0;
    let totalRevenue = 0;

    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        const count = await Enrollment.countDocuments({
          courseId: course._id,
        });

        totalStudents += count;
        totalRevenue += count * (course.price || 0);

        return {
          ...course._doc,
          studentsEnrolled: count,
        };
      })
    );

    res.json({
      totalCourses: courses.length,
      totalStudents,
      totalRevenue,
      courses: coursesWithStats,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
