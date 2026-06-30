import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";

import { loadTasks } from "../utils/taskStorage";

export default function AIPlanner() {

  // ==========================
  // Load Tasks
  // ==========================

  const tasks = loadTasks();

  // ==========================
  // States
  // ==========================

  const [loading, setLoading] = useState(false);

  const [aiPlan, setAiPlan] = useState("");

  // ==========================
  // Statistics
  // ==========================

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(task => task.completed).length;

  const pendingTasks =
    totalTasks - completedTasks;

  const highPriority =
    tasks.filter(task => task.priority === "High").length;

  // ==========================
  // Generate Schedule
  // ==========================

  const generatePlan = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/generate-plan",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            tasks: tasks
              .map(
                task =>
                  `${task.title} | Priority: ${task.priority} | Deadline: ${task.deadline}`
              )
              .join("\n"),

          }),

        }
      );

      const data = await response.json();

      if (data.success) {

        setAiPlan(data.plan);

        toast.success(
          "Personalized schedule generated!"
        );

      } else {

        toast.error(
          "Unable to generate schedule."
        );

      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to connect to Gemini AI."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <>

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">

          🤖 Gemini Productivity Planner

        </h1>

        <p className="text-gray-400 mt-3 leading-7">

          Generate a personalized study and work schedule
          using Google's Gemini AI based on your current
          tasks, priorities and deadlines.

        </p>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-slate-800 rounded-2xl p-6">

          <h3 className="text-gray-400">
            Total Tasks
          </h3>

          <p className="text-4xl font-bold text-cyan-400 mt-3">
            {totalTasks}
          </p>

        </div>

        <div className="bg-slate-800 rounded-2xl p-6">

          <h3 className="text-gray-400">
            Completed
          </h3>

          <p className="text-4xl font-bold text-green-400 mt-3">
            {completedTasks}
          </p>

        </div>

        <div className="bg-slate-800 rounded-2xl p-6">

          <h3 className="text-gray-400">
            Pending
          </h3>

          <p className="text-4xl font-bold text-yellow-400 mt-3">
            {pendingTasks}
          </p>

        </div>

        <div className="bg-slate-800 rounded-2xl p-6">

          <h3 className="text-gray-400">
            High Priority
          </h3>

          <p className="text-4xl font-bold text-red-400 mt-3">
            {highPriority}
          </p>

        </div>

      </div>

      {/* Before Generate */}

      <div className="bg-slate-800 rounded-2xl p-8 mb-8">

        <h2 className="text-2xl font-bold text-cyan-400 mb-5">

          📋 Before You Generate

        </h2>

        <ul className="space-y-3 text-gray-300 leading-7">

          <li>
            ✅ Ensure your task list is updated.
          </li>

          <li>
            ✅ High-priority tasks receive greater importance.
          </li>

          <li>
            ✅ Deadlines are considered while generating your schedule.
          </li>

          <li>
            ✅ Gemini creates a personalized plan based on your workload.
          </li>

        </ul>

      </div>
            {/* Generate Button */}

      <div className="text-center mb-10">

        <button
          onClick={generatePlan}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all px-8 py-4 rounded-xl font-bold text-lg shadow-lg"
        >
          {loading
            ? "🤖 Gemini is generating your personalized schedule..."
            : "✨ Generate Personalized Schedule"}
        </button>

      </div>

      {/* AI Response */}

      {aiPlan && (

        <div className="bg-slate-800 rounded-2xl p-8 border border-cyan-500/20">

          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            📅 Your Personalized Schedule
          </h2>

          <div className="bg-slate-900 rounded-xl p-6 prose prose-invert max-w-none">

            <ReactMarkdown>
              {aiPlan}
            </ReactMarkdown>

          </div>

          <p className="text-xs text-gray-500 mt-6 text-center">

            💡 This schedule is generated by Gemini AI based on your
            current tasks, priorities and deadlines. You can adjust
            it according to your personal availability.

          </p>

        </div>

      )}

      {/* Empty State */}

      {!aiPlan && !loading && (

        <div className="bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-700 text-center">

          <h3 className="text-2xl font-bold text-cyan-400 mb-4">
            🚀 Ready to plan your day?
          </h3>

          <p className="text-gray-400 leading-7 max-w-2xl mx-auto">

            Click <strong>"Generate Personalized Schedule"</strong> and
            Gemini AI will analyze your tasks, priorities and deadlines
            to create a customized productivity plan.

          </p>

        </div>

      )}

    </>

  );

}