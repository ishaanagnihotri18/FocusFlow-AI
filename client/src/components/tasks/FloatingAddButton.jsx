import { FaPlus } from "react-icons/fa";

export default function FloatingAddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-8
        right-8
        bg-cyan-500
        hover:bg-cyan-600
        text-white
        rounded-full
        shadow-xl
        px-6
        py-4
        flex
        items-center
        gap-3
        transition-all
        hover:scale-105
        z-50
      "
    >
      <FaPlus />
      <span className="font-semibold">
        Add Task
      </span>
    </button>
  );
}