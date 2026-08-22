import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-[#2a2a2a]"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-[#c9a46a]"
        >
          Skill Wave
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`transition ${
                  isActive
                    ? "text-[#c9a46a]"
                    : "text-gray-200 hover:text-[#c9a46a]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {/* LOGIN BUTTON */}
          <Link
            to="/login"
            className="ml-4 border border-[#c9a46a] px-4 py-1.5 rounded text-[#c9a46a] hover:bg-[#c9a46a] hover:text-black transition"
          >
            Login
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
