import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCourse() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const createCourse = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "http://localhost:5000/api/courses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            description,
            price,
            videoUrl
          })
        }
      );

      await res.json();

      alert("Course Created Successfully");

      navigate("/instructor-dashboard");

    } catch (error) {

      console.error("Create course error:", error);

    }

  };

  return (

<div className="min-h-screen bg-[#0e0e0e] text-white flex justify-center items-center p-10">

<div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-10 w-full max-w-xl">

<h1 className="text-2xl font-bold text-[#c9a46a] mb-6">
Create New Course
</h1>

<form onSubmit={createCourse} className="space-y-5">

{/* TITLE */}

<div>
<label className="text-gray-400 text-sm">Course Title</label>

<input
type="text"
value={title}
onChange={(e) => setTitle(e.target.value)}
placeholder="Enter course title"
className="w-full mt-2 p-3 rounded bg-[#0e0e0e] border border-[#2a2a2a]"
required
/>
</div>

{/* DESCRIPTION */}

<div>
<label className="text-gray-400 text-sm">Description</label>

<textarea
value={description}
onChange={(e) => setDescription(e.target.value)}
placeholder="Enter course description"
className="w-full mt-2 p-3 rounded bg-[#0e0e0e] border border-[#2a2a2a]"
rows="4"
required
/>
</div>

{/* PRICE */}

<div>
<label className="text-gray-400 text-sm">Price (₹)</label>

<input
type="number"
value={price}
onChange={(e) => setPrice(e.target.value)}
placeholder="Enter course price"
className="w-full mt-2 p-3 rounded bg-[#0e0e0e] border border-[#2a2a2a]"
required
/>
</div>

{/* VIDEO URL */}

<div>
<label className="text-gray-400 text-sm">Intro Video URL</label>

<input
type="text"
value={videoUrl}
onChange={(e) => setVideoUrl(e.target.value)}
placeholder="YouTube Video URL"
className="w-full mt-2 p-3 rounded bg-[#0e0e0e] border border-[#2a2a2a]"
required
/>
</div>

{/* BUTTONS */}

<div className="flex gap-4 pt-4">

<button
type="submit"
className="bg-[#c9a46a] text-black px-6 py-2 rounded hover:scale-105 transition"
>
Create Course
</button>

<button
type="button"
onClick={() => navigate("/instructor-dashboard")}
className="bg-gray-700 px-6 py-2 rounded"
>
Cancel
</button>

</div>

</form>

</div>

</div>

  );
}