export default function StatsCards({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const aiScore =
    totalTasks === 0
      ? 100
      : Math.round((completedTasks / totalTasks) * 100);

  const cards = [
    {
      title: "Today's Tasks",
      value: totalTasks,
      color: "text-white",
    },
    {
      title: "Completed",
      value: completedTasks,
      color: "text-green-400",
    },
    {
      title: "Pending",
      value: pendingTasks,
      color: "text-yellow-400",
    },
    {
      title: "AI Score",
      value: `${aiScore}%`,
      color: "text-cyan-400",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mt-10">

      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-800 rounded-2xl p-6 hover:scale-105 transition-all duration-300"
        >
          <h3 className="text-gray-400">
            {card.title}
          </h3>

          <p className={`text-4xl font-bold mt-3 ${card.color}`}>
            {card.value}
          </p>
        </div>
      ))}

    </div>
  );
}