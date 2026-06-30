import { FaCheckCircle, FaRegCircle, FaTrash } from "react-icons/fa";

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
    const today = new Date();
    const deadline = new Date(task.deadline);

    if (isNaN(deadline.getTime())) return "Unknown";

    const diff = Math.ceil(
      (deadline - today) / (1000 * 60 * 60 * 24)
    );

    if (diff <= 1) return "🔴 High Risk";
    if (diff <= 3) return "🟡 Medium Risk";
    return "🟢 Low Risk";
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-5 flex justify-between items-center hover:shadow-lg hover:shadow-cyan-500/10 transition-all">

      <div className="flex items-start gap-4">

        <button
          onClick={() => toggleComplete(task.id)}
          className="mt-1 text-cyan-400 text-xl"
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
                : ""
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

      <div className="flex items-center gap-3">

        <span
          className={`px-4 py-2 rounded-xl font-semibold ${
            priorityColor[task.priority]
          }`}
        >
          {task.priority}
        </span>

        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-400 hover:text-red-500 text-lg"
        >
          <FaTrash />
        </button>

      </div>

    </div>
  );
}