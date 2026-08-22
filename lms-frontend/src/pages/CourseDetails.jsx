import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import courseData from "../data/courseData";

export default function CourseDetails() {

  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  /* LOAD COURSE FROM DATABASE FIRST */

  useEffect(() => {

    const loadCourse = async () => {

      try {

        const res = await fetch("http://localhost:5000/api/courses");
        const dbCourses = await res.json();

        /* FIND COURSE FROM DATABASE */

        const dbCourse = dbCourses.find(
          (c) => String(c._id) === String(courseId)
        );

        if (dbCourse) {
          setCourse(dbCourse);
          return;
        }

        /* FALLBACK TO LOCAL COURSE DATA */

        const localCourse = courseData.find(
          (c) => String(c.id) === String(courseId)
        );

        setCourse(localCourse);

      } catch (err) {

        console.error("Course load error:", err);

        const localCourse = courseData.find(
          (c) => String(c.id) === String(courseId)
        );

        setCourse(localCourse);

      }

    };

    loadCourse();

  }, [courseId]);

  if (!course) return <div className="p-10">Course not found</div>;


  const handleStartLearning = async () => {

    console.log("Start Learning clicked");

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    /* LOGIN CHECK */

    if (!user) {

      console.log("User not logged in → redirect login");

      navigate("/login", { state: { from: `/courses/${courseId}` } });

      return;

    }

    /* PAID COURSE → PAYMENT */

    if (course.isPaid) {

      console.log("Paid course → payment page");

      navigate(`/payment/${courseId}`);

      return;

    }

    /* FREE COURSE → ENROLLMENT */

    try {

      console.log("Calling enrollment API...");

      const res = await fetch(
        "http://localhost:5000/api/enrollments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userEmail: user.email,
            courseId: course._id || course.id
          })
        }
      );

      console.log("API Response status:", res.status);

      if (!res.ok) {
        console.warn("Enrollment API failed, continuing anyway...");
      }

    } catch (err) {

      console.warn("Server not reachable, continuing anyway...");

    }

    /* NAVIGATE TO LEARNING */

    console.log("Navigating to learning page...");

    navigate(`/learn/${course._id || course.id}`);

  };


  return (

<div className="bg-[#f5f7fa] min-h-screen pt-24 pb-12">

<div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">

{/* LEFT */}

<div className="lg:col-span-2">

<h1 className="text-3xl font-semibold mb-2">
{course.title}
</h1>

<p className="text-gray-600 mb-4">
{course.description}
</p>

<h2 className="text-xl font-semibold mb-4">
Syllabus
</h2>

{course.units?.map((unit) => (

<div key={unit.id} className="bg-white p-4 rounded mb-4">

<h3 className="font-semibold mb-2">
{unit.unitTitle}
</h3>

{unit.lessons?.map((lesson) => (

<div
key={lesson.id}
className="flex justify-between text-sm border-b py-1"
>

<span>{lesson.title}</span>

<span>{lesson.duration}</span>

</div>

))}

</div>

))}

</div>


{/* RIGHT */}

<div className="bg-white rounded-xl shadow p-6 h-fit">

<img
src={course.units?.[0]?.lessons?.[0]?.thumbnail}
alt="thumb"
className="rounded mb-4"
/>

<p className="text-xl font-bold mb-3">

{course.isPaid ? `₹${course.price}` : "Free"}

</p>

<button
onClick={handleStartLearning}
className="w-full bg-[#c9a46a] text-black py-3 rounded font-medium hover:opacity-90"
>

{course.isPaid ? "Buy & Start Learning" : "Start Learning"}

</button>

</div>

</div>

</div>

  );

}