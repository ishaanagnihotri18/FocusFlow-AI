export default function AddTaskModal({
  showModal,
  setShowModal,
  newTask,
  setNewTask,
  handleAddTask,
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-slate-900 w-[450px] rounded-2xl p-8 shadow-2xl border border-slate-700">

        <h2 className="text-2xl font-bold mb-6">
          ➕ Add New Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              title: e.target.value,
            })
          }
          className="w-full bg-slate-800 rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <select
          value={newTask.priority}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              priority: e.target.value,
            })
          }
          className="w-full bg-slate-800 rounded-xl p-3 mb-4"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="date"
          value={newTask.deadline}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              deadline: e.target.value,
            })
          }
          className="w-full bg-slate-800 rounded-xl p-3 mb-6"
        />

        <div className="flex justify-end gap-4">

          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleAddTask}
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl"
          >
            Save Task
          </button>

        </div>

      </div>

    </div>
  );
}