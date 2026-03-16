import clsx from "clsx";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onSelect: (taskId: string) => void;
}

// Format price consistently for both server and client
function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default function TaskCard({ task, onSelect }: TaskCardProps) {
  const formattedPrice = formatPrice(task.price);
  
  return (
    <button
      onClick={() => onSelect(task.id)}
      className={clsx(
        "w-full text-left p-4 rounded-xl",
        "bg-white dark:bg-zinc-900",
        "border border-gray-200 dark:border-zinc-800",
        "shadow-sm hover:shadow-md",
        "transition-all duration-200",
        "hover:scale-[1.02] active:scale-[0.98]",
        "flex flex-col gap-3"
      )}
    >
      {/* Header: Title and Price */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base md:text-lg font-bold text-black dark:text-white font-serif flex-1">
          {task.title}
        </h3>
        <span className="text-lg md:text-xl font-bold text-lime-600 dark:text-lime-500 whitespace-nowrap">
          {formattedPrice} ֏
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2">
        {task.description}
      </p>

      {/* Footer: Tag and Date */}
      <div className="flex items-center justify-between gap-3 mt-1">
        <span
          className={clsx(
            "inline-block px-3 py-1 rounded-full text-xs font-medium",
            "bg-lime-100 dark:bg-lime-900/30",
            "text-lime-800 dark:text-lime-300"
          )}
        >
          {task.tag}
        </span>
        <span className="text-xs text-gray-500 dark:text-zinc-500 whitespace-nowrap">
          {task.date}
        </span>
      </div>

      {/* Optional Location */}
      {task.location && (
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {task.location}
        </div>
      )}
    </button>
  );
}
