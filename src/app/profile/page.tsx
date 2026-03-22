import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const session: any = await getServerSession(authOptions as any)
  
  if (!session?.user) {
    redirect('/login')
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Իմ պրոֆիլը</h1>
      
      <div className="bg-white dark:bg-black border border-black/[.08] dark:border-white/[.145] rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt={session.user.name || ""}
              className="w-20 h-20 rounded-full"
            />
          )}
          <div>
            <h2 className="text-2xl font-semibold">{session.user?.name || 'User'}</h2>
            <p className="text-black/60 dark:text-white/60">{session.user?.email}</p>
            <p className="text-sm text-black/40 dark:text-white/40 mt-1">
              Role: {session.user?.role || 'USER'}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Հաշվի տեղեկություններ</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-black/60 dark:text-white/60">ID:</span> {session.user?.id}</p>
              <p><span className="text-black/60 dark:text-white/60">Email:</span> {session.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
