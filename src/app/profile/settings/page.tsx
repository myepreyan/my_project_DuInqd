import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const session: any = await getServerSession(authOptions as any)
  if (!session?.user) redirect('/login')
  const user = session.user

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Կարգավորումներ</h2>
      <form className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Անուն</label>
          <input type="text" defaultValue={user?.name || ""} className="w-full px-4 py-2 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Էլ․ փոստ</label>
          <input type="email" defaultValue={user?.email || ""} disabled className="w-full px-4 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-500 cursor-not-allowed" />
        </div>
        <button type="submit" className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors mt-4">
          Պահպանել Փոփոխությունները
        </button>
        <div className="pt-8 mt-8 border-t border-gray-100 dark:border-white/10">
          <button type="button" className="text-red-500 font-medium text-sm hover:underline">
            Դուրս գալ համակարգից
          </button>
        </div>
      </form>
    </div>
  )
}
