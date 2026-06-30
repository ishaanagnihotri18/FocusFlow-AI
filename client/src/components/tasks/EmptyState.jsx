import { FaClipboardList } from "react-icons/fa";

export default function EmptyState() {
  return (
    <div className="bg-slate-800 rounded-2xl p-12 text-center border border-slate-700">

      <div className="flex justify-center mb-6">
        <div className="bg-slate-700 p-5 rounded-full">
          <FaClipboardList className="text-5xl text-cyan-400" />
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-3">
        No Tasks Found
      </h2>

      <p className="text-gray-400 max-w-md mx-auto leading-7">
        You don't have any tasks matching the selected filter.
        Try changing the filter or add a new task to get started.
      </p>

    </div>
  );
}