import {
  FaHome,
  FaTasks,
  FaRobot,
  FaChartBar,
  FaCog,
  FaPlus,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 p-6">
        <h1 className="text-3xl font-bold text-cyan-400 mb-10">
          FocusFlow AI
        </h1>

        <nav className="space-y-5">
          <div className="flex items-center gap-3 text-cyan-400 cursor-pointer">
            <FaHome />
            Dashboard
          </div>

          <div className="flex items-center gap-3 hover:text-cyan-400 cursor-pointer">
            <FaTasks />
            Tasks
          </div>

          <div className="flex items-center gap-3 hover:text-cyan-400 cursor-pointer">
            <FaRobot />
            AI Planner
          </div>

          <div className="flex items-center gap-3 hover:text-cyan-400 cursor-pointer">
            <FaChartBar />
            Analytics
          </div>

          <div className="flex items-center gap-3 hover:text-cyan-400 cursor-pointer">
            <FaCog />
            Settings
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-bold">
            Welcome Back 👋
          </h2>

          <button className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl flex items-center gap-2">
            <FaPlus />
            Add Task
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-6 mt-10">
          <div className="bg-slate-800 rounded-2xl p-6">
            <h3 className="text-gray-400">Today's Tasks</h3>
            <p className="text-4xl font-bold mt-3">8</p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6">
            <h3 className="text-gray-400">Completed</h3>
            <p className="text-4xl font-bold text-green-400 mt-3">5</p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6">
            <h3 className="text-gray-400">Pending</h3>
            <p className="text-4xl font-bold text-yellow-400 mt-3">3</p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6">
            <h3 className="text-gray-400">AI Score</h3>
            <p className="text-4xl font-bold text-cyan-400 mt-3">92%</p>
          </div>
        </div>

        {/* AI Panel */}
        <div className="bg-slate-800 rounded-2xl mt-10 p-8">
          <h2 className="text-2xl font-bold mb-3">
            🤖 AI Productivity Coach
          </h2>

          <p className="text-gray-300">
            Good morning! You have <b>3 high-priority tasks</b> today.
            Complete your Machine Learning Assignment first to avoid missing
            tomorrow's deadline.
          </p>

          <button className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl">
            Generate AI Plan
          </button>
        </div>
      </main>
    </div>
  );
}