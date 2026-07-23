import { useNavigate } from "react-router-dom";

export default function AICoach({ tasks = [] }) {
  const navigate = useNavigate();

  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;

  const highPriority = tasks.filter(
    (task) => task.priority === "High" && !task.completed
  ).length;

  // Productivity should be 0 when there are no tasks
  const productivity =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  let recommendation = "";

  // No tasks
  if (tasks.length === 0) {
    recommendation =
      "Add your first task to get started. Your AI Coach will analyze your workload and help you decide what to focus on.";
  }

  // Pending high-priority tasks
  else if (highPriority > 0) {
    recommendation =
      "You have high-priority work waiting. Focus on those tasks first before moving to medium or low-priority work.";
  }

  // Other pending tasks
  else if (pending > 0) {
    recommendation =
      "You're making good progress. Finish your remaining tasks to stay on schedule.";
  }

  // Tasks exist and all are completed
  else {
    recommendation =
      "Excellent work! You've completed all your tasks. Keep up the momentum!";
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-8">

      <h2 className="text-2xl font-bold mb-2">
        🤖 AI Coach
      </h2>

      <p className="text-gray-400 mb-8">
        Instant productivity insights based on your current tasks.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* Pending */}
        <div className="bg-slate-900 rounded-xl p-5">
          <p className="text-sm text-gray-400">
            Pending
          </p>

          <p className="text-3xl font-bold text-yellow-400 mt-2">
            {pending}
          </p>
        </div>

        {/* Completed */}
        <div className="bg-slate-900 rounded-xl p-5">
          <p className="text-sm text-gray-400">
            Completed
          </p>

          <p className="text-3xl font-bold text-green-400 mt-2">
            {completed}
          </p>
        </div>

        {/* High Priority */}
        <div className="bg-slate-900 rounded-xl p-5">
          <p className="text-sm text-gray-400">
            High Priority
          </p>

          <p className="text-3xl font-bold text-red-400 mt-2">
            {highPriority}
          </p>
        </div>

        {/* Productivity */}
        <div className="bg-slate-900 rounded-xl p-5">
          <p className="text-sm text-gray-400">
            Productivity
          </p>

          <p className="text-3xl font-bold text-cyan-400 mt-2">
            {productivity}%
          </p>
        </div>

      </div>

      {/* Recommendation */}
      <div className="mt-8 bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6">

        <h3 className="text-xl font-bold text-cyan-400 mb-3">
          💡 Today's Recommendation
        </h3>

        <p className="text-gray-300 leading-7">
          {recommendation}
        </p>

      </div>

      {/* AI Planner */}
      <div className="mt-8 flex justify-end">

        <button
          onClick={() => navigate("/ai-planner")}
          className="bg-cyan-500 hover:bg-cyan-600 transition-all px-6 py-3 rounded-xl font-semibold"
        >
          ✨ Open AI Planner
        </button>

      </div>

    </div>
  );
}