import { loadTasks, saveTasks } from "../utils/taskStorage";

export default function Settings() {

  const clearTasks = () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    if (!confirmDelete) return;

    saveTasks([]);

    window.location.reload();

  };

  const resetTasks = () => {

    const demoTasks = [

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

    saveTasks(demoTasks);

    window.location.reload();

  };

  const totalTasks = loadTasks().length;

  return (
    <>
          {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          ⚙️ Settings
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your application settings and productivity data.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-8">

        {/* Task Management */}

        <div className="bg-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            📋 Task Management
          </h2>

          <p className="text-gray-400 mb-6">
            Total Tasks : {totalTasks}
          </p>

          <div className="space-y-4">

            <button
              onClick={clearTasks}
              className="w-full bg-red-500 hover:bg-red-600 transition-all py-3 rounded-xl font-semibold"
            >
              🗑 Clear All Tasks
            </button>

            <button
              onClick={resetTasks}
              className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all py-3 rounded-xl font-semibold"
            >
              🔄 Restore Demo Tasks
            </button>

          </div>

        </div>

        {/* AI Status */}

        <div className="bg-slate-800 rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            🤖 AI Status
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Gemini API</span>
              <span className="text-green-400 font-semibold">
                Connected ✅
              </span>
            </div>

            <div className="flex justify-between">
              <span>Backend</span>
              <span className="text-green-400 font-semibold">
                Running ✅
              </span>
            </div>

            <div className="flex justify-between">
              <span>Local Storage</span>
              <span className="text-green-400 font-semibold">
                Active ✅
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* About */}

      <div className="mt-10 bg-slate-800 rounded-2xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          ℹ️ About FocusFlow AI
        </h2>

        <p className="text-gray-300 leading-8">

          FocusFlow AI is an AI-powered productivity and
          deadline management platform that helps users
          organize tasks, generate intelligent study/work
          plans using Google's Gemini AI, monitor productivity
          through analytics, and stay on top of deadlines.

        </p>

        <div className="mt-8 border-t border-slate-700 pt-6">

          <div className="flex justify-between">

            <span className="text-gray-400">
              Version
            </span>

            <span>
              1.0.0
            </span>

          </div>

          <div className="flex justify-between mt-3">

            <span className="text-gray-400">
              Developer
            </span>

            <span>
              Ishaan Agnihotri
            </span>

          </div>

        </div>

      </div>

    </>
  );
}