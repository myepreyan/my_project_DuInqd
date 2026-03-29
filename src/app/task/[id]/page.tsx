import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "@/data/categories";
import ImageGallery from "@/components/task/ImageGallery";
import ShareButton from "@/components/task/ShareButton";

export const dynamic = "force-dynamic";

function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function formatDeadline(deadline?: string | null): string {
  const map: Record<string, string> = {
    urgent: "\u0547\u057f\u0561\u057a (24 \u056a)",
    normal: "\u054d\u0578\u057e\u0578\u0580\u0561\u056f\u0561\u0576 (2-3 \u0585\u0580)",
    flexible: "\u0543\u056f\u0578\u0582\u0576",
    specific: "\u053f\u0578\u0576\u056f\u0580\u0565\u057f \u0561\u0574\u057d\u0561\u0569\u056b\u057e",
  };
  return deadline ? (map[deadline] ?? deadline) : "\u0546\u0577\u057e\u0561\u056e \u0579\u0567";
}

function formatMemberSince(date: Date): string {
  return date.toLocaleDateString("hy-AM", {
    month: "long",
    year: "numeric",
  });
}

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await db.task.findUnique({
    where: { id },
    include: { user: { select: { name: true, image: true, createdAt: true } } },
  });

  if (!task || task.status !== "active") {
    notFound();
  }

  const category = categories.find((c) => c.id === task.categoryId);
  const subcategory = category?.subcategories.find(
    (s) => s.id === task.subcategoryId
  );

  const formattedDate = new Date(task.createdAt).toLocaleDateString("hy-AM", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const priceDisplay =
    task.priceType === "negotiable"
      ? "\u0532\u0561\u0576\u0561\u056f\u0581\u0561\u0575\u056b\u0576"
      : task.price
      ? `${formatPrice(task.price)} \u058f`
      : "\u0546\u0577\u057e\u0561\u056e \u0579\u0567";

  const userInitial = task.user?.name?.charAt(0)?.toUpperCase() ?? "?";
  const memberSince = task.user?.createdAt
    ? formatMemberSince(new Date(task.user.createdAt))
    : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pt-[50px] pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-6">

        {/* ── BREADCRUMBS ── */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-zinc-500 mb-4 flex-wrap">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
            {"\u0533\u056c\u056d\u0561\u057e\u0578\u0580"}
          </Link>
          <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/find-task" className="hover:text-black dark:hover:text-white transition-colors">
            {"\u0540\u0561\u0575\u057f\u0561\u0580\u0561\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580"}
          </Link>
          {category && (
            <>
              <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-500 dark:text-zinc-400">{category.name}</span>
            </>
          )}
          {subcategory && (
            <>
              <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-500 dark:text-zinc-400">{subcategory.name}</span>
            </>
          )}
        </nav>

        {/* 2-column layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Image Gallery */}
            {task.images && task.images.length > 0 && (
              <ImageGallery images={task.images} />
            )}

            {/* Title card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 p-6 md:p-8">


              <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-serif leading-snug mb-5">
                {task.title}
              </h1>

              {/* ── INFO CHIPS ── */}
              <div className="flex flex-wrap gap-2">
                {/* Date chip */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-zinc-800 text-xs text-gray-600 dark:text-zinc-400">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formattedDate}
                </div>

                {/* City chip */}
                {task.city && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-zinc-800 text-xs text-gray-600 dark:text-zinc-400">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {task.city}{task.address ? `, ${task.address}` : ""}
                  </div>
                )}

                {/* Deadline chip */}
                {task.deadline && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-zinc-800 text-xs text-gray-600 dark:text-zinc-400">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDeadline(task.deadline)}
                  </div>
                )}
              </div>
            </div>

            {/* Description card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 p-6 md:p-8">
              <h2 className="text-base font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-lime-500 inline-block" />
                {"\u0546\u056f\u0561\u0580\u0561\u0563\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576"}
              </h2>
              <p className="text-gray-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                {task.description}
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN — sticky contact card ── */}
          <div className="w-full lg:w-80 lg:sticky lg:top-24 shrink-0 space-y-4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">

              {/* Price header */}
              <div className="bg-gradient-to-br from-lime-50 to-green-50 dark:from-lime-950/30 dark:to-zinc-900 p-6 border-b border-lime-100 dark:border-zinc-800">
                <p className="text-xs text-gray-500 dark:text-zinc-500 mb-1 uppercase tracking-wide font-medium">
                  {"\u0532\u0575\u0578\u0582\u057b\u0565"}
                </p>
                <p className="text-3xl font-bold text-lime-600 dark:text-lime-400">
                  {priceDisplay}
                </p>
                {task.priceType === "negotiable" && (
                  <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">{"\u0533\u056b\u0576\u0568 \u0584\u0576\u0576\u0561\u0580\u056f\u0565\u056c\u056b \u0567"}</p>
                )}
              </div>

              {/* Contact buttons */}
              <div className="p-5 space-y-3">
                {task.phone ? (
                  <>
                    <a
                      href={`tel:${task.phone}`}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-lime-500 hover:bg-lime-600 active:scale-[0.98] text-white font-semibold rounded-xl transition-all shadow-sm"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {"\u0536\u0561\u0576\u0563\u0565\u056c"}
                    </a>
                    <a
                      href={`https://wa.me/${task.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] text-white font-semibold rounded-xl transition-all shadow-sm"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.570-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </a>
                  </>
                ) : (
                  <p className="text-sm text-gray-400 dark:text-zinc-500 text-center py-2">
                    {"\u053f\u0561\u057a\u056b \u057f\u057e\u0575\u0561\u056c\u0576\u0565\u0580\u0568 \u0576\u0577\u057e\u0561\u056e \u0579\u0565\u0576"}
                  </p>
                )}
              </div>

              {/* Posted by */}
              <div className="px-5 pb-5 pt-3 border-t border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center text-lime-700 dark:text-lime-400 font-bold text-sm shrink-0">
                    {userInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black dark:text-white truncate">
                      {task.user?.name ?? "\u0531\u0576\u0561\u0576\u0578\u0582\u0576"}
                    </p>
                    {memberSince && (
                      <p className="text-[11px] text-gray-400 dark:text-zinc-500">
                        {"\u0531\u0576\u0564\u0561\u0574 \u0567 "}{memberSince}{"\u056b\u0581"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Share section */}
              <div className="px-5 py-4 bg-gray-50/50 dark:bg-zinc-800/30 border-t border-gray-100 dark:border-zinc-800">
                <p className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-widest font-bold mb-3">
                  {"\u053f\u056b\u057d\u057e\u0565\u056c \u0568\u0576\u056f\u0565\u0580\u0576\u0565\u0580\u056b \u0570\u0565\u057f"}
                </p>
                <ShareButton />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
