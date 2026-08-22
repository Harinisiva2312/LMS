import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#0a0a0a] border-t border-[#1f1f1f]"
    >
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-lg font-semibold text-[#c9a46a] mb-2">
            Skill Wave LMS
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            AI powered cloud learning platform to build industry-ready skills.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-200">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              { name: "Home", path: "/" },
              { name: "Courses", path: "/courses" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
              { name: "Login", path: "/login" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-[#c9a46a] transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-200">
            Contact
          </h3>
          <p className="text-sm text-gray-400">support@skillwave.com</p>
          <p className="text-sm text-gray-400">+91 98765 43210</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1f1f1f] py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Skill Wave LMS. All rights reserved.
      </div>
    </motion.footer>
  );
}
