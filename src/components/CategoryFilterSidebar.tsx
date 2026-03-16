"use client";

import { useState } from "react";
import clsx from "clsx";
import { Category } from "@/data/categories";

interface CategoryFilterSidebarProps {
  categories: Category[];
  selectedCategories: string[] | null;
  selectedSubcategories: string[];
  onCategoryChange: (categoryIds: string[] | null) => void;
  onSubcategoryChange: (subcategoryIds: string[]) => void;
}

export default function CategoryFilterSidebar({
  categories,
  selectedCategories,
  selectedSubcategories,
  onCategoryChange,
  onSubcategoryChange,
}: CategoryFilterSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const allSelected = selectedCategories === null;

  const handleAllToggle = () => {
    if (allSelected) {
      onCategoryChange([]);
      onSubcategoryChange([]);
    } else {
      onCategoryChange(null);
      onSubcategoryChange([]);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    const current = selectedCategories === null ? [] : selectedCategories;
    let newSelected: string[];
    
    if (current.includes(categoryId)) {
      newSelected = current.filter(id => id !== categoryId);
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        const subcatsToRemove = category.subcategories.map(s => s.id);
        onSubcategoryChange(
          selectedSubcategories.filter(id => !subcatsToRemove.includes(id))
        );
      }
    } else {
      newSelected = [...current, categoryId];
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        const subcatsToAdd = category.subcategories.map(s => s.id);
        onSubcategoryChange([...selectedSubcategories, ...subcatsToAdd]);
      }
    }
    
    onCategoryChange(newSelected);
  };

  const handleSubcategoryToggle = (categoryId: string, subcategoryId: string) => {
    const current = selectedCategories === null ? [] : selectedCategories;
    let newSelected: string[];
    
    if (selectedSubcategories.includes(subcategoryId)) {
      newSelected = selectedSubcategories.filter(id => id !== subcategoryId);
    } else {
      newSelected = [...selectedSubcategories, subcategoryId];
      if (!current.includes(categoryId)) {
        onCategoryChange([...current, categoryId]);
      }
    }
    
    onSubcategoryChange(newSelected);
  };

  const toggleExpanded = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories.includes(categoryId);
  };

  return (
    <div className="w-full md:w-80 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 md:sticky md:top-24 md:self-start max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col">
      {/* Header - Fixed */}
      <div className="p-4 pb-0">
        <h2 className="text-lg font-bold text-black dark:text-white mb-4 font-serif break-words">
          Կատեգորիաներ
        </h2>

        {/* All Categories Checkbox */}
        <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer transition-colors mb-2">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleAllToggle}
              className="w-5 h-5 rounded border-2 border-gray-300 dark:border-zinc-600 checked:bg-lime-500 checked:border-lime-500 focus:ring-2 focus:ring-lime-500 focus:ring-offset-0 cursor-pointer appearance-none"
            />
            {allSelected && (
              <svg
                className="absolute w-3.5 h-3.5 text-white pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-sm font-medium text-black dark:text-white break-words">
            Բոլոր կատեգորիաները
          </span>
        </label>

        <div className="h-px bg-gray-200 dark:bg-zinc-800 my-3" />
      </div>

      {/* Categories List - Scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-4">
        <div className="space-y-1">
        {categories.map((category) => {
          const isExpanded = isCategoryExpanded(category.id);
          const isCategorySelected = selectedCategories !== null && selectedCategories.includes(category.id);
          const hasSelectedSubcats = category.subcategories.some(sub =>
            selectedSubcategories.includes(sub.id)
          );

          return (
            <div key={category.id} className="space-y-1">
              {/* Category Item */}
              <div className="flex items-center gap-2 min-w-0 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                {/* Expand/Collapse Button */}
                <button
                  onClick={() => toggleExpanded(category.id)}
                  className="flex-shrink-0"
                  aria-label={isExpanded ? "Փակել" : "Բացել"}
                >
                  <svg
                    className={clsx(
                      "w-4 h-4 text-gray-500 dark:text-zinc-400 transition-transform",
                      isExpanded && "rotate-90"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                  <div className="relative flex items-center justify-center flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={allSelected || isCategorySelected || hasSelectedSubcats}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="w-4 h-4 rounded border-2 border-gray-300 dark:border-zinc-600 checked:bg-lime-500 checked:border-lime-500 focus:ring-2 focus:ring-lime-500 focus:ring-offset-0 cursor-pointer appearance-none"
                    />
                    {(allSelected || isCategorySelected || hasSelectedSubcats) && (
                      <svg
                        className="absolute w-3 h-3 text-white pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-zinc-300 break-words min-w-0">
                    {category.name}
                  </span>
                </label>
              </div>

              {/* Subcategories */}
              {isExpanded && (
                <div className="ml-6 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {category.subcategories.map((subcategory) => {
                    const isSubcatSelected = selectedSubcategories.includes(subcategory.id);
                    
                    return (
                      <label
                        key={subcategory.id}
                        className="flex items-center gap-2 p-1.5 pl-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer transition-colors min-w-0"
                      >
                        <div className="relative flex items-center justify-center flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={allSelected || isSubcatSelected}
                            onChange={() => handleSubcategoryToggle(category.id, subcategory.id)}
                            className="w-3.5 h-3.5 rounded border-2 border-gray-300 dark:border-zinc-600 checked:bg-lime-500 checked:border-lime-500 focus:ring-2 focus:ring-lime-500 focus:ring-offset-0 cursor-pointer appearance-none"
                          />
                          {(allSelected || isSubcatSelected) && (
                            <svg
                              className="absolute w-2.5 h-2.5 text-white pointer-events-none"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-xs text-gray-600 dark:text-zinc-400 break-words min-w-0">
                          {subcategory.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
