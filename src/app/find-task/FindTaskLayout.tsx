"use client";

import { useState } from "react";
import FindTaskContent from "@/components/FindTaskContent";
import { Task } from "@/types/task";

export default function FindTaskLayout({ tasks }: { tasks: Task[] }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pt-[35px] md:pt-[60px] pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Title */}
        <div className="text-center mb-5">
          <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white pb-[10px] font-serif">
            Բոլոր առաջադրանքները
          </h1>
        </div>

        {/* Search Container */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-3 flex items-center gap-3 mb-6">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 dark:text-zinc-500 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Search Input Field */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Որոնել առաջադրանքներ..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-2 py-2 pr-8 text-base bg-transparent border-none focus:outline-none text-black dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
            />
            {searchInput && (
              <button
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                aria-label="Մաքրել որոնումը"
              >
                <svg
                  className="w-4 h-4 text-gray-400 dark:text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors flex-shrink-0"
            aria-label="Ֆիլտրեր"
          >
            <svg
              className="w-5 h-5 text-gray-600 dark:text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
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

      {/* Main Content */}
      <FindTaskContent searchQuery={searchQuery} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} tasks={tasks} />
    </div>
  );
}
