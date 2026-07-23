import {
  FaCheckCircle,
  FaRegCircle,
  FaTrash,
} from "react-icons/fa";

export default function TaskCard({
  task,
  toggleComplete,
  deleteTask,
}) {
  const priorityColor = {
    High: "bg-red-500",
    Medium: "bg-yellow-500 text-black",
    Low: "bg-green-500",
  };

  const getRisk = () => {
    // Completed tasks are no longer at risk
    if (task.completed) {
      return "✅ Completed";
    }

    if (!task.deadline) {
      return "⚪ No Deadline";
    }

    // Use local midnight to avoid time-related errors
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(
      `${task.deadline}T00:00:00`
    );

    if (isNaN(deadline.getTime())) {
      return "⚪ Unknown Deadline";
    }

    const diff = Math.round(
      (deadline - today) /
        (1000 * 60 * 60 * 24)
    );

    if (diff < 0) {
      return "🔴 Overdue";
    }

    if (diff <= 1) {
      return "🔴 High Risk";
    }

    if (diff <= 3) {
      return "🟡 Medium Risk";
    }

    return "🟢 Low Risk";
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-5 flex justify-between items-center hover:shadow-lg hover:shadow-cyan-500/10 transition-all">
      {/* Left */}

      <div className="flex items-start gap-4">
        <button
          onClick={() => toggleComplete(task.id)}
          className="mt-1 text-cyan-400 text-xl"
          title={
            task.completed
              ? "Mark as pending"
              : "Mark as completed"
          }
        >
          {task.completed ? (
            <FaCheckCircle />
          ) : (
            <FaRegCircle />
          )}
        </button>

        <div>
          <h3
            className={`text-xl font-semibold ${
              task.completed
                ? "line-through text-gray-500"
                : "text-white"
            }`}
          >
            {task.title}
          </h3>

          <p className="text-gray-400 mt-1">
            📅 Deadline: {task.deadline}
          </p>

          <p className="text-sm mt-2 text-gray-300">
            {getRisk()}
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        <span
          className={`px-4 py-2 rounded-xl font-semibold ${
            priorityColor[task.priority] ??
            "bg-slate-600"
          }`}
        >
          {task.priority}
        </span>

        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-400 hover:text-red-500 text-lg transition"
          title="Delete task"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}