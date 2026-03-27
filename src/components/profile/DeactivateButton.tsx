"use client"

import { useTransition, useState } from "react"
import { deactivateTask } from "@/app/profile/actions"

export default function DeactivateButton({ taskId }: { taskId: string }) {
  const [isPending, startTransition] = useTransition()
  const [showModal, setShowModal] = useState(false)

  const handleDeactivate = () => {
    startTransition(() => {
      deactivateTask(taskId).then(() => {
        setShowModal(false)
      })
    })
  }

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
          setShowModal(true)
        }}
        disabled={isPending}
        className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-colors shadow-sm ${
          isPending 
          ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed dark:bg-zinc-800 dark:text-gray-400 dark:border-zinc-700" 
          : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 active:scale-95 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/50 dark:hover:bg-red-950/40"
        }`}
      >
        {isPending ? "Խնդրում ենք սպասել..." : "Ապաակտիվացնել"}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => !isPending && setShowModal(false)}>
          <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 mb-5">
                <svg className="h-7 w-7 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-serif">
                Ապաակտիվացնե՞լ
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                Դուք վստա՞հ եք, որ ցանկանում եք ապաակտիվացնել այս հայտարարությունը: Այն կհեռացվի ընդհանուր որոնման էջից:
              </p>
              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={isPending}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-gray-200 rounded-xl font-semibold transition-colors disabled:opacity-50"
                >
                  Ոչ
                </button>
                <button
                  type="button"
                  onClick={handleDeactivate}
                  disabled={isPending}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isPending ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Այո, իհարկե"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
