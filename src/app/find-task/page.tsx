"use client";

import { useState } from "react";

export default function FindTaskPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Որոնում:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pt-[35px] md:pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Title */}
        <div className="text-center mb-5">
          <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white pb-[10px]">
            Բոլոր առաջադրանքները
          </h1>
        </div>

        {/* Search Container */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-3 flex items-center gap-3">
          
          {/* Search Input Field */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Որոնել առաջադրանքներ"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-base bg-transparent border-none focus:outline-none text-black dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
            />
          </div>

          {/* Filter Button */}
          <button
            aria-label="Ֆիլտր"
            className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600 dark:text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h18M6 8h12M9 12h6M11 16h2"
              />
            </svg>
          </button>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="px-5 py-2 bg-lime-500 hover:bg-lime-600 text-white font-medium rounded-lg transition-colors duration-200 active:scale-95"
          >
            Գտնել
          </button>
        </div>

      </div>
    </div>
  );
}
