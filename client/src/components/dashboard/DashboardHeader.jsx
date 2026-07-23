export default function DashboardHeader({
  greeting,
  pendingTasks,
  productivityScore,
  onAddTask,
}) {
  const today = new Date();

  const date = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mb-6">

      <div className="flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left */}

        <div>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {greeting} 👋
          </h1>

          <p className="text-gray-400 mt-2 text-lg">
            Stay focused and let AI plan your day.
          </p>

          <div className="flex flex-wrap gap-3 mt-5">

            <span className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 text-sm font-semibold">
              📅 {date}
            </span>

            <span className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-yellow-400 text-sm font-semibold">
              📋 {pendingTasks} Pending Tasks
            </span>

            <span className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-green-400 text-sm font-semibold">
              ⚡ {productivityScore}% Productivity
            </span>

          </div>

        </div>

        {/* Right */}

        <button
          onClick={onAddTask}
          className="bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 px-6 py-3 rounded-xl text-base font-semibold shadow-lg hover:scale-105"
        >
          + Add Task
        </button>

      </div>

    </div>
  );
}