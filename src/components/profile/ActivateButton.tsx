"use client"

import { useTransition } from "react"
import { activateTask } from "@/app/profile/actions"

export default function ActivateButton({ taskId }: { taskId: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => activateTask(taskId))}
      disabled={isPending}
      className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-colors shadow-sm ${
        isPending 
        ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700" 
        : "bg-white text-lime-600 border-lime-200 hover:bg-lime-50 hover:border-lime-300 active:scale-95 dark:bg-black dark:text-lime-400 dark:border-lime-900/50 dark:hover:bg-lime-950/30"
      }`}
    >
      {isPending ? "Ակտիվանում է..." : "Ակտիվացնել"}
    </button>
  )
}
