import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import Link from "next/link"
import DeactivateButton from "@/components/profile/DeactivateButton"

export default async function ActiveTasksPage() {
  const session = await getServerSession(authOptions as any) as any;
  const userId = session?.user?.id || session?.user?.sub;

  if (!userId) {
    return null;
  }

  const tasks = await db.task.findMany({
    where: {
      userId,
      status: "active"
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">


      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-6">Դուք դեռ չունեք ակտիվ առաջադրանքներ:</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="relative border border-gray-100 dark:border-white/10 rounded-2xl p-5 hover:border-red-200 dark:hover:border-red-500/30 transition-colors pl-8">
              <span className="absolute top-6 left-4 w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" title="Ակտիվ"></span>
              
              <div className="flex justify-between items-start mb-2 gap-3">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white flex-1 min-w-0 break-words break-all sm:break-normal line-clamp-2">
                  {task.title}
                </h3>
                <div className="hidden sm:block shrink-0">
                  <DeactivateButton taskId={task.id} />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                {task.description}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm font-medium text-gray-900 dark:text-white">
                  <span>{task.priceType === 'fixed' && task.price ? `Վճար: ${task.price.toLocaleString()} ֏` : 'Բանակցային վճար'}</span>
                  <Link href={`/task/${task.id}`} className="text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300 hover:underline inline-flex items-center gap-1 transition-colors w-fit">
                    Դիտել մանրամասները <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
                <div className="sm:hidden mt-2 pt-4 border-t border-gray-100 dark:border-white/10 flex justify-end">
                  <DeactivateButton taskId={task.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
