interface CategoryIconProps {
  iconId: string;
  className?: string;
}

export default function CategoryIcon({ iconId, className = "w-5 h-5" }: CategoryIconProps) {
  const icons: Record<string, string> = {
    courier: "🚀",
    renovation: "🔨",
    cargo: "📦",
    cleaning: "🧹",
    computer: "💻",
    "photo-video": "📸",
    programming: "💾",
    "tech-install": "⚙️",
    events: "🎉",
    design: "🎨",
    "virtual-assistant": "🤝",
    "digital-repair": "🔧",
    beauty: "💅",
    "auto-repair": "🚗",
    tutoring: "📚",
  };

  return <span className={className}>{icons[iconId] || icons.courier}</span>;
}
