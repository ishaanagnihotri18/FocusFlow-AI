import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const defaultTasks = [
    {
      id: 1,
      title: "Complete Tesla ML Assignment",
      priority: "High",
      deadline: "2026-07-01",
      completed: false,
    },
    {
      id: 2,
      title: "Practice LeetCode",
      priority: "Medium",
      deadline: "2026-07-02",
      completed: false,
    },
  ];

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("focusflow_tasks");
    return saved ? JSON.parse(saved) : defaultTasks;
  });

  useEffect(() => {
    localStorage.setItem(
      "focusflow_tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleComplete,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}