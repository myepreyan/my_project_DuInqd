import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import ProfileTabs from "@/components/profile/ProfileTabs"

export const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
)

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const session: any = await getServerSession(authOptions as any)
  
  if (!session?.user) {
    redirect('/login')
  }
  
  const user = session.user
  const defaultAvatar = "https://ui-avatars.com/api/?name=" + (user?.name || "User") + "&background=random"

  return (
    <div className="min-h-[60vh] md:min-h-[calc(100vh-250px)] bg-gray-50/50 dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          
          {/* Left Column: Profile Card */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-3xl p-6 shadow-lg shadow-black/5 sticky top-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white dark:border-zinc-800 shadow-md">
                  <img src={user?.image || defaultAvatar} alt={user?.name || "User"} className="w-full h-full object-cover" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.name || "Անհայտ Օգտատեր"}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {user?.role === "USER" ? "Օգտատեր" : user?.role || "Օգտատեր"}
                </p>
                <div className="flex items-center gap-1 mt-3 bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                  <StarIcon />
                  <span>4.8 (12 կարծիք)</span>
                </div>
              </div>

              <hr className="my-6 border-gray-100 dark:border-white/10" />

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-1">Կապ</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200 break-all">{user?.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-1">Անդամագրվել է</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200">Մարտ 2026</p>
                </div>
              </div>

              <button className="w-full mt-8 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                Խմբագրել պրոֆիլը
              </button>
            </div>
          </div>

          {/* Right Column: Main Content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <ProfileTabs />
            <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm min-h-[400px]">
              {children}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
