import {
  FaHome,
  FaTasks,
  FaRobot,
  FaChartBar,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

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
    icon: <FaCalendarAlt />,
    label: "Calendar",
    path: "/calendar",
  },
  {
    icon: <FaCog />,
    label: "Settings",
    path: "/settings",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  // =========================
  // Logout
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("focusflow_token");
    localStorage.removeItem("focusflow_user");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">

      {/* Logo */}

      <h1 className="text-3xl font-bold text-cyan-400 mb-12">
        FocusFlow AI
      </h1>

      {/* Navigation */}

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
            <span className="text-lg">
              {item.icon}
            </span>

            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* AI Productivity */}

      <div className="mt-16 bg-slate-800 rounded-xl p-4">
        <h3 className="font-semibold text-cyan-400">
          AI Productivity
        </h3>

        <p className="text-sm text-gray-400 mt-2">
          Stay ahead of deadlines with
          Gemini-powered planning.
        </p>
      </div>

      {/* Logout */}

      <button
        onClick={handleLogout}
        className="mt-6 w-full flex items-center gap-4 p-4 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
      >
        <FaSignOutAlt className="text-lg" />

        <span>Logout</span>
      </button>

    </aside>
  );
}