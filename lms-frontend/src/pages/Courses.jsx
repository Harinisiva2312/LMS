import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import courseData from "../data/courseData";

const Courses = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const enrollments =
    JSON.parse(localStorage.getItem("courseEnrollments")) || {};

  const filteredCourses = courseData.filter((course) => {
    const matchSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchLevel =
      levelFilter === "all" || course.level === levelFilter;
    return matchSearch && matchLevel;
  });

  return (
    <div className="min-h-screen bg-[#f5f7fa] pt-24 pb-10 px-6">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-xl p-5 shadow-sm h-fit">
          <h3 className="font-semibold mb-4">Filter by</h3>

          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Level</p>
            {["all", "Beginner", "Intermediate"].map((lvl) => (
              <label
                key={lvl}
                className="flex items-center gap-2 text-sm mb-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="level"
                  checked={levelFilter === lvl}
                  onChange={() => setLevelFilter(lvl)}
                />
                {lvl === "all" ? "All Levels" : lvl}
              </label>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Browse Courses</h1>

            <input
              placeholder="Search courses..."
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-md text-sm w-64 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const count = enrollments[course.id]?.length || 0;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  <img
                    src={course.units[0].lessons[0].thumbnail}
                    alt="thumb"
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-xs text-gray-500 mb-1">
                      {course.instructor}
                    </p>

                    <p className="text-xs text-gray-500 mb-2">
                      👥 {count} enrolled
                    </p>

                    <div className="flex items-center gap-2 text-xs mb-2">
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="text-gray-400">
                        ({course.learners.toLocaleString()})
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">
                        {course.isPaid ? `₹${course.price}` : "Free"}
                      </span>

                      <span className="text-xs text-blue-600 font-medium">
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;