import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import Link from "next/link"
import PublishDraftButton from "@/components/profile/PublishDraftButton"

export default async function MyDraftsPage() {
  const session: any = await getServerSession(authOptions as any)
  const userId = session?.user?.id || session?.user?.sub

  if (!userId) {
    return null
  }

  const tasks = await db.task.findMany({
    where: {
      userId,
      status: "draft"
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Սևագրեր</h2>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-6">Դուք չունեք պահպանված սևագրեր:</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="border border-gray-100 dark:border-white/10 rounded-2xl p-5 hover:border-gray-300 dark:hover:border-gray-500/30 transition-colors bg-gray-50/50 dark:bg-zinc-900/50">
              <div className="flex justify-between items-start mb-2 gap-3">
                <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300 flex-1 min-w-0 break-words break-all sm:break-normal line-clamp-2">
                  {task.title || "Անվանումը նշված չէ"}
                </h3>
                <div className="hidden sm:block shrink-0">
                  <span className="bg-gray-200 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400 text-xs px-2.5 py-1 rounded-full font-medium">
                    Սևագիր
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 line-clamp-2">
                {task.description || "Նկարագրություն չի ավելացվել"}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm font-medium text-gray-900 dark:text-white">
                  <span>{task.priceType === 'fixed' && task.price ? `Վճար: ${task.price.toLocaleString()} ֏` : 'Բանակցային վճար'}</span>
                  <Link href={`/create-task/edit/${task.id}`} className="text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300 hover:underline inline-flex items-center gap-1 transition-colors w-fit">
                    Շարունակել լրացումը <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
                {/* Desktop Publish Button */}
                <div className="hidden sm:block shrink-0">
                  <PublishDraftButton taskId={task.id} />
                </div>
                {/* Mobile Badge & Publish Button */}
                <div className="sm:hidden mt-2 pt-4 border-t border-gray-100 dark:border-white/10 flex justify-between items-center">
                  <span className="bg-gray-200 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400 text-xs px-2.5 py-1 rounded-full font-medium">
                    Սևագիր
                  </span>
                  <PublishDraftButton taskId={task.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
