export const loadTasks = () => {
  const saved = localStorage.getItem("focusflow_tasks");

  if (saved) {
    return JSON.parse(saved);
  }

  return [
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
};

export const saveTasks = (tasks) => {
  localStorage.setItem(
    "focusflow_tasks",
    JSON.stringify(tasks)
  );
};