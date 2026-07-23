import React from "react";

export default function TodaysFocus({
  pendingTasks,
  highPriorityTasks,
  overdueTasks,
  totalTasks,
  completedTasks,
  productivityScore,
  aiRecommendation,
  loading,
  onGeneratePlan,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            🤖 Today's Focus
          </h2>

          <p className="text-gray-400 mt-2 text-lg">
            AI has analyzed your tasks.
          </p>
        </div>

        <div className="text-5xl">🎯</div>
      </div>

      {/* AI Recommendation */}
      <div className="mt-6 bg-slate-800 rounded-xl p-5 border border-slate-700">

        <h3 className="text-cyan-400 font-semibold mb-3">
          💡 AI Recommendation
        </h3>

        <p className="text-gray-200 leading-8 text-lg">
          {aiRecommendation}
        </p>

      </div>

      {/* Progress */}
      <div className="mt-6">

        <div className="flex justify-between mb-2">

          <span className="text-gray-400">
            Today's Progress
          </span>

          <span className="text-cyan-400 font-semibold">
            {productivityScore}%
          </span>

        </div>

        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">

          <div
            className="bg-cyan-500 h-3 rounded-full transition-all duration-700"
            style={{ width: `${productivityScore}%` }}
          />

        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <div className="bg-slate-800 rounded-xl p-5 text-center">

          <p className="text-4xl font-bold text-cyan-400">
            {pendingTasks}
          </p>

          <p className="text-gray-400 mt-2">
            Pending
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-5 text-center">

          <p className="text-4xl font-bold text-red-400">
            {highPriorityTasks}
          </p>

          <p className="text-gray-400 mt-2">
            High Priority
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-5 text-center">

          <p className="text-4xl font-bold text-yellow-400">
            {overdueTasks}
          </p>

          <p className="text-gray-400 mt-2">
            Overdue
          </p>

        </div>

      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6 border-t border-slate-800 pt-5">

        <div className="text-center">

          <p className="text-gray-400 text-sm">
            📋 Total Tasks
          </p>

          <p className="text-2xl font-bold text-white mt-1">
            {totalTasks}
          </p>

        </div>

        <div className="text-center">

          <p className="text-gray-400 text-sm">
            ✅ Completed
          </p>

          <p className="text-2xl font-bold text-green-400 mt-1">
            {completedTasks}
          </p>

        </div>

        <div className="text-center">

          <p className="text-gray-400 text-sm">
            🎯 Productivity
          </p>

          <p className="text-2xl font-bold text-cyan-400 mt-1">
            {productivityScore}%
          </p>

        </div>

      </div>

      {/* Button */}
      <button
        onClick={onGeneratePlan}
        disabled={loading}
        className={`mt-8 w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
          loading
            ? "bg-slate-700 cursor-not-allowed"
            : "bg-cyan-500 hover:bg-cyan-600 hover:scale-[1.01]"
        }`}
      >
        {loading ? "🤖 Generating AI Plan..." : "⚡ Generate AI Plan"}
      </button>

    </div>
  );
}