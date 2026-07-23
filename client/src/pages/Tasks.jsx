import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/api";
import SearchBar from "../components/tasks/SearchBar";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskStats from "../components/tasks/TaskStats";
import EmptyState from "../components/tasks/EmptyState";
import FloatingAddButton from "../components/tasks/FloatingAddButton";

import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";

const API_URL = `${API_BASE_URL}/api/tasks`;

export default function Tasks() {
  // ==========================
  // States
  // ==========================

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [showModal, setShowModal] =
    useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Medium",
    deadline: "",
  });

  // ==========================
  // Authentication Token
  // ==========================

  const getToken = () =>
    localStorage.getItem("focusflow_token");

  // ==========================
  // Load Tasks From MongoDB
  // ==========================

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
      console.error("Load Tasks Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ==========================
  // Add Task
  // ==========================

  const handleAddTask = async () => {
    if (
      !newTask.title.trim() ||
      !newTask.deadline
    ) {
      alert("Please fill all fields.");
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
          title: newTask.title,
          priority: newTask.priority,
          deadline: newTask.deadline,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to create task."
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
    } catch (error) {
      console.error("Add Task Error:", error);
      alert(error.message);
    }
  };

  // ==========================
  // Complete Task
  // ==========================

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

      alert(error.message);
    }
  };

  // ==========================
  // Delete Task
  // ==========================

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
    } catch (error) {
      console.error(
        "Delete Task Error:",
        error
      );

      alert(error.message);
    }
  };

  // ==========================
  // Filter Tasks
  // ==========================

  const filteredTasks = tasks.filter(
    (task) => {
      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "All"
          ? true
          : activeFilter === "Completed"
          ? task.completed
          : activeFilter === "Pending"
          ? !task.completed
          : task.priority === activeFilter;

      return matchesSearch && matchesFilter;
    }
  );

  return (
    <>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            📋 Task Manager
          </h1>

          <p className="text-gray-400 mt-2">
            Manage, organize and complete your daily
            tasks efficiently.
          </p>
        </div>
      </div>

      {/* Search */}

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* Filters */}

      <TaskFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* Statistics */}

      <TaskStats tasks={filteredTasks} />

      {/* Tasks */}

      {loading ? (
        <div className="text-center py-16 text-gray-400">
          Loading your tasks...
        </div>
      ) : filteredTasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-5">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      )}

      {/* Floating Add Button */}

      <FloatingAddButton
        onClick={() => setShowModal(true)}
      />

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