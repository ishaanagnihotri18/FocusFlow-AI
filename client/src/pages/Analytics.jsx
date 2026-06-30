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

  // ==========================
  // Load Tasks
  // ==========================

  const tasks = loadTasks();

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

  const mediumPriority =
    tasks.filter(task => task.priority === "Medium").length;

  const lowPriority =
    tasks.filter(task => task.priority === "Low").length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  // ==========================
  // Chart Data
  // ==========================

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

  const COLORS = [
    "#22c55e",
    "#eab308",
  ];

  return (
    <>
          {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          📊 Analytics Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Monitor your productivity and gain AI-powered insights.
        </p>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-slate-800 rounded-2xl p-6">
          <h3 className="text-gray-400">Total Tasks</h3>
          <p className="text-4xl font-bold text-cyan-400 mt-2">
            {totalTasks}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h3 className="text-gray-400">Completed</h3>
          <p className="text-4xl font-bold text-green-400 mt-2">
            {completedTasks}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h3 className="text-gray-400">Pending</h3>
          <p className="text-4xl font-bold text-yellow-400 mt-2">
            {pendingTasks}
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <h3 className="text-gray-400">Completion Rate</h3>
          <p className="text-4xl font-bold text-cyan-400 mt-2">
            {completionRate}%
          </p>
        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-2 gap-8">

        {/* Pie Chart */}

        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            📈 Task Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >

                {pieData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Priority Chart */}

        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            🔥 Priority Distribution
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={priorityData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="priority" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="tasks"
                fill="#06b6d4"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>
            {/* AI Productivity Insights */}

      <div className="mt-10 bg-slate-800 rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          🤖 AI Productivity Insights
        </h2>

        <ul className="space-y-4 text-gray-300">

          <li>
            • Your current completion rate is
            <span className="text-cyan-400 font-bold">
              {" "} {completionRate}%.
            </span>
          </li>

          <li>
            • You have
            <span className="text-red-400 font-bold">
              {" "} {highPriority}
            </span>
            {" "}high-priority task(s).
          </li>

          <li>
            • Completing high-priority tasks first will improve your productivity score.
          </li>

          <li>
            • Keep your completion rate above
            <span className="text-green-400 font-bold">
              {" "}80%
            </span>
            {" "}for maximum productivity.
          </li>

        </ul>

      </div>

    </>
  );
}