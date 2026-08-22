const mongoose = require("mongoose");
require("dotenv").config();

const Course = require("./models/Course");

/* correct import */
const courseData = require("../lms-frontend/src/data/courseData").default;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

async function seedCourses(){

  try {

    await Course.deleteMany();

    const formattedCourses = courseData.map(course => ({
      title: course.title,
      description: course.description || "Course description",
      price: course.price || 0
    }));

    await Course.insertMany(formattedCourses);

    console.log("Courses inserted successfully");

    process.exit();

  } catch(err){

    console.error(err);

  }

}

seedCourses();