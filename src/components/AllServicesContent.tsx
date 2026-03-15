"use client";

import { useState, useMemo } from "react";
import clsx from "clsx";
import { categories } from "@/data/categories";
import CategoryButton from "@/components/CategoryButton";
import SubcategoryButton from "@/components/SubcategoryButton";
import { LAYOUT, PILL_GAPS } from "@/constants/layout";

export default function AllServicesContent() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const activeCategoryData = useMemo(
    () => categories.find((cat) => cat.id === activeCategory),
    [activeCategory]
  );

  const handleSubcategoryClick = (subcategoryId: string, subcategoryName: string) => {
    console.log("Ստեղծել առաջադրանք:", { subcategoryId, subcategoryName });
    // TODO: Navigate to create task page
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 lg:py-16">
        <div className="text-center mb-6 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-3 md:mb-4 font-serif">
            Ընտրեք կատեգորիան
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-zinc-400 font-sans max-w-3xl mx-auto">
            Մենք պատրաստ ենք օգնել ձեզ տարբեր առաջադրանքների լուծման համար
          </p>
        </div>

        <div
          className={clsx(
            "md:hidden sticky top-header-mobile z-10",
            "bg-gray-50 dark:bg-zinc-950 py-3 mb-6 -mx-4 px-4"
          )}
        >
          <div className="overflow-x-auto scrollbar-hide pb-2">
            <div className={clsx("flex min-w-max", PILL_GAPS.mobile)}>
              {categories.map((category) => (
                <CategoryButton
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  iconId={category.iconId}
                  isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                  variant="mobile"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:block mb-12">
          <div className={clsx("flex flex-wrap justify-center", PILL_GAPS.desktop)}>
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                id={category.id}
                name={category.name}
                iconId={category.iconId}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                variant="desktop"
              />
            ))}
          </div>
        </div>

        {activeCategoryData && (
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-4 md:mb-8 font-serif">
              {activeCategoryData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
              {activeCategoryData.subcategories.map((subcategory) => (
                <SubcategoryButton
                  key={subcategory.id}
                  name={subcategory.name}
                  onClick={() => handleSubcategoryClick(subcategory.id, subcategory.name)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
