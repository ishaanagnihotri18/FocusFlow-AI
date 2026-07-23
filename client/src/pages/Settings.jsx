import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../utils/api";

const API_URL = `${API_BASE_URL}/api/tasks`;

export default function Settings() {
  const [backendStatus, setBackendStatus] =
    useState("checking");

  const [geminiStatus, setGeminiStatus] =
    useState("checking");

  const [totalTasks, setTotalTasks] =
    useState(0);

  const [taskStorageStatus, setTaskStorageStatus] =
    useState("checking");

  const getToken = () =>
    localStorage.getItem("focusflow_token");

  // =========================
  // Check Backend
  // =========================

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(
         `${API_BASE_URL}/`
        );

        if (!response.ok) {
          throw new Error("Backend unavailable");
        }

        const data = await response.json();

        setBackendStatus(
          data.backend ? "online" : "offline"
        );

        setGeminiStatus(
          data.geminiConfigured
            ? "configured"
            : "missing"
        );
      } catch (error) {
        console.error(
          "Backend health check failed:",
          error
        );

        setBackendStatus("offline");
        setGeminiStatus("unknown");
      }
    };

    checkBackend();
  }, []);

  // =========================
  // Load User's Task Count
  // =========================

  const loadTaskCount = async () => {
    try {
      setTaskStorageStatus("checking");

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load tasks."
        );
      }

      setTotalTasks(data.tasks?.length || 0);

      setTaskStorageStatus("active");
    } catch (error) {
      console.error(
        "Task Storage Check Error:",
        error
      );

      setTaskStorageStatus("offline");
    }
  };

  useEffect(() => {
    loadTaskCount();
  }, []);

  // =========================
  // Clear Tasks
  // =========================

  const clearTasks = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all your tasks? This cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(API_URL, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to clear tasks."
        );
      }

      setTotalTasks(0);

      toast.success("All tasks cleared.");
    } catch (error) {
      console.error(
        "Clear Tasks Error:",
        error
      );

      toast.error(error.message);
    }
  };

  // =========================
  // Restore Demo Tasks
  // =========================

  const resetTasks = async () => {
    const demoTasks = [
      {
        title: "Complete Project Documentation",
        priority: "High",
        deadline: getRelativeDate(1),
      },

      {
        title: "Practice LeetCode",
        priority: "Medium",
        deadline: getRelativeDate(2),
      },

      {
        title: "Review Machine Learning Notes",
        priority: "Low",
        deadline: getRelativeDate(4),
      },
    ];

    try {
      const createdTasks = [];

      for (const task of demoTasks) {
        const response = await fetch(API_URL, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },

          body: JSON.stringify(task),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to restore demo tasks."
          );
        }

        createdTasks.push(data.task);
      }

      setTotalTasks(
        (prev) => prev + createdTasks.length
      );

      toast.success("Demo tasks restored.");
    } catch (error) {
      console.error(
        "Restore Demo Tasks Error:",
        error
      );

      toast.error(error.message);
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <>
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          ⚙️ Settings
        </h1>

        <p className="text-gray-400 mt-2">
          Manage application data and check system
          status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Task Management */}

        <div className="bg-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            📋 Task Management
          </h2>

          <p className="text-gray-400 mb-6">
            Total Tasks:{" "}
            <span className="text-white font-semibold">
              {totalTasks}
            </span>
          </p>

          <div className="space-y-4">
            <button
              onClick={clearTasks}
              className="w-full bg-red-500 hover:bg-red-600 transition-all py-3 rounded-xl font-semibold"
            >
              🗑 Clear All Tasks
            </button>

            <button
              onClick={resetTasks}
              className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all py-3 rounded-xl font-semibold"
            >
              🔄 Restore Demo Tasks
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-5">
            Task changes apply only to your FocusFlow
            account.
          </p>
        </div>

        {/* System Status */}

        <div className="bg-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            ⚡ System Status
          </h2>

          <div className="space-y-5">
            <StatusRow
              label="Backend"
              status={
                backendStatus === "checking"
                  ? "Checking..."
                  : backendStatus === "online"
                  ? "Running"
                  : "Offline"
              }
              good={backendStatus === "online"}
              checking={
                backendStatus === "checking"
              }
            />

            <StatusRow
              label="Gemini API Key"
              status={
                geminiStatus === "checking"
                  ? "Checking..."
                  : geminiStatus === "configured"
                  ? "Configured"
                  : geminiStatus === "missing"
                  ? "Not Configured"
                  : "Unavailable"
              }
              good={
                geminiStatus === "configured"
              }
              checking={
                geminiStatus === "checking"
              }
            />

            <StatusRow
              label="MongoDB Task Storage"
              status={
                taskStorageStatus === "checking"
                  ? "Checking..."
                  : taskStorageStatus === "active"
                  ? "Connected"
                  : "Unavailable"
              }
              good={
                taskStorageStatus === "active"
              }
              checking={
                taskStorageStatus === "checking"
              }
            />
          </div>

          {backendStatus === "offline" && (
            <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <p className="text-red-400 font-semibold">
                Backend unavailable
              </p>

              <p className="text-gray-400 text-sm mt-1">
                Start the FocusFlow server to use
                database and Gemini AI features.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* About */}

      <div className="mt-10 bg-slate-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">
          ℹ️ About FocusFlow AI
        </h2>

        <p className="text-gray-300 leading-8">
          FocusFlow AI is an AI-powered productivity and
          deadline management platform that helps users
          organize tasks, generate intelligent study and
          work plans using Google's Gemini AI, monitor
          productivity through analytics, and stay on top
          of deadlines.
        </p>

        <div className="mt-8 border-t border-slate-700 pt-6">
          <div className="flex justify-between">
            <span className="text-gray-400">
              Version
            </span>

            <span>1.0.0</span>
          </div>

          <div className="flex justify-between mt-3">
            <span className="text-gray-400">
              Developer
            </span>

            <span>Ishaan Agnihotri</span>
          </div>
        </div>
      </div>
    </>
  );
}

// =========================
// Status Row
// =========================

function StatusRow({
  label,
  status,
  good,
  checking = false,
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-300">
        {label}
      </span>

      <span
        className={`font-semibold ${
          checking
            ? "text-yellow-400"
            : good
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {checking
          ? `⏳ ${status}`
          : `● ${status}`}
      </span>
    </div>
  );
}

// =========================
// Relative Demo Date
// =========================

function getRelativeDate(daysFromToday) {
  const date = new Date();

  date.setDate(
    date.getDate() + daysFromToday
  );

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}