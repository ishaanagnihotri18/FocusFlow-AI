const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const { generatePlan } = require("./gemini");
const connectDB = require("./config/db");

const app = express();

// =========================
// Database
// =========================

connectDB();

// =========================
// Middleware
// =========================

app.use(cors());
app.use(express.json());

// =========================
// Routes
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "FocusFlow AI Backend Running 🚀",
    backend: true,
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// =========================
// Protected Gemini Planner
// =========================

app.post(
  "/generate-plan",
  authMiddleware,
  async (req, res) => {
    try {
      const { tasks } = req.body;

      if (!tasks || !tasks.trim()) {
        return res.status(400).json({
          success: false,
          message: "Tasks are required.",
        });
      }

      const plan = await generatePlan(tasks);

      return res.json({
        success: true,
        plan,
      });
    } catch (error) {
      console.error("Gemini Error:", error);

      return res.status(500).json({
        success: false,
        message: "Gemini Error",
      });
    }
  }
);

// =========================
// Start Server
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});