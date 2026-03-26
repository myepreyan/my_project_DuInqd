export default function ActiveTasksPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Ընթացիկ Առաջադրանքներ</h2>
      <div className="border border-gray-100 dark:border-white/10 rounded-2xl p-5 hover:border-red-200 dark:hover:border-red-500/30 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            Թարգմանել 10 էջանոց տեքստ անգլերենից հայերեն
          </h3>
          <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300 text-xs px-2.5 py-1 rounded-full font-medium">
            Ընթացքի մեջ է
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          Տեքստը պարունակում է տեխնիկական տերմիններ IT ոլորտից: Անհրաժեշտ է ճշգրիտ և գրագետ թարգմանություն։
        </p>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-900 dark:text-white">
          <span>Վճար: 15,000 ֏</span>
          <span className="text-red-500 cursor-pointer hover:underline">Դիտել մանրամասները &rarr;</span>
        </div>
      </div>
    </div>
  )
}
