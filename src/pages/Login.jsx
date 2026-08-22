import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login button clicked");

    try {

      const res = await fetch("https://lms-xy4t.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
  email: email,
  password: password
})
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!data.success) {
        alert(data.message || "Login failed");
        return;
      }

      // save user
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));

      /* ---------- ROLE BASED REDIRECT ---------- */

      if (data.user.role === "admin") {

        window.location.href = "/admin-dashboard";

      } else if (data.user.role === "instructor") {

        window.location.href = "/instructor-dashboard";

      } else {

        window.location.href = "/user-dashboard";

      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center text-white">

      <form
        onSubmit={handleLogin}
        className="bg-[#161616] p-8 rounded-xl w-[380px]"
      >

        <h2 className="text-2xl mb-6 text-center">Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-black border border-[#2a2a2a]"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-black border border-[#2a2a2a]"
        />

        {/* Role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-6 p-3 rounded bg-black border border-[#2a2a2a]"
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#c9a46a] text-black py-3 rounded hover:opacity-90"
        >
          Login
        </button>

        {/* Register */}
        <p className="text-center text-sm text-gray-400 mt-4">
          New user?{" "}
          <Link to="/register" className="text-[#c9a46a] hover:underline">
            Click here to register
          </Link>
        </p>

      </form>

    </div>
  );
}