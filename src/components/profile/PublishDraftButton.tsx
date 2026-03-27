"use client"

import { useTransition, useState } from "react"
import { publishDraft } from "@/app/profile/actions"

export default function PublishDraftButton({ taskId }: { taskId: string }) {
  const [isPending, startTransition] = useTransition()
  const [showModal, setShowModal] = useState(false)

  const handlePublish = () => {
    startTransition(() => {
      publishDraft(taskId).then(() => {
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
        className={`flex items-center justify-center p-2 rounded-full transition-colors ${
          isPending
          ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-zinc-800"
          : "bg-lime-50 text-lime-600 hover:bg-lime-100 hover:text-lime-700 active:scale-95 dark:bg-lime-950/30 dark:text-lime-400 dark:hover:bg-lime-900/50"
        }`}
        title="Հրապարակել"
      >
        {isPending ? (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        )}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => !isPending && setShowModal(false)}>
          <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-900/20 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-lime-600 dark:text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-serif">
                Հրապարակե՞լ
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                Ցանկանո՞ւմ եք հրապարակել այս սևագիրը։ Այն կհայտնվի «Իմ հայտարարությունները» բաժնում։
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
                  onClick={handlePublish}
                  disabled={isPending}
                  className="flex-1 px-4 py-3 bg-lime-500 hover:bg-lime-600 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {isPending ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Այո"
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
