interface StepIndicatorProps {
  current: number;
  total: number;
}

export default function StepIndicator({ current, total }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600 dark:text-zinc-400">
          Քայլ {current} / {total}
        </span>
        <span className="text-sm font-medium text-lime-600 dark:text-lime-500">
          {Math.round((current / total) * 100)}%
        </span>
      </div>
      
      <div className="relative">
        <div className="h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-lime-500 transition-all duration-500 ease-out"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
