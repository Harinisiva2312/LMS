import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://lms-xy4t.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("✅ Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("❌ Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Server not reachable");
    }

    setLoading(false);
  };

  const inputClass =
    "w-full px-4 py-3 rounded bg-white text-black outline-none focus:ring-2 focus:ring-[#c9a46a]";

  return (
    <motion.div
      className="bg-[#0e0e0e] text-white min-h-screen pt-28 pb-20 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT INFO */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>

          <p className="text-gray-400 mb-8 leading-relaxed">
            Have questions about our courses, cloud learning, certifications, or
            platform features? Reach out — our team is here to help you succeed.
          </p>

          <div className="space-y-4 text-gray-300 text-sm">
            <p>
              <span className="text-[#c9a46a]">Email:</span>{" "}
              support@skillwave.com
            </p>
            <p>
              <span className="text-[#c9a46a]">Phone:</span> +91 98765 43210
            </p>
            <p>
              <span className="text-[#c9a46a]">Location:</span> India
            </p>
          </div>
        </motion.div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-[#0a1f44] to-[#020617] p-10 rounded-2xl shadow-2xl"
        >
          <h2 className="text-2xl mb-8 text-center text-white">
            Contact Form
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
              className={inputClass}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className={`${inputClass} resize-none`}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-[#c9a46a] text-black py-3 rounded font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Contact;
