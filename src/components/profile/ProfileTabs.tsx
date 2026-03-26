"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ProfileTabs() {
  const pathname = usePathname()

  const tabs = [
    { href: "/profile", label: "Ակտիվ (1)" },
    { href: "/profile/posts", label: "Իմ հայտարարությունները" },
    { href: "/profile/reviews", label: "Կարծիքներ" },
    { href: "/profile/settings", label: "Կարգավորումներ" }
  ]

  return (
    <div className="flex overflow-x-auto hide-scrollbar gap-6 md:gap-8 mb-6 pb-2 border-b border-black/[.08] dark:border-white/[.145]">
      {tabs.map(tab => {
        const isActive = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative py-2 text-sm font-medium transition-all duration-300 hover:text-black dark:hover:text-white hover:scale-105 active:scale-95 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-black dark:after:bg-white after:transition-all after:duration-300 whitespace-nowrap ${
              isActive 
                ? "text-black dark:text-white after:w-full" 
                : "text-black/70 dark:text-white/70 after:w-0 hover:after:w-full"
            }`}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
