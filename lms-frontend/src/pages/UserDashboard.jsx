import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import courseData from "../data/courseData";
import Footer from "../components/Footer";

export default function UserDashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [completedCoursesLS, setCompletedCoursesLS] = useState([]);

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);

    /* FETCH ENROLLMENTS FROM DATABASE */

    fetch(`https://lms-xy4t.onrender.com/api/dashboard/${storedUser.email}`)
      .then(res => res.json())
      .then(data => {

  const ids = data.map(e => e.courseId);

  setEnrolledIds(ids);

  console.log("Enrolled IDs:", ids);

});

    const prog =
      JSON.parse(localStorage.getItem("courseProgress")) || {};

    setProgressData(prog);

    const completedLS =
      JSON.parse(localStorage.getItem("completedCourses")) || [];

    setCompletedCoursesLS(completedLS);

  }, [navigate]);

  if (!user) return null;


  /* MATCH BOTH id AND _id */

  const enrolledCourses = courseData.filter(course =>
  enrolledIds.includes(course.id)
);


  const inProgress = [];
  const completed = [];

  const quizPassed =
    JSON.parse(localStorage.getItem("quizPassed")) || {};


  enrolledCourses.forEach(course => {

    const cid = course._id || course.id;

    const units = progressData[cid]?.units || {};

    const percent = Math.round(
      (Object.keys(units).length / course.units.length) * 100
    );

    if (
      percent === 100 ||
      completedCoursesLS.includes(String(cid)) ||
      quizPassed[cid]
    ) {

      completed.push(course);

    } else {

      inProgress.push({ ...course, percent });

    }

  });


  const handleLogout = () => {

    localStorage.clear();
    navigate("/login");

  };


  return (

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="flex flex-col min-h-screen bg-[#0e0e0e] text-white"
>

<div className="flex flex-1">

{/* Sidebar */}

<aside className="w-72 bg-black border-r border-[#2a2a2a] flex flex-col items-center p-6">

<img
src={user.photo}
alt="profile"
className="w-24 h-24 rounded-full border-4 border-[#c9a46a] object-cover"
/>

<h2 className="mt-4 font-semibold text-lg">
{user.name}
</h2>

<p className="text-gray-400 text-sm mb-8">
{user.email}
</p>

<nav className="w-full space-y-3">

<SidebarBtn text="🏠 Dashboard" />

<SidebarBtn text="📚 My Courses" />

<SidebarBtn text="🎓 Certificates"
onClick={()=>navigate("/certificates")}
/>

<SidebarBtn text="🔎 Browse Courses"
onClick={()=>navigate("/courses")}
/>

</nav>

<button
onClick={handleLogout}
className="mt-auto w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg"
>
Logout
</button>

</aside>


{/* Main */}

<main className="flex-1 p-8 overflow-y-auto">

<h1 className="text-2xl font-bold mb-6">
Welcome back, {user.name} 👋
</h1>


{/* Stats */}

<div className="grid grid-cols-4 gap-6 mb-6">

<Stat title="Enrolled" value={enrolledCourses.length}/>

<Stat title="In Progress" value={inProgress.length}/>

<Stat title="Completed" value={completed.length}/>

<Stat title="Certificates" value={completed.length}/>

</div>


{/* Activity + Todo */}

<div className="grid grid-cols-2 gap-6 mb-6">

<Card title="Learning Activity">

<p className="text-gray-300 text-sm">
📚 Courses Enrolled: {enrolledCourses.length}
</p>

<p className="text-gray-300 text-sm">
🔥 Courses Completed: {completed.length}
</p>

<p className="text-gray-300 text-sm">
🎓 Certificates Earned: {completed.length}
</p>

</Card>


<Card title="To-Do">

{inProgress.length === 0 ? (

<p className="text-gray-400 text-sm">
No pending tasks
</p>

) : (

inProgress.slice(0,1).map(course => {

const cid = course._id || course.id;

return (

<div key={cid}>

<p className="text-gray-400 text-sm mb-1">
Resume Learning
</p>

<h3 className="mb-2">
{course.title}
</h3>

<button
onClick={()=>navigate(`/learn/${cid}`)}
className="bg-[#c9a46a] text-black px-3 py-1 rounded"
>
Continue
</button>

</div>

);

})

)}

</Card>

</div>


{/* Courses */}

<div className="grid grid-cols-2 gap-6">

<CourseSection
title="Continue Learning"
courses={inProgress}
navigate={navigate}
showProgress
/>

<CourseSection
title="Completed Courses"
courses={completed}
navigate={navigate}
/>

</div>

</main>

</div>

<Footer/>

</motion.div>

  );

}


function SidebarBtn({ text, onClick }) {

return (

<button
onClick={onClick}
className="w-full text-left px-4 py-3 rounded-lg bg-[#161616] hover:bg-[#c9a46a] hover:text-black transition"
>
{text}
</button>

);

}


function Stat({ title, value }) {

return (

<div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-5">

<p className="text-gray-400 text-sm">
{title}
</p>

<h3 className="text-3xl font-bold text-[#c9a46a] mt-2">
{value}
</h3>

</div>

);

}


function Card({ title, children }) {

return (

<div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-5">

<h2 className="font-semibold mb-3 text-[#c9a46a]">
{title}
</h2>

{children}

</div>

);

}


function CourseSection({ title, courses, navigate, showProgress }) {

return (

<div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-5">

<h2 className="text-[#c9a46a] font-semibold mb-4">
{title}
</h2>

{courses.length === 0 ? (

<p className="text-gray-400 text-sm">
No courses
</p>

) : (

courses.slice(0,1).map(course => {

const cid = course._id || course.id;

return (

<div key={cid}>

<img
src={course.units?.[0]?.lessons?.[0]?.thumbnail}
alt={course.title}
className="w-full h-32 object-cover rounded"
/>

<h3 className="mt-2">
{course.title}
</h3>

{showProgress && (

<div className="w-full bg-gray-700 h-2 rounded mt-2">

<div
className="bg-[#c9a46a] h-2 rounded"
style={{ width: `${course.percent}%` }}
/>

</div>

)}

<button
onClick={()=>navigate(`/learn/${cid}`)}
className="mt-3 bg-[#c9a46a] text-black px-3 py-1 rounded"
>
Continue
</button>

</div>

);

})

)}

</div>

);

}