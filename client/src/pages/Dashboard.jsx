import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../utils/api";

import StatsCards from "../components/StatsCards";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import AICoach from "../components/AICoach";
import DashboardHeader from "../components/dashboard/DashboardHeader";

const API_URL = `${API_BASE_URL}/api/tasks`;

export default function Dashboard() {
  // =========================
  // Logged-in User
  // =========================

  const storedUser = localStorage.getItem("focusflow_user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const firstName =
    user?.name?.split(" ")[0] || "User";

  const getToken = () =>
    localStorage.getItem("focusflow_token");

  // =========================
  // State
  // =========================

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Medium",
    deadline: "",
  });

  // =========================
  // Load Tasks From MongoDB
  // =========================

  const fetchTasks = async () => {
    try {
      setLoading(true);

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

      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Dashboard Task Error:", error);

      toast.error("Unable to load your tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // =========================
  // Add Task
  // =========================

  const handleAddTask = async () => {
    if (
      !newTask.title.trim() ||
      !newTask.deadline
    ) {
      toast.warning("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },

        body: JSON.stringify({
          title: newTask.title.trim(),
          priority: newTask.priority,
          deadline: newTask.deadline,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to add task."
        );
      }

      setTasks((prev) => [
        data.task,
        ...prev,
      ]);

      setNewTask({
        title: "",
        priority: "Medium",
        deadline: "",
      });

      setShowModal(false);

      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Add Task Error:", error);

      toast.error(error.message);
    }
  };

  // =========================
  // Complete Task
  // =========================

  const toggleComplete = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}/toggle`,
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update task."
        );
      }

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id
            ? data.task
            : task
        )
      );
    } catch (error) {
      console.error(
        "Toggle Task Error:",
        error
      );

      toast.error(error.message);
    }
  };

  // =========================
  // Delete Task
  // =========================

  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to delete task."
        );
      }

      setTasks((prev) =>
        prev.filter(
          (task) => task._id !== id
        )
      );

      toast.success("Task deleted!");
    } catch (error) {
      console.error(
        "Delete Task Error:",
        error
      );

      toast.error(error.message);
    }
  };

  // =========================
  // Dashboard Data
  // =========================

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  const productivityScore =
  tasks.length === 0
    ? 0
    : Math.round(
        (completedTasks / tasks.length) * 100
      );

  // =========================
  // Greeting
  // =========================

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? `Good Morning, ${firstName}`
      : hour < 17
      ? `Good Afternoon, ${firstName}`
      : `Good Evening, ${firstName}`;

  // =========================
  // Upcoming Deadlines
  // =========================

  const upcomingTasks = [...tasks]
    .filter(
      (task) =>
        !task.completed &&
        task.deadline
    )
    .sort(
      (a, b) =>
        new Date(a.deadline) -
        new Date(b.deadline)
    )
    .slice(0, 3);

  const formatDeadline = (deadline) => {
    if (!deadline) return "No deadline";

    const date = new Date(deadline);

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================
  // UI
  // =========================

  return (
    <>
      {/* Header */}

      <DashboardHeader
        greeting={greeting}
        pendingTasks={pendingTasks}
        productivityScore={productivityScore}
        onAddTask={() =>
          setShowModal(true)
        }
      />

      {/* Stats */}

      <StatsCards tasks={tasks} />

      {/* Loading */}

      {loading ? (
        <div className="mt-10 bg-slate-800 rounded-2xl p-10 text-center text-gray-400">
          Loading your workspace...
        </div>
      ) : (
        <>
          {/* Upcoming Deadlines */}

          <section className="mt-10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  🔥 Upcoming Deadlines
                </h2>

                <p className="text-gray-400 mt-1">
                  Your nearest pending deadlines.
                </p>
              </div>
            </div>

            {upcomingTasks.length === 0 ? (
              <div className="bg-slate-800 rounded-2xl p-8 text-center">
                <p className="text-lg font-semibold text-green-400">
                  🎉 No pending deadlines
                </p>

                <p className="text-gray-400 mt-2">
                  You're all caught up.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {upcomingTasks.map(
                  (task) => (
                    <div
                      key={task._id}
                      className="bg-slate-800 border border-slate-700 rounded-2xl p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-semibold text-lg text-white">
                          {task.title}
                        </h3>

                        <span
                          className={`text-sm font-bold ${
                            task.priority ===
                            "High"
                              ? "text-red-400"
                              : task.priority ===
                                "Medium"
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <p className="text-gray-400 mt-4">
                        📅{" "}
                        {formatDeadline(
                          task.deadline
                        )}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
          </section>

          {/* Your Tasks */}

          <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  📋 Your Tasks
                </h2>

                <p className="text-gray-400 mt-1">
                  Manage your current workload.
                </p>
              </div>

              <span className="text-gray-400">
                {tasks.length}{" "}
                {tasks.length === 1
                  ? "Task"
                  : "Tasks"}
              </span>
            </div>

            {tasks.length === 0 ? (
              <div className="bg-slate-800 border border-dashed border-slate-700 rounded-2xl p-10 text-center">
                <h3 className="text-xl font-bold text-white">
                  🚀 Ready to get productive?
                </h3>

                <p className="text-gray-400 mt-3">
                  Add your first task to start
                  planning your work.
                </p>

                <button
                  onClick={() =>
                    setShowModal(true)
                  }
                  className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  + Add Your First Task
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    toggleComplete={
                      toggleComplete
                    }
                    deleteTask={deleteTask}
                  />
                ))}
              </div>
            )}
          </section>

          {/* AI Coach */}

          <section className="mt-12">
            <AICoach tasks={tasks} />
          </section>
        </>
      )}

      {/* Add Task Modal */}

      <AddTaskModal
        showModal={showModal}
        setShowModal={setShowModal}
        newTask={newTask}
        setNewTask={setNewTask}
        handleAddTask={handleAddTask}
      />
    </>
  );
}