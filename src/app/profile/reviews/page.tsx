import { StarIcon } from "../layout"

export default function ReviewsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Կարծիքներ և Գնահատականներ</h2>
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="border-b border-gray-100 dark:border-white/10 pb-6 last:border-0 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 font-bold">
                  Ա
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">Արմեն Գ.</p>
                  <p className="text-xs text-gray-500">2 օր առաջ</p>
                </div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => <StarIcon key={star} />)}
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Շատ պատասխանատու և արագ աշխատող մարդ։ Առաջադրանքը կատարվեց նշված ժամկետից շուտ։ Միանշանակ խորհուրդ եմ տալիս։
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
