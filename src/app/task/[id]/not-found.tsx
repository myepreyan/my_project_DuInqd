import Link from "next/link";

export default function TaskNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-200 dark:text-zinc-800 mb-4">404</div>
        <h1 className="text-2xl font-bold text-black dark:text-white mb-2">Հայտարարությունը չի գտնվել</h1>
        <p className="text-gray-500 dark:text-zinc-400 mb-6">
          Հայտարարությունը կամ ջնջված է, կամ դեռ ակտիվ չէ
        </p>
        <Link
          href="/find-task"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-xl transition-colors"
        >
          ← Վերադառնալ ցանկ
        </Link>
      </div>
    </div>
  );
}
