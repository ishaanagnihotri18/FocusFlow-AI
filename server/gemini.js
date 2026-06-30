const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generatePlan(tasks) {
  const prompt = `
You are an AI Productivity Coach.

The user has these tasks:

${tasks}

Generate:

1. Priority order
2. Best schedule for today
3. Deadline risk analysis
4. Productivity advice

Keep the response concise and use bullet points.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = { generatePlan };