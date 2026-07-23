import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../utils/api";

const API_URL = `${API_BASE_URL}/api/tasks`;

export default function CalendarPage() {
  const today = new Date();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    formatDateKey(today)
  );

  // =========================
  // Helpers
  // =========================

  function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function prettyDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // =========================
  // MongoDB task helpers
  // =========================

  const getToken = () => localStorage.getItem("focusflow_token");

  const getTaskDateKey = (deadline) => {
    if (!deadline) return "";
    return String(deadline).slice(0, 10);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load calendar tasks.");
        }

        setTasks(data.tasks || []);
      } catch (error) {
        console.error("Calendar Load Error:", error);
        toast.error(error.message || "Unable to load calendar tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // =========================
  // Calendar calculations
  // =========================

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day));
  }

  // =========================
  // Selected day's tasks
  // =========================

  const selectedTasks = tasks.filter(
    (task) => getTaskDateKey(task.deadline) === selectedDate
  );

  // =========================
  // Task statistics
  // =========================

  const todayKey = formatDateKey(today);

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  );

  const overdueTasks = pendingTasks.filter(
    (task) =>
      task.deadline &&
      getTaskDateKey(task.deadline) < todayKey
  );

  const dueTodayTasks = pendingTasks.filter(
    (task) => getTaskDateKey(task.deadline) === todayKey
  );

  const upcomingTasks = useMemo(() => {
    return tasks
      .filter(
        (task) =>
          !task.completed &&
          task.deadline &&
          getTaskDateKey(task.deadline) > todayKey
      )
      .sort((a, b) =>
        getTaskDateKey(a.deadline).localeCompare(getTaskDateKey(b.deadline))
      )
      .slice(0, 5);
  }, [tasks, todayKey]);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  // =========================
  // Calendar navigation
  // =========================

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(
      new Date(today.getFullYear(), today.getMonth(), 1)
    );

    setSelectedDate(todayKey);
  };

  // =========================
  // Complete task
  // =========================

  const toggleComplete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update task.");
      }

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? data.task : task
        )
      );

      toast.success("Task updated!");
    } catch (error) {
      console.error("Calendar Toggle Error:", error);
      toast.error(error.message || "Unable to update task.");
    }
  };

  // =========================
  // Priority dot
  // =========================

  const getPriorityColor = (priority) => {
    if (priority === "High") return "bg-red-500";
    if (priority === "Medium") return "bg-yellow-400";

    return "bg-cyan-400";
  };

  // =========================
  // Render
  // =========================

  return (
    <div className="pb-10">
      {/* Page Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          📅 Deadline Planner
        </h1>

        <p className="text-gray-400 mt-2 text-lg">
          Plan your workload, track deadlines and stay ahead
          of overdue tasks.
        </p>
      </div>

      {/* Overview */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          label="Overdue"
          value={overdueTasks.length}
          valueClass="text-red-400"
        />

        <SummaryCard
          label="Due Today"
          value={dueTodayTasks.length}
          valueClass="text-yellow-400"
        />

        <SummaryCard
          label="Upcoming"
          value={upcomingTasks.length}
          valueClass="text-cyan-400"
        />

        <SummaryCard
          label="Completed"
          value={completedTasks}
          valueClass="text-green-400"
        />
      </div>

      {/* Main Planner */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar */}

        <div className="xl:col-span-2 bg-slate-800 border border-slate-700 rounded-2xl p-6">
          {/* Calendar Header */}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
            <div>
              <p className="text-sm uppercase tracking-wider text-cyan-400 font-semibold">
                Calendar
              </p>

              <h2 className="text-2xl font-bold text-white mt-1">
                {monthName}
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
              >
                Today
              </button>

              <button
                onClick={previousMonth}
                className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
              >
                ←
              </button>

              <button
                onClick={nextMonth}
                className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
              >
                →
              </button>
            </div>
          </div>

          {/* Weekdays */}

          <div className="grid grid-cols-7 mb-2">
            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
              <div
                key={day}
                className="text-center text-sm text-gray-500 font-semibold py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days */}

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((date, index) => {
              if (!date) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="min-h-[90px]"
                  />
                );
              }

              const dateKey = formatDateKey(date);

              const dayTasks = tasks.filter(
                (task) => getTaskDateKey(task.deadline) === dateKey
              );

              const isToday = dateKey === todayKey;
              const isSelected =
                dateKey === selectedDate;

              return (
                <button
                  key={dateKey}
                  onClick={() =>
                    setSelectedDate(dateKey)
                  }
                  className={`min-h-[90px] rounded-xl border p-3 text-left transition-all ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-slate-700 bg-slate-900 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-semibold ${
                        isToday
                          ? "w-7 h-7 flex items-center justify-center rounded-full bg-cyan-500 text-white"
                          : "text-gray-300"
                      }`}
                    >
                      {date.getDate()}
                    </span>

                    {dayTasks.length > 0 && (
                      <span className="text-xs text-gray-500">
                        {dayTasks.length}
                      </span>
                    )}
                  </div>

                  {/* Task indicators */}

                  <div className="flex gap-1 mt-4 flex-wrap">
                    {dayTasks.slice(0, 4).map((task) => (
                      <span
                        key={task._id}
                        title={task.title}
                        className={`w-2.5 h-2.5 rounded-full ${
                          task.completed
                            ? "bg-green-500"
                            : getPriorityColor(
                                task.priority
                              )
                        }`}
                      />
                    ))}
                  </div>

                  {dayTasks.length > 0 && (
                    <p className="text-xs text-gray-500 mt-2 truncate">
                      {dayTasks[0].title}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}

          <div className="flex flex-wrap gap-5 mt-6 pt-5 border-t border-slate-700 text-sm">
            <Legend color="bg-red-500" text="High" />
            <Legend
              color="bg-yellow-400"
              text="Medium"
            />
            <Legend color="bg-cyan-400" text="Low" />
            <Legend
              color="bg-green-500"
              text="Completed"
            />
          </div>
        </div>

        {/* Selected Day */}

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <p className="text-cyan-400 uppercase tracking-wider text-sm font-semibold">
            Selected Day
          </p>

          <h2 className="text-2xl font-bold text-white mt-2">
            {prettyDate(selectedDate)}
          </h2>

          <p className="text-gray-400 mt-2">
            {selectedTasks.length === 0
              ? "No tasks scheduled."
              : `${selectedTasks.length} ${
                  selectedTasks.length === 1
                    ? "task"
                    : "tasks"
                } due.`}
          </p>

          <div className="mt-6 space-y-4">
            {selectedTasks.length === 0 ? (
              <div className="border border-dashed border-slate-600 rounded-xl p-8 text-center">
                <div className="text-4xl">🎉</div>

                <p className="text-gray-300 mt-3 font-semibold">
                  Clear day
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  Nothing is due on this date.
                </p>
              </div>
            ) : (
              selectedTasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-slate-900 border border-slate-700 rounded-xl p-5"
                >
                  <div className="flex gap-3">
                    <span
                      className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                        task.completed
                          ? "bg-green-500"
                          : getPriorityColor(
                              task.priority
                            )
                      }`}
                    />

                    <div className="min-w-0">
                      <h3
                        className={`font-semibold ${
                          task.completed
                            ? "line-through text-gray-500"
                            : "text-white"
                        }`}
                      >
                        {task.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {task.priority} Priority
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      toggleComplete(task._id)
                    }
                    className={`w-full mt-4 py-2.5 rounded-lg font-semibold transition ${
                      task.completed
                        ? "bg-slate-700 hover:bg-slate-600 text-gray-200"
                        : "bg-cyan-500 hover:bg-cyan-600 text-white"
                    }`}
                  >
                    {task.completed
                      ? "↩ Mark Pending"
                      : "✓ Mark Complete"}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Workload Section */}

      <div className="mt-8">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-white">
            ⚡ Workload Overview
          </h2>

          <p className="text-gray-400 mt-1">
            Tasks that need your attention.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overdue */}

          <WorkloadCard
            title="🔴 Overdue"
            emptyMessage="No overdue tasks. Nice work!"
            tasks={overdueTasks.slice(0, 5)}
            type="overdue"
          />

          {/* Upcoming */}

          <WorkloadCard
            title="📌 Coming Up"
            emptyMessage="No upcoming deadlines."
            tasks={upcomingTasks}
            type="upcoming"
          />
        </div>
      </div>
    </div>
  );
}

// =========================
// Small components
// =========================

function SummaryCard({
  label,
  value,
  valueClass,
}) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
      <p className="text-gray-400">{label}</p>

      <p
        className={`text-3xl font-bold mt-2 ${valueClass}`}
      >
        {value}
      </p>
    </div>
  );
}

function Legend({ color, text }) {
  return (
    <div className="flex items-center gap-2 text-gray-400">
      <span
        className={`w-2.5 h-2.5 rounded-full ${color}`}
      />

      {text}
    </div>
  );
}

function WorkloadCard({
  title,
  tasks,
  emptyMessage,
  type,
}) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>

      {tasks.length === 0 ? (
        <p className="text-gray-400 mt-5">
          {emptyMessage}
        </p>
      ) : (
        <div className="space-y-3 mt-5">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-slate-900 rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-semibold text-white truncate">
                  {task.title}
                </p>

                <p
                  className={`text-sm mt-1 ${
                    type === "overdue"
                      ? "text-red-400"
                      : "text-gray-400"
                  }`}
                >
                  {type === "overdue"
                    ? `Overdue • ${String(task.deadline).slice(0, 10)}`
                    : `Due ${String(task.deadline).slice(0, 10)}`}
                </p>
              </div>

              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  task.priority === "High"
                    ? "bg-red-500/10 text-red-400"
                    : task.priority === "Medium"
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-cyan-500/10 text-cyan-400"
                }`}
              >
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}