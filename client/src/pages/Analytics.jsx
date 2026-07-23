import { loadTasks } from "../utils/taskStorage";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Analytics() {
  // =========================
  // Load Tasks
  // =========================

  const tasks = loadTasks();

  // =========================
  // Statistics
  // =========================

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const highPriority = tasks.filter(
    (task) =>
      task.priority === "High" && !task.completed
  ).length;

  const mediumPriority = tasks.filter(
    (task) =>
      task.priority === "Medium" && !task.completed
  ).length;

  const lowPriority = tasks.filter(
    (task) =>
      task.priority === "Low" && !task.completed
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  // =========================
  // Chart Data
  // =========================

  const pieData = [
    {
      name: "Completed",
      value: completedTasks,
    },
    {
      name: "Pending",
      value: pendingTasks,
    },
  ];

  const priorityData = [
    {
      priority: "High",
      tasks: highPriority,
    },
    {
      priority: "Medium",
      tasks: mediumPriority,
    },
    {
      priority: "Low",
      tasks: lowPriority,
    },
  ];

  const COLORS = ["#22c55e", "#eab308"];

  // =========================
  // Productivity insight
  // =========================

  const getCompletionInsight = () => {
    if (totalTasks === 0) {
      return "Add some tasks to start tracking your productivity.";
    }

    if (completionRate === 100) {
      return "Excellent work — you've completed your entire current workload.";
    }

    if (completionRate >= 75) {
      return "You're close to clearing your workload. Keep the momentum going.";
    }

    if (completionRate >= 50) {
      return "You're making steady progress. Focus on your remaining tasks.";
    }

    return "You still have a significant part of your workload remaining.";
  };

  const getPriorityInsight = () => {
    if (pendingTasks === 0) {
      return "You have no pending tasks right now.";
    }

    if (highPriority > 0) {
      return `You have ${highPriority} pending high-priority ${
        highPriority === 1 ? "task" : "tasks"
      }. Prioritize ${
        highPriority === 1 ? "it" : "them"
      } first.`;
    }

    return "You currently have no pending high-priority tasks.";
  };

  // =========================
  // UI
  // =========================

  return (
    <>
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          📊 Analytics Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Understand your workload, priorities and task
          completion progress.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-slate-800 rounded-2xl p-6">
          <h3 className="text-gray-400">
            Total Tasks
          </h3>

          <p className="text-4xl font-bold text-cyan-400 mt-2">
            {totalTasks}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h3 className="text-gray-400">
            Completed
          </h3>

          <p className="text-4xl font-bold text-green-400 mt-2">
            {completedTasks}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h3 className="text-gray-400">
            Pending
          </h3>

          <p className="text-4xl font-bold text-yellow-400 mt-2">
            {pendingTasks}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h3 className="text-gray-400">
            Completion Rate
          </h3>

          <p className="text-4xl font-bold text-cyan-400 mt-2">
            {completionRate}%
          </p>
        </div>
      </div>

      {/* Charts */}

      {totalTasks === 0 ? (
        <div className="bg-slate-800 rounded-2xl p-10 text-center mb-10">
          <div className="text-5xl mb-4">📊</div>

          <h2 className="text-xl font-bold">
            No analytics yet
          </h2>

          <p className="text-gray-400 mt-2">
            Add tasks to start generating productivity
            analytics.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Task Status */}

          <div className="bg-slate-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-2">
              📈 Task Status
            </h2>

            <p className="text-gray-400 text-sm mb-4">
              Completed vs pending workload.
            </p>

            <ResponsiveContainer
              width="100%"
              height={260}
            >
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Priority Distribution */}

          <div className="bg-slate-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-2">
              🔥 Pending Priority Distribution
            </h2>

            <p className="text-gray-400 text-sm mb-4">
              Priority breakdown of unfinished tasks.
            </p>

            <ResponsiveContainer
              width="100%"
              height={260}
            >
              <BarChart data={priorityData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#475569"
                />

                <XAxis
                  dataKey="priority"
                  stroke="#94a3b8"
                />

                <YAxis
                  allowDecimals={false}
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Bar
                  dataKey="tasks"
                  fill="#06b6d4"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Productivity Insights */}

      <div className="mt-10 bg-slate-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-cyan-400">
          💡 Productivity Insights
        </h2>

        <p className="text-gray-400 mt-2 mb-6">
          Insights calculated from your current task data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Progress */}

          <div className="bg-slate-900 rounded-xl p-5">
            <p className="text-gray-400 text-sm">
              PROGRESS
            </p>

            <p className="text-gray-200 mt-3 leading-7">
              {getCompletionInsight()}
            </p>
          </div>

          {/* Priority */}

          <div className="bg-slate-900 rounded-xl p-5">
            <p className="text-gray-400 text-sm">
              PRIORITY
            </p>

            <p className="text-gray-200 mt-3 leading-7">
              {getPriorityInsight()}
            </p>
          </div>

          {/* Next Goal */}

          <div className="bg-slate-900 rounded-xl p-5">
            <p className="text-gray-400 text-sm">
              NEXT GOAL
            </p>

            <p className="text-gray-200 mt-3 leading-7">
              {pendingTasks === 0
                ? "Your current workload is complete. Add your next task when you're ready."
                : pendingTasks === 1
                ? "Complete your final pending task to reach 100%."
                : `Complete one of your ${pendingTasks} pending tasks to improve your completion rate.`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}