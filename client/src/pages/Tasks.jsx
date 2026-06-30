import { useEffect, useState } from "react";

import SearchBar from "../components/tasks/SearchBar";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskStats from "../components/tasks/TaskStats";
import EmptyState from "../components/tasks/EmptyState";
import FloatingAddButton from "../components/tasks/FloatingAddButton";

import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";

import {
  loadTasks,
  saveTasks,
} from "../utils/taskStorage";

export default function Tasks() {

  // ==========================
  // States
  // ==========================

  const [tasks, setTasks] = useState(loadTasks);

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
  // Save Tasks
  // ==========================

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // ==========================
  // Add Task
  // ==========================

  const handleAddTask = () => {

    if (
      !newTask.title.trim() ||
      !newTask.deadline
    ) {
      alert("Please fill all fields.");
      return;
    }

    const task = {
      id: Date.now(),
      title: newTask.title,
      priority: newTask.priority,
      deadline: newTask.deadline,
      completed: false,
    };

    setTasks((prev) => [...prev, task]);

    setNewTask({
      title: "",
      priority: "Medium",
      deadline: "",
    });

    setShowModal(false);

  };

  // ==========================
  // Complete Task
  // ==========================

  const toggleComplete = (id) => {

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );

  };

  // ==========================
  // Delete Task
  // ==========================

  const deleteTask = (id) => {

    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );

  };

  // ==========================
  // Filter Tasks
  // ==========================

  const filteredTasks = tasks.filter((task) => {

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

    return (
      matchesSearch &&
      matchesFilter
    );

  });

  return (
    <>
          {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            📋 Task Manager
          </h1>

          <p className="text-gray-400 mt-2">
            Manage, organize and complete your daily tasks efficiently.
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

      {filteredTasks.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="space-y-5">

          {filteredTasks.map((task) => (

            <TaskCard
              key={task.id}
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