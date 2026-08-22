import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const courses = [
    {
      id: "html-css",
      title: "HTML & CSS Fundamentals",
      rating: 4.7,
      students: "12k",
      image: "/images/course1.jpg",
    },
    {
      id: "javascript",
      title: "JavaScript Essentials",
      rating: 4.8,
      students: "18k",
      image: "/images/course2.jpg",
    },
    {
      id: "python",
      title: "Python Programming Basics",
      rating: 4.6,
      students: "15k",
      image: "/images/course3.jpg",
    },
  ];

  return (
    <div className="bg-[#0e0e0e] text-white">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-6xl font-bold mb-6">
            Modern <span className="text-[#c9a46a]">Learning</span>
          </h1>

          <p className="text-gray-300 mb-10">
            AI powered cloud learning platform with courses, quizzes and certification.
          </p>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => navigate("/courses")}
              className="px-8 py-3 bg-[#c9a46a] text-black rounded font-semibold hover:opacity-90"
            >
              Explore Courses
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 border border-[#c9a46a] text-[#c9a46a] rounded hover:bg-[#c9a46a] hover:text-black transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 px-8 max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <img
          src="/images/about.png"
          alt="about"
          className="rounded-lg border border-[#2a2a2a]"
        />

        <div>
          <h2 className="text-4xl mb-6 text-[#c9a46a]">About Skill Wave LMS</h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Skill Wave LMS provides AI recommendations, cloud based courses,
            quizzes and professional certifications to help students grow faster.
          </p>

          <button className="px-6 py-3 border border-[#c9a46a] text-[#c9a46a] rounded hover:bg-[#c9a46a] hover:text-black transition">
            Learn More
          </button>
        </div>
      </section>

      {/* COURSES */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl text-center text-[#c9a46a] mb-16">
          Start Learning Today
        </h2>

        <div className="space-y-10">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.02 }}
              className="bg-[#161616] border border-[#2a2a2a] rounded-xl overflow-hidden flex shadow-lg"
            >
              <img
                src={course.image}
                alt=""
                className="w-72 object-cover"
              />

              <div className="p-8 flex flex-col justify-center flex-1">
                <h3 className="text-2xl mb-2">{course.title}</h3>

                <p className="text-gray-400 mb-6">
                  ⭐ {course.rating} • {course.students} learners enrolled
                </p>

                <button
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="w-fit px-6 py-2 border border-[#c9a46a] text-[#c9a46a] rounded hover:bg-[#c9a46a] hover:text-black transition"
                >
                  Start Learning →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER GAP */}
      <div className="h-20" />
    </div>
  );
}
