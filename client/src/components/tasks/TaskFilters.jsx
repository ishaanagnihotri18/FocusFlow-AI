const filters = [
  "All",
  "High",
  "Medium",
  "Low",
  "Completed",
  "Pending",
];

export default function TaskFilters({
  activeFilter,
  setActiveFilter,
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-5 py-2 rounded-xl font-medium transition-all ${
            activeFilter === filter
              ? "bg-cyan-500 text-white"
              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}