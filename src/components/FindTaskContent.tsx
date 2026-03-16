"use client";

import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import { categories } from "@/data/categories";
import { mockTasks } from "@/data/tasks";
import { Task } from "@/types/task";
import CategoryFilterSidebar from "@/components/CategoryFilterSidebar";
import TaskCard from "@/components/TaskCard";

interface FindTaskContentProps {
  searchQuery: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function FindTaskContent({ searchQuery, isSidebarOpen, setIsSidebarOpen }: FindTaskContentProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[] | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  const filteredTasks = useMemo(() => {
    let filtered = [...mockTasks];

    // Filter by categories
    if (selectedCategories !== null && selectedCategories.length > 0) {
      filtered = filtered.filter((task) =>
        selectedCategories.includes(task.categoryId)
      );
    }

    // Filter by subcategories
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter((task) =>
        selectedSubcategories.includes(task.subcategoryId)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      
      filtered = filtered.filter((task) => {
        const category = categories.find(c => c.id === task.categoryId);
        const categoryName = category?.name.toLowerCase() || '';
        
        const subcategory = category?.subcategories.find(
          s => s.id === task.subcategoryId
        );
        const subcategoryName = subcategory?.name.toLowerCase() || '';
        
        return (
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          task.tag.toLowerCase().includes(query) ||
          (task.location && task.location.toLowerCase().includes(query)) ||
          categoryName.includes(query) ||
          subcategoryName.includes(query)
        );
      });
    }

    return filtered;
  }, [selectedCategories, selectedSubcategories, searchQuery]);

  const handleTaskSelect = (taskId: string) => {
    console.log("Ընտրված առաջադրանք:", taskId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile Sidebar Modal */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsSidebarOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-zinc-950 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-black dark:text-white font-serif">
                Ֆիլտրեր
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <CategoryFilterSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              selectedSubcategories={selectedSubcategories}
              onCategoryChange={setSelectedCategories}
              onSubcategoryChange={setSelectedSubcategories}
            />
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Tasks Grid - Left Side */}
        <div className="flex-1 min-w-0">
          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-zinc-400">
              Գտնվել է <span className="font-semibold text-black dark:text-white">{filteredTasks.length}</span> առաջադրանք
            </p>
          </div>

          {/* Tasks Grid */}
          {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} onSelect={handleTaskSelect} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 dark:text-zinc-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Առաջադրանքներ չեն գտնվել
              </h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Փորձեք փոխել որոնման պարամետրերը կամ ֆիլտրերը
              </p>
            </div>
          )}
        </div>

        {/* Sidebar - Right Side (Desktop) */}
        <aside className="hidden md:block">
          <CategoryFilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            selectedSubcategories={selectedSubcategories}
            onCategoryChange={setSelectedCategories}
            onSubcategoryChange={setSelectedSubcategories}
          />
        </aside>
      </div>
    </div>
  );
}
