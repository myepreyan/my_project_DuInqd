import clsx from "clsx";
import CategoryIcon from "@/components/CategoryIcon";

interface CategoryButtonProps {
  id: string;
  name: string;
  iconId: string;
  isActive: boolean;
  onClick: () => void;
  variant: "mobile" | "desktop";
}

function splitCategoryName(name: string): { firstLine: string; secondLine: string } {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return { firstLine: words[0], secondLine: "" };
  }
  const firstLine = words[0];
  const secondLine = words.slice(1).join(" ");
  return { firstLine, secondLine };
}

export default function CategoryButton({
  name,
  iconId,
  isActive,
  onClick,
  variant,
}: CategoryButtonProps) {
  const { firstLine, secondLine } = splitCategoryName(name);

  const iconSize = variant === "mobile" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center rounded-full font-medium font-sans",
        "transition-all duration-200 active:scale-95",
        variant === "mobile" ? "gap-2 px-4 py-3 text-xs" : "gap-2 px-4 py-2 lg:px-5 lg:py-2 text-sm",
        isActive
          ? "bg-[#FFD27D] text-black shadow-md"
          : "bg-white dark:bg-zinc-900 text-black dark:text-white border border-gray-200 dark:border-zinc-800 hover:shadow-sm hover:scale-[1.02]"
      )}
    >
      <span className="flex-shrink-0">
        <CategoryIcon iconId={iconId} className={iconSize} />
      </span>
      {variant === "mobile" ? (
        <span className="flex flex-col items-start leading-tight">
          <span className="block whitespace-nowrap">{firstLine}</span>
          {secondLine && <span className="block whitespace-nowrap">{secondLine}</span>}
        </span>
      ) : (
        <span className="whitespace-nowrap">{name}</span>
      )}
    </button>
  );
}
