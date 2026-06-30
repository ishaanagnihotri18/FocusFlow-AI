import {
  FaHome,
  FaTasks,
  FaRobot,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    icon: <FaHome />,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: <FaTasks />,
    label: "Tasks",
    path: "/tasks",
  },
  {
    icon: <FaRobot />,
    label: "AI Planner",
    path: "/ai-planner",
  },
  {
    icon: <FaChartBar />,
    label: "Analytics",
    path: "/analytics",
  },
  {
    icon: <FaCog />,
    label: "Settings",
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">

      <h1 className="text-3xl font-bold text-cyan-400 mb-12">
        FocusFlow AI
      </h1>

      <nav className="space-y-3">

        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-cyan-500 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>

            <span>{item.label}</span>
          </NavLink>
        ))}

      </nav>

      <div className="mt-16 bg-slate-800 rounded-xl p-4">

        <h3 className="font-semibold text-cyan-400">
          AI Productivity
        </h3>

        <p className="text-sm text-gray-400 mt-2">
          Stay ahead of deadlines with Gemini-powered planning.
        </p>

      </div>

    </aside>
  );
}