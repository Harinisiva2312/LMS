import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import courseData from "../data/courseData";
import { useNavigate } from "react-router-dom";

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [tab, setTab] = useState("pending");
  const [section, setSection] = useState("certificates");
  const [search, setSearch] = useState("");

  const [studentSearch, setStudentSearch] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    loadCertificates();
    loadCourses();
    loadStudents();

  }, []);

  /* ---------------- LOAD CERTIFICATES ---------------- */

  const loadCertificates = async () => {

    try {

      setLoading(true);

      const p = await fetch(
        "https://lms-xy4t.onrender.com/api/certificates/pending"
      );

      const pendingData = await p.json();

      const a = await fetch(
        "https://lms-xy4t.onrender.com/api/certificates/approved"
      );

      const approvedData = await a.json();

      setPending(pendingData || []);
      setApproved(approvedData || []);

    } catch (err) {

      console.error("Certificate loading error:", err);

    } finally {

      setLoading(false);

    }

  };

  /* ---------------- LOAD COURSES ---------------- */

  const loadCourses = () => {

    try {

      setCourses(courseData);

    } catch (err) {

      console.error("Courses load error:", err);

    }

  };

  /* ---------------- LOAD STUDENTS ---------------- */

  const loadStudents = async () => {

    try {

      const res = await fetch(
        "https://lms-xy4t.onrender.com/api/users/students"
      );

      const data = await res.json();

      setStudents(data || []);

    } catch (err) {

      console.error("Students load error:", err);

    }

  };

  /* ---------------- APPROVE CERTIFICATE ---------------- */

  const approve = async (id) => {

    try {

      await fetch(
        `https://lms-xy4t.onrender.com/api/certificates/approve/${id}`,
        { method: "PUT" }
      );

      loadCertificates();

    } catch (err) {

      console.error("Approve error:", err);

    }

  };

  /* ---------------- REJECT CERTIFICATE ---------------- */

  const reject = async (id) => {

    try {

      await fetch(
        `https://lms-xy4t.onrender.com/api/certificates/reject/${id}`,
        { method: "PUT" }
      );

      loadCertificates();

    } catch (err) {

      console.error("Reject error:", err);

    }

  };

  const filteredData =
    tab === "pending" ? pending : approved;

  const results = filteredData.filter(r =>
    r.userEmail?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredStudents = students.filter(s =>
    s.name?.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.email?.toLowerCase().includes(studentSearch.toLowerCase())
  );

  /* ---------- GET COURSE TITLE ---------- */

  const getCourseTitle = (courseId) => {

    const course =
      courses.find(c => String(c.id) === String(courseId));

    return course ? course.title : courseId;

  };

  return (

<div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white">

<div className="flex flex-1">

{/* ---------------- SIDEBAR ---------------- */}

<aside className="w-64 bg-black border-r border-[#2a2a2a] p-6">

<h2 className="text-2xl font-bold text-[#c9a46a] mb-10">
SkillWave
</h2>

<nav className="space-y-4">

<SidebarBtn
label="Certificates"
active={section === "certificates"}
onClick={() => setSection("certificates")}
/>

<SidebarBtn
label="Courses"
active={section === "courses"}
onClick={() => setSection("courses")}
/>

<SidebarBtn
label="Students"
active={section === "students"}
onClick={() => setSection("students")}
/>

</nav>

</aside>


{/* ---------------- MAIN ---------------- */}

<main className="flex-1 p-10">

<h1 className="text-3xl font-bold mb-8">
Instructor Dashboard
</h1>


{/* ---------------- COURSES SECTION ---------------- */}

{section === "courses" && (

<div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-6">

<div className="flex justify-between items-center mb-6">

<h2 className="text-xl text-[#c9a46a] font-semibold">
Courses
</h2>

<button
onClick={() => navigate("/create-course")}
className="bg-[#c9a46a] text-black px-4 py-2 rounded hover:scale-105 transition"
>
+ Create Course
</button>

</div>

<table className="w-full">

<thead>

<tr className="border-b border-[#2a2a2a] text-gray-400">

<th className="py-3 text-left">Course</th>
<th className="text-left">Units</th>
<th className="text-left">Lessons</th>

</tr>

</thead>

<tbody>

{courses.map(course => (

<tr key={course.id} className="border-b border-[#2a2a2a]">

<td className="py-4 flex items-center gap-4">

<img
src={course.units?.[0]?.lessons?.[0]?.thumbnail}
alt={course.title}
className="w-16 h-10 object-cover rounded"
/>

{course.title}

</td>

<td>
{course.units?.length || 0}
</td>

<td>
{course.units?.reduce(
(acc, u) => acc + (u.lessons?.length || 0),
0
)}
</td>

</tr>

))}

</tbody>

</table>

</div>

)}


{/* ---------------- STUDENTS SECTION ---------------- */}

{section === "students" && (

<div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-6">

<h2 className="text-xl text-[#c9a46a] font-semibold mb-4">
Students
</h2>

<input
type="text"
placeholder="Search student..."
value={studentSearch}
onChange={(e) => setStudentSearch(e.target.value)}
className="w-full mb-6 p-3 rounded bg-[#161616] border border-[#2a2a2a]"
/>

<table className="w-full">

<thead>

<tr className="border-b border-[#2a2a2a] text-gray-400">

<th>Name</th>
<th>Email</th>

</tr>

</thead>

<tbody>

{filteredStudents.map(student => (

<tr key={student._id} className="border-b border-[#2a2a2a]">

<td className="py-3">{student.name}</td>
<td>{student.email}</td>

</tr>

))}

</tbody>

</table>

</div>

)}


{/* ---------------- CERTIFICATES SECTION ---------------- */}

{section === "certificates" && (

<>

<div className="grid grid-cols-3 gap-6 mb-6">

<Stat title="Pending" value={pending.length} />
<Stat title="Approved" value={approved.length} />
<Stat title="Total" value={pending.length + approved.length} />

</div>

<div className="flex gap-4 mb-6">

<button
onClick={() => setTab("pending")}
className={`px-4 py-2 rounded ${
tab === "pending"
? "bg-[#c9a46a] text-black"
: "bg-[#161616]"
}`}
>
Pending
</button>

<button
onClick={() => setTab("approved")}
className={`px-4 py-2 rounded ${
tab === "approved"
? "bg-[#c9a46a] text-black"
: "bg-[#161616]"
}`}
>
Approved
</button>

</div>

<input
type="text"
placeholder="Search student email..."
value={search}
onChange={(e) => setSearch(e.target.value)}
className="w-full mb-6 p-3 rounded bg-[#161616] border border-[#2a2a2a]"
/>

<div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-6">

{loading ? (

<p>Loading certificates...</p>

) : results.length === 0 ? (

<p className="text-gray-400">No certificate requests</p>

) : (

<table className="w-full">

<thead>

<tr className="border-b border-[#2a2a2a] text-gray-400">

<th className="py-3 text-left">Student</th>
<th>Course</th>
<th>Date</th>
{tab === "pending" && <th>Action</th>}

</tr>

</thead>

<tbody>

{results.map(r => (

<tr key={r._id} className="border-b border-[#2a2a2a]">

<td className="py-3">{r.userEmail}</td>

<td>{getCourseTitle(r.courseId)}</td>

<td>{new Date(r.createdAt).toLocaleDateString()}</td>

{tab === "pending" && (

<td className="flex gap-3 py-3">

<button
onClick={() => approve(r._id)}
className="bg-green-600 px-3 py-1 rounded"
>
Approve
</button>

<button
onClick={() => reject(r._id)}
className="bg-red-600 px-3 py-1 rounded"
>
Reject
</button>

</td>

)}

</tr>

))}

</tbody>

</table>

)}

</div>

</>

)}

</main>

</div>

<Footer/>

</div>

  );

}

/* ---------------- SIDEBAR BUTTON ---------------- */

function SidebarBtn({ label, active, onClick }) {

return (

<p
onClick={onClick}
className={`cursor-pointer px-3 py-2 rounded ${
active
? "bg-[#c9a46a] text-black"
: "hover:bg-[#161616]"
}`}
>
{label}
</p>

);

}

/* ---------------- STAT CARD ---------------- */

function Stat({ title, value }) {

return (

<div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-5">

<p className="text-gray-400">{title}</p>

<h2 className="text-3xl font-bold text-[#c9a46a] mt-2">
{value}
</h2>

</div>

);

}