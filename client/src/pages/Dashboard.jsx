import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import StatsCards from "../components/StatsCards";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import AICoach from "../components/AICoach";

export default function Dashboard() {

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

  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Medium",
    deadline: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "focusflow_tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const handleAddTask = () => {

    if (
      !newTask.title.trim() ||
      !newTask.deadline
    ) {
      toast.warning("Please fill all fields!");
      return;
    }

    const task = {
      id: Date.now(),
      title: newTask.title,
      priority: newTask.priority,
      deadline: newTask.deadline,
      completed: false,
    };

    setTasks(prev => [...prev, task]);

    toast.success("Task added successfully!");

    setNewTask({
      title: "",
      priority: "Medium",
      deadline: "",
    });

    setShowModal(false);

  };

  const toggleComplete = (id) => {

    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );

  };

  const deleteTask = (id) => {

    setTasks(prev =>
      prev.filter(task => task.id !== id)
    );

    toast.success("Task deleted!");

  };

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning, Ishaan"
      : hour < 17
      ? "Good Afternoon, Ishaan"
      : "Good Evening, Ishaan";

  const completed =
    tasks.filter(t => t.completed).length;

  const score =
    tasks.length === 0
      ? 100
      : Math.round((completed / tasks.length) * 100);

  return (
    <>

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            {greeting} 👋
          </h1>

          <p className="text-gray-400 mt-2">
            Stay focused and let AI plan your day.
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-cyan-500 hover:bg-cyan-600 transition-all px-6 py-3 rounded-xl font-semibold"
        >
          + Add Task
        </button>

      </div>

      <StatsCards tasks={tasks} />

      {/* Premium Widgets */}

      <div className="grid grid-cols-2 gap-6 mt-10">

        {/* Productivity */}

        <div className="bg-slate-800 rounded-2xl p-8">

          <h2 className="text-xl font-bold mb-6">
            ⭕ Productivity Score
          </h2>

          <div className="w-36 h-36 mx-auto rounded-full border-[10px] border-cyan-500 flex items-center justify-center">

            <span className="text-4xl font-bold text-cyan-400">
              {score}%
            </span>

          </div>

         <p className="text-center text-gray-400 mt-6">
  {score >= 80
    ? "Excellent Productivity 🚀"
    : score >= 50
    ? "Good Progress 👍"
    : "Let's Get Moving 💪"}
</p>

        </div>

        {/* Upcoming Deadlines */}

        <div className="bg-slate-800 rounded-2xl p-8">

          <h2 className="text-xl font-bold mb-6">
            🔥 Upcoming Deadlines
          </h2>

          <div className="space-y-4">

            {tasks
              .filter(task => !task.completed)
              .sort(
                (a, b) =>
                  new Date(a.deadline) -
                  new Date(b.deadline)
              )
              .slice(0, 3)
              .map(task => (

                <div
                  key={task.id}
                  className="bg-slate-900 rounded-xl p-4 flex justify-between items-center"
                >

                  <div>

                    <h3 className="font-semibold">
                      {task.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {task.deadline}
                    </p>

                  </div>

                  <span className={`font-bold ${
                    task.priority === "High"
                      ? "text-red-400"
                      : task.priority === "Medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}>
                    {task.priority}
                  </span>

                </div>

              ))}

          </div>

        </div>

      </div>

      {/* AI Coach */}

      <div className="mt-12">

        <AICoach tasks={tasks} />

        <div className="mt-4 bg-cyan-500/10 border border-cyan-400 rounded-xl p-4">

          <h3 className="font-bold text-cyan-300">
            ⚡ AI Daily Focus
          </h3>

          <p className="text-gray-300 mt-2 leading-7">
            Prioritize high-priority tasks first, complete medium-priority
            tasks after lunch, and reserve your evenings for revision,
            planning, or learning.
          </p>

        </div>

      </div>

      {/* Today's Tasks */}

      <div className="mt-12">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Today's Tasks
          </h2>

          <span className="text-gray-400">
            {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"}
          </span>

        </div>

        {tasks.length === 0 ? (

          <div className="bg-slate-800 rounded-2xl p-10 text-center">

            <h3 className="text-2xl font-bold">
              🚀 Ready to get productive?
            </h3>

            <p className="text-gray-400 mt-3">
              Add your first task and let Gemini generate your personalized plan.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {tasks.map(task => (

              <TaskCard
                key={task.id}
                task={task}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
              />

            ))}

          </div>

        )}

      </div>

      {/* Bottom Cards */}

      <div className="mt-12 grid grid-cols-2 gap-6">

        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-bold mb-5">
            📈 Productivity Insights
          </h2>

          <ul className="space-y-4">

            <li>
              ✅ Completed :
              <span className="text-green-400 font-bold ml-2">
                {completed}
              </span>
            </li>

            <li>
              ⏳ Pending :
              <span className="text-yellow-400 font-bold ml-2">
                {tasks.length - completed}
              </span>
            </li>

            <li>
              🔥 High Priority :
              <span className="text-red-400 font-bold ml-2">
                {tasks.filter(t => t.priority === "High").length}
              </span>
            </li>

            <li>
              📊 Productivity :
              <span className="text-cyan-400 font-bold ml-2">
                {score}%
              </span>
            </li>

          </ul>

        </div>

        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-bold mb-5">
            💡 Smart Suggestions
          </h2>

          <ul className="space-y-4 text-gray-300">

            <li>• Complete high priority tasks first.</li>

            <li>• Break large tasks into smaller ones.</li>

            <li>• Use AI Planner every morning.</li>

            <li>• Review tomorrow's work before sleeping.</li>

            <li>• Stay consistent rather than working in long bursts.</li>

          </ul>

        </div>

      </div>

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