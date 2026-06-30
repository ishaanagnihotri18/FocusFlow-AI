export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          bg-slate-800
          border
          border-slate-700
          rounded-xl
          p-4
          text-white
          outline-none
          focus:border-cyan-400
          transition-all
        "
      />
    </div>
  );
}