import clsx from "clsx";

interface SubcategoryButtonProps {
  name: string;
  onClick: () => void;
}

export default function SubcategoryButton({ name, onClick }: SubcategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "text-left px-3 md:px-4 py-2 md:py-3",
        "rounded-lg md:rounded-xl",
        "text-xs md:text-sm font-sans font-medium",
        "bg-gray-50 dark:bg-zinc-800",
        "hover:bg-gray-100 dark:hover:bg-zinc-700",
        "text-gray-700 dark:text-zinc-300",
        "hover:text-black dark:hover:text-white",
        "transition-all duration-200",
        "hover:scale-105 active:scale-95 hover:shadow-md",
        "border border-transparent hover:border-gray-300 dark:hover:border-zinc-600"
      )}
    >
      {name}
    </button>
  );
}
