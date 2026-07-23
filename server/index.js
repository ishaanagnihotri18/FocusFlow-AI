const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { generatePlan } = require("./gemini");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "FocusFlow AI Backend Running 🚀",
    backend: true,
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

app.post("/generate-plan", async (req, res) => {
  try {
    const { tasks } = req.body;

    const plan = await generatePlan(tasks);

    res.json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Gemini Error",
    });
  }
});
app.get("/test-gemini", async (req, res) => {
  try {
    const plan = await generatePlan(`
1. Finish Vibe2Ship Project - High - Today
2. Tesla ML Assignment - High - Tomorrow
3. Practice LeetCode - Medium - Today
    `);

    res.json({ plan });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});