console.log("✅ server.js file loaded");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* =====================================================
   MIDDLEWARE
===================================================== */

app.use(express.json({ limit: "10mb" }));

/*
  Local development:
  FRONTEND_URL is not required, so localhost:3000 is used.

  Production:
  Render will use:
  FRONTEND_URL=https://your-frontend.onrender.com
*/

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
  })
);

/* =====================================================
   ENVIRONMENT CHECK
===================================================== */

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing");
  process.exit(1);
}

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY is missing (AI chat disabled)");
}

/* =====================================================
   MONGODB CONNECTION
===================================================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

/* =====================================================
   ROUTES
===================================================== */

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

// Instructor
const instructorRoutes = require("./routes/instructorRoutes");
app.use("/api/instructor", instructorRoutes);

// Student Dashboard
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);

// Users
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Admin
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

/* =====================================================
   AI CHAT API - GEMINI
===================================================== */

app.post("/api/chat", async (req, res) => {
  try {
    // Check Gemini API key
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        reply: "AI service is not configured."
      });
    }

    const {
      message,
      courseTitle,
      chatHistory
    } = req.body;

    // Validate message
    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        reply: "Please ask a valid question."
      });
    }

    /* ---------------------------------------------
       FORMAT CHAT HISTORY
    --------------------------------------------- */

    let historyText = "";

    if (Array.isArray(chatHistory) && chatHistory.length > 0) {
      historyText = chatHistory
        .map((msg) => {
          return `${msg.role}: ${msg.text}`;
        })
        .join("\n");
    }

    /* ---------------------------------------------
       AI PROMPT
    --------------------------------------------- */

    const prompt = `
You are SkillWave AI, an intelligent learning assistant inside a Learning Management System.

Course Context:
${courseTitle || "General Learning"}

Previous Conversation:
${historyText || "No previous conversation."}

Student Question:
${message}

Instructions:
- Answer clearly.
- Use simple explanations.
- Give examples when useful.
- Keep answers concise and student-friendly.
- Help the student understand the concept rather than just giving the answer.
`;

    /* ---------------------------------------------
       GEMINI API REQUEST
    --------------------------------------------- */

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
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(
      "🤖 Gemini Response:",
      JSON.stringify(data, null, 2)
    );

    /* ---------------------------------------------
       HANDLE GEMINI ERROR
    --------------------------------------------- */

    if (!response.ok) {
      console.error(
        "❌ Gemini API Error:",
        data
      );

      return res.status(500).json({
        success: false,
        reply: "AI service is currently unavailable."
      });
    }

    /* ---------------------------------------------
       EXTRACT AI RESPONSE
    --------------------------------------------- */

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

    /* ---------------------------------------------
       SEND RESPONSE
    --------------------------------------------- */

    return res.status(200).json({
      success: true,
      reply
    });

  } catch (error) {
    console.error("❌ Gemini AI Error:", error);

    return res.status(500).json({
      success: false,
      reply: "AI service temporarily unavailable."
    });
  }
});

/* =====================================================
   ROOT / HEALTH CHECK
===================================================== */

app.get("/", (req, res) => {
  res.status(200).send("🚀 SkillWave LMS API Running...");
});

/* =====================================================
   HEALTH CHECK API
===================================================== */

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SkillWave LMS backend is running",
    environment: process.env.NODE_ENV || "development"
  });
});

/* =====================================================
   404 HANDLER
===================================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

/* =====================================================
   SERVER
===================================================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 SkillWave LMS server running on port ${PORT}`);
});