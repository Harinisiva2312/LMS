import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="bg-[#0e0e0e] text-white pt-24 pb-16 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-bold mb-6">About Skill Wave</h1>

          <p className="text-gray-400 mb-4 leading-relaxed">
            Skill Wave is a modern digital learning platform designed to prepare
            students and professionals for real-world technology careers.
          </p>

          <p className="text-gray-400 mb-4 leading-relaxed">
            Our focus is not just learning concepts, but building practical skills
            through structured courses, real projects, and industry aligned guidance.
          </p>

          <p className="text-gray-400 leading-relaxed">
            We combine cloud-based learning, guided mentoring, and professional
            certifications to help learners grow with confidence.
          </p>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-8 h-fit"
        >
          <h3 className="text-xl mb-5 text-[#c9a46a]">Why Skill Wave?</h3>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li>✔ Industry-focused curriculum</li>
            <li>✔ Cloud & AI driven learning</li>
            <li>✔ Career-ready certifications</li>
            <li>✔ Beginner to advanced paths</li>
            <li>✔ Trusted by thousands of learners</li>
          </ul>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default About;
