export default function MyPostsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 text-center py-12">
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Դուք դեռ առաջադրանք չեք ստեղծել</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Ստեղծեք ձեր առաջին առաջադրանքը և գտեք կատարողների:</p>
      <button className="px-6 py-2.5 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full text-sm font-semibold transition-colors shadow-sm">
        + Ստեղծել Առաջադրանք
      </button>
    </div>
  )
}
