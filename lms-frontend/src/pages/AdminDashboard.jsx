import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import Footer from "../components/Footer";

export default function AdminDashboard() {

  const [section,setSection] = useState("dashboard");

  const [stats,setStats] = useState(null);
  const [users,setUsers] = useState([]);
  const [courses,setCourses] = useState([]);
  const [payments,setPayments] = useState([]);
  const [certificates,setCertificates] = useState([]);

  useEffect(()=>{

    loadDashboard();
    loadUsers();
    loadCourses();
    loadPayments();
    loadCertificates();

  },[]);

  /* ---------------- DASHBOARD ---------------- */

  const loadDashboard = async()=>{

    try{

      const res = await fetch("http://localhost:5000/api/admin/dashboard");
      const data = await res.json();

      setStats(data);

    }catch(err){

      console.log(err);

    }

  };


  /* ---------------- USERS ---------------- */

  const loadUsers = async()=>{

    try{

      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();

      setUsers(data || []);

    }catch(err){

      console.log(err);

    }

  };


  /* ---------------- COURSES ---------------- */

  const loadCourses = async()=>{

    try{

      const res = await fetch("http://localhost:5000/api/courses");
      const data = await res.json();

      setCourses(data || []);

    }catch(err){

      console.log(err);

    }

  };


  /* ---------------- PAYMENTS ---------------- */

  const loadPayments = async()=>{

    try{

      const res = await fetch("http://localhost:5000/api/payments");
      const data = await res.json();

      setPayments(data || []);

    }catch(err){

      console.log(err);

    }

  };


  /* ---------------- CERTIFICATES ---------------- */

  const loadCertificates = async()=>{

    try{

      const res = await fetch("http://localhost:5000/api/certificates/approved");
      const data = await res.json();

      setCertificates(data || []);

    }catch(err){

      console.log(err);

    }

  };


  if(!stats && section==="dashboard"){

    return(
      <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
        Loading Admin Dashboard...
      </div>
    )

  }


  const chartData = [
    {name:"Users",value:stats?.users || 0},
    {name:"Courses",value:stats?.courses || 0},
    {name:"Enrollments",value:stats?.enrollments || 0},
    {name:"Certificates",value:stats?.certificates || 0}
  ];


  const pieData = [
    {name:"Courses",value:stats?.courses || 0},
    {name:"Enrollments",value:stats?.enrollments || 0},
    {name:"Certificates",value:stats?.certificates || 0}
  ];

  const COLORS = ["#c9a46a","#3b82f6","#10b981","#ef4444"];


  return(

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="flex flex-col min-h-screen bg-[#0e0e0e] text-white"
>

<div className="flex flex-1">


{/* ---------------- SIDEBAR ---------------- */}

<aside className="w-64 bg-black border-r border-[#2a2a2a] p-6">

<h2 className="text-2xl font-bold text-[#c9a46a] mb-10">
SkillWave Admin
</h2>

<nav className="space-y-4">

<SidebarBtn text="📊 Dashboard" onClick={()=>setSection("dashboard")}/>
<SidebarBtn text="👨‍🎓 Users" onClick={()=>setSection("users")}/>
<SidebarBtn text="📚 Courses" onClick={()=>setSection("courses")}/>
<SidebarBtn text="💳 Payments" onClick={()=>setSection("payments")}/>
<SidebarBtn text="🎓 Certificates" onClick={()=>setSection("certificates")}/>

</nav>

</aside>


{/* ---------------- MAIN ---------------- */}

<main className="flex-1 p-10 overflow-y-auto">

{/* ================= DASHBOARD ================= */}

{section==="dashboard" && (

<>

<h1 className="text-3xl font-bold mb-8">
Admin Dashboard
</h1>

<div className="grid grid-cols-4 gap-6 mb-10">

<Stat title="Users" value={stats.users}/>
<Stat title="Courses" value={stats.courses}/>
<Stat title="Enrollments" value={stats.enrollments}/>
<Stat title="Certificates" value={stats.certificates}/>

</div>


<div className="grid grid-cols-2 gap-8 mb-10">

<div className="bg-[#161616] p-6 rounded-xl border border-[#2a2a2a]">

<h2 className="text-[#c9a46a] font-semibold mb-4">
Platform Growth
</h2>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={chartData}>

<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>

<Bar dataKey="value" fill="#c9a46a"/>

</BarChart>

</ResponsiveContainer>

</div>


<div className="bg-[#161616] p-6 rounded-xl border border-[#2a2a2a]">

<h2 className="text-[#c9a46a] font-semibold mb-4">
Course Distribution
</h2>

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie data={pieData} dataKey="value" outerRadius={100} label>

{pieData.map((entry,index)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]}/>
))}

</Pie>

</PieChart>

</ResponsiveContainer>

</div>

</div>

</>

)}


{/* ================= USERS ================= */}

{section==="users" && (

<div>

<h1 className="text-2xl font-bold mb-6">Users</h1>

<table className="w-full">

<thead>

<tr className="border-b border-[#2a2a2a] text-gray-400">
<th className="py-3 text-left">Name</th>
<th>Email</th>
<th>Role</th>
</tr>

</thead>

<tbody>

{users.map(user=>(
<tr key={user._id} className="border-b border-[#2a2a2a]">
<td className="py-3">{user.name}</td>
<td>{user.email}</td>
<td>{user.role}</td>
</tr>
))}

</tbody>

</table>

</div>

)}


{/* ================= COURSES ================= */}

{section==="courses" && (

<div>

<h1 className="text-2xl font-bold mb-6">Courses</h1>

<table className="w-full">

<thead>

<tr className="border-b border-[#2a2a2a] text-gray-400">
<th className="py-3 text-left">Title</th>
<th>Instructor</th>
<th>Students</th>
</tr>

</thead>

<tbody>

{courses.map(course=>(
<tr key={course._id} className="border-b border-[#2a2a2a]">
<td className="py-3">{course.title}</td>
<td>{course.instructor}</td>
<td>{course.studentsEnrolled}</td>
</tr>
))}

</tbody>

</table>

</div>

)}


{/* ================= PAYMENTS ================= */}

{section==="payments" && (

<div>

<h1 className="text-2xl font-bold mb-6">Payments</h1>

<table className="w-full">

<thead>

<tr className="border-b border-[#2a2a2a] text-gray-400">
<th className="py-3 text-left">User</th>
<th>Course</th>
<th>Amount</th>
</tr>

</thead>

<tbody>

{payments.map(p=>(
<tr key={p._id} className="border-b border-[#2a2a2a]">
<td className="py-3">{p.userEmail}</td>
<td>{p.courseId}</td>
<td>₹{p.amount}</td>
</tr>
))}

</tbody>

</table>

</div>

)}


{/* ================= CERTIFICATES ================= */}

{section==="certificates" && (

<div>

<h1 className="text-2xl font-bold mb-6">Certificates</h1>

<table className="w-full">

<thead>

<tr className="border-b border-[#2a2a2a] text-gray-400">
<th className="py-3 text-left">Student</th>
<th>Course</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{certificates.map(c=>(
<tr key={c._id} className="border-b border-[#2a2a2a]">
<td className="py-3">{c.userEmail}</td>
<td>{c.courseId}</td>
<td>{c.status}</td>
</tr>
))}

</tbody>

</table>

</div>

)}

</main>

</div>

<Footer/>

</motion.div>

  )

}


function SidebarBtn({text,onClick}){

return(

<div
onClick={onClick}
className="px-3 py-2 rounded hover:bg-[#161616] cursor-pointer"
>
{text}
</div>

)

}


function Stat({title,value}){

return(

<div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-6">

<p className="text-gray-400">
{title}
</p>

<h2 className="text-3xl font-bold text-[#c9a46a] mt-2">
{value}
</h2>

</div>

)

}