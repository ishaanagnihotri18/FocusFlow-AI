import React from "react";

export default function TaskProgress({
  totalTasks,
  completedTasks,
  productivityScore,
}) {
  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-xl font-bold text-white">
            📈 Task Progress
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Track today's completion
          </p>

        </div>

        <div className="text-3xl">
          🚀
        </div>

      </div>

      {/* Progress */}
      <div className="mt-6">

        <div className="flex justify-between mb-2 text-sm">

          <span className="text-gray-400">
            Progress
          </span>

          <span className="text-cyan-400 font-semibold">
            {progress}%
          </span>

        </div>

        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">

          <div
            className="h-3 rounded-full bg-cyan-500 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />

        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-slate-800 rounded-xl p-4 text-center">

          <p className="text-3xl font-bold text-green-400">
            {completedTasks}
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Completed
          </p>

        </div>

        <div className="bg-slate-800 rounded-xl p-4 text-center">

          <p className="text-3xl font-bold text-yellow-400">
            {totalTasks - completedTasks}
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Remaining
          </p>

        </div>

      </div>

      {/* Footer */}
      <div className="mt-6 border-t border-slate-800 pt-4 flex justify-between items-center">

        <div>

          <p className="text-sm text-gray-400">
            Productivity Score
          </p>

          <p className="text-lg font-bold text-cyan-400">
            {productivityScore}%
          </p>

        </div>

        <div className="text-right">

          <p className="text-sm text-gray-400">
            Tasks
          </p>

          <p className="text-lg font-bold text-white">
            {completedTasks} / {totalTasks}
          </p>

        </div>

      </div>

    </div>
  );
}