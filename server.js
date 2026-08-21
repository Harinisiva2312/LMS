console.log("✅ server.js file loaded");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* -------------------- MIDDLEWARE -------------------- */

app.use(express.json({ limit: "10mb" }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

/* -------------------- ENV CHECK -------------------- */

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env file");
  process.exit(1);
}

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY missing (AI chat disabled)");
}

/* -------------------- MONGODB CONNECTION -------------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

/* -------------------- ROUTES -------------------- */

// Authentication
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Contact
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

// Courses
const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);

// Enrollment
const enrollmentRoutes = require("./routes/enrollmentRoutes");
app.use("/api/enrollments", enrollmentRoutes);

// Payments
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payments", paymentRoutes);

// Certificates
const certificateRoutes = require("./routes/certificateRoutes");
app.use("/api/certificates", certificateRoutes);

// Instructor dashboard
const instructorRoutes = require("./routes/instructorRoutes");
app.use("/api/instructor", instructorRoutes);

// Student dashboard
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

// Users
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Admin
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

/* -------------------- AI CHAT API -------------------- */

app.post("/api/chat", async (req, res) => {

  try {

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        reply: "AI service not configured."
      });
    }

    const { message, courseTitle, chatHistory } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        reply: "Please ask a valid question."
      });
    }

    /* -------- FORMAT CHAT HISTORY -------- */

    let historyText = "";

    if (chatHistory && chatHistory.length > 0) {
      historyText = chatHistory
        .map((msg) => `${msg.role}: ${msg.text}`)
        .join("\n");
    }

    /* -------- AI PROMPT -------- */

    const prompt = `
You are SkillWave AI, an intelligent learning assistant inside a Learning Management System.

Course Context: ${courseTitle || "General Learning"}

Previous Conversation:
${historyText}

Student Question:
${message}

Instructions:
- Answer clearly
- Use simple explanations
- Give examples if needed
- Keep answers concise for students
`;

    /* -------- GEMINI API CALL -------- */

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("🤖 Gemini Response:", JSON.stringify(data, null, 2));

    let reply = "AI could not generate a response.";

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      reply = data.candidates[0].content.parts[0].text;
    }

    res.status(200).json({
      success: true,
      reply
    });

  } catch (error) {

    console.error("❌ Gemini AI Error:", error);

    res.status(500).json({
      success: false,
      reply: "AI service temporarily unavailable."
    });

  }

});

/* -------------------- TEST ROUTE -------------------- */

app.get("/", (req, res) => {
  res.send("🚀 SkillWave LMS API Running...");
});

/* -------------------- SERVER -------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});