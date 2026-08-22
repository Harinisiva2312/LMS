import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    interest: "",
    password: "",
    confirmPassword: "",
    role: "user",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      const file = files[0];
      setForm({ ...form, photo: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const userData = {
          name: form.name,
          email: form.email,
          dob: form.dob,
          phone: form.phone,
          interest: form.interest,
          password: form.password,
          role: form.role,
          photo: reader.result || null,
        };

        // 🔹 Send data to backend
        const response = await fetch(
          "https://lms-xy4t.onrender.com/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        const data = await response.json();

        if (!data.success) {
          alert(data.message);
          return;
        }

        // Save user locally for dashboard
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));

        // Navigate after register
        if (data.user.role === "user") {
          navigate("/user-dashboard");
        } else {
          navigate("/instructor-dashboard");
        }
      } catch (error) {
        console.error("Register error:", error);
        alert("Registration failed");
      }
    };

    if (form.photo) {
      reader.readAsDataURL(form.photo);
    } else {
      reader.onloadend();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e] text-white px-4">
      <div className="w-full max-w-md bg-[#161616] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create your <span className="text-[#c9a46a]">Skill Wave</span> account
        </h2>

        {/* Profile Upload */}
        <div className="flex justify-center mb-6">
          <label className="w-24 h-24 rounded-full border-2 border-dashed border-[#c9a46a] flex items-center justify-center cursor-pointer overflow-hidden hover:bg-[#222] transition">

            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-sm text-gray-400">Upload</span>
            )}

            <input
              type="file"
              name="photo"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input type="text" name="name" placeholder="Full Name" required onChange={handleChange}
            className="w-full p-3 rounded bg-[#0e0e0e] border border-[#2a2a2a]" />

          <input type="email" name="email" placeholder="Email Address" required onChange={handleChange}
            className="w-full p-3 rounded bg-[#0e0e0e] border border-[#2a2a2a]" />

          <input type="date" name="dob" required onChange={handleChange}
            className="w-full p-3 rounded bg-[#0e0e0e] border border-[#2a2a2a]" />

          <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange}
            className="w-full p-3 rounded bg-[#0e0e0e] border border-[#2a2a2a]" />

          <select name="interest" required onChange={handleChange}
            className="w-full p-3 rounded bg-[#0e0e0e] border border-[#2a2a2a]">
            <option value="">Select Area of Interest</option>
            <option>MERN Stack</option>
            <option>Java & Spring</option>
            <option>Python</option>
            <option>AI & ML</option>
            <option>Cloud Computing</option>
          </select>

          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="user" checked={form.role === "user"} onChange={handleChange} />
              Student
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="instructor" checked={form.role === "instructor"} onChange={handleChange} />
              Instructor
            </label>
          </div>

          <input type="password" name="password" placeholder="Password" required onChange={handleChange}
            className="w-full p-3 rounded bg-[#0e0e0e] border border-[#2a2a2a]" />

          <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange}
            className="w-full p-3 rounded bg-[#0e0e0e] border border-[#2a2a2a]" />

          <button type="submit"
            className="w-full bg-[#c9a46a] text-black py-3 rounded font-semibold hover:scale-[1.02] transition">
            Register
          </button>

        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already a user?{" "}
          <Link to="/login" className="text-[#c9a46a] hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}