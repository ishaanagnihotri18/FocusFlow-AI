export default function TaskStats({ tasks }) {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = total - completed;

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      value: total,
      color: "text-cyan-400",
      icon: "📋",
    },
    {
      title: "Completed",
      value: completed,
      color: "text-green-400",
      icon: "✅",
    },
    {
      title: "Pending",
      value: pending,
      color: "text-yellow-400",
      icon: "⏳",
    },
    {
      title: "High Priority",
      value: highPriority,
      color: "text-red-400",
      icon: "🔥",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-slate-800 rounded-2xl p-5 hover:scale-105 transition-all duration-300"
        >
          <div className="text-3xl">
            {stat.icon}
          </div>

          <h3 className="text-gray-400 mt-3">
            {stat.title}
          </h3>

          <p
            className={`text-3xl font-bold mt-2 ${stat.color}`}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}