"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { categories } from "@/data/categories";
import { findSubcategoryByName } from "@/utils/search-helpers";

interface Suggestion {
  categoryId: string;
  subcategoryId: string;
  categoryName: string;
  subcategoryName: string;
}

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [randomSubcategories, setRandomSubcategories] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allSubcategories = categories.flatMap(cat => 
      cat.subcategories
        .filter(sub => sub.name !== "Այլ")
        .map(sub => sub.name)
    );
    const shuffled = [...allSubcategories].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 1);
    setRandomSubcategories(selected);
  }, []);

  // Որոնել հուշումներ
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const results: Suggestion[] = [];

    // Որոնել բոլոր կատեգորիաների և ենթակատեգորիաների մեջ
    categories.forEach(category => {
      category.subcategories.forEach(subcategory => {
        const subcategoryName = subcategory.name.toLowerCase();
        const categoryName = category.name.toLowerCase();
        
        // Ստուգել՝ արդյոք ենթակատեգորիան կամ կատեգորիան պարունակում են որոնման տեքստը
        if (subcategoryName.includes(query) || categoryName.includes(query)) {
          results.push({
            categoryId: category.id,
            subcategoryId: subcategory.id,
            categoryName: category.name,
            subcategoryName: subcategory.name,
          });
        }
      });
    });

    // Սահմանափակել արդյունքները 8-ով
    setSuggestions(results.slice(0, 8));
    setShowSuggestions(results.length > 0);
    setSelectedIndex(-1);
  }, [searchQuery]);

  // Փակել dropdown-ը, երբ սեղմում են դրսում
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    // Եթե ընտրված է հուշում, օգտագործել այն
    if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
      const selected = suggestions[selectedIndex];
      router.push(`/create-task/${selected.subcategoryId}?category=${selected.categoryId}`);
      setShowSuggestions(false);
      return;
    }

    if (!searchQuery || searchQuery.trim() === '') {
      router.push('/create-task');
      return;
    }

    const result = findSubcategoryByName(searchQuery);
    
    if (result) {
      router.push(`/create-task/${result.subcategoryId}?category=${result.categoryId}`);
    } else {
      router.push('/create-task');
    }
    
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSearchQuery(suggestion.subcategoryName);
    router.push(`/create-task/${suggestion.subcategoryId}?category=${suggestion.categoryId}`);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) {
      if (e.key === "Enter") {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        handleSearch();
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleExampleClick = (subcategoryName: string) => {
    setSearchQuery(subcategoryName);
    
    const result = findSubcategoryByName(subcategoryName);
    
    if (result) {
      router.push(`/create-task/${result.subcategoryId}?category=${result.categoryId}`);
    } else {
      router.push('/create-task');
    }
    
    setShowSuggestions(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-58px 0px 0px 0px" }
    );

    if (searchBarRef.current) {
      observer.observe(searchBarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-16 lg:py-24">
        <div className="relative flex flex-col lg:flex-row min-h-[225px] lg:min-h-0">
          {/* Text content - Centered on mobile/tablet, Left side on desktop */}
          <div className="relative z-10 flex flex-col gap-5 sm:gap-8 items-center text-center lg:items-start lg:text-left lg:w-1/2">
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white font-serif leading-tight lg:whitespace-nowrap">
              Կազատենք ձեզ հոգսերից
            </h1>

            {/* Hero Image - Mobile/Tablet only */}
            <div className="block lg:hidden w-full max-w-md mx-auto">
              <Image 
                src="/hero2.png"
                alt="Hero illustration"
                width={400}
                height={300}
                priority
                className="w-full h-auto"
              />
            </div>

            {/* Search Bar */}
            <div ref={searchBarRef} className="flex flex-col gap-3 sm:gap-4 w-full relative">
              <div className="relative">
                <div className="flex items-center bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-zinc-800">
                  <input
                    type="text"
                    placeholder="Ծառայություն կամ մասնագետ"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    className="flex-1 px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base outline-none bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-zinc-500 font-sans"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-3 sm:px-8 py-3 sm:py-4 bg-[#82d134] hover:bg-[#73bc2a] text-white font-semibold transition-colors duration-200 active:scale-95 font-sans text-sm sm:text-base"
                  >
                    Գտնել
                  </button>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div 
                    ref={dropdownRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden z-50 max-h-[400px] overflow-y-auto"
                  >
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={`${suggestion.categoryId}-${suggestion.subcategoryId}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`
                          w-full px-4 sm:px-6 py-3 text-left
                          hover:bg-gray-50 dark:hover:bg-zinc-800
                          transition-colors duration-150
                          border-b border-gray-100 dark:border-zinc-800 last:border-b-0
                          ${selectedIndex === index ? 'bg-lime-50 dark:bg-lime-900/20' : ''}
                        `}
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-sm sm:text-base font-medium text-black dark:text-white">
                            {suggestion.subcategoryName}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
                            {suggestion.categoryName}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Example Section */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center lg:justify-start">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 font-sans">
                  Օրինակ՝
                </span>
                {randomSubcategories.map((subcategory, index) => (
                  <button 
                    key={index}
                    onClick={() => handleExampleClick(subcategory)}
                    className="px-3 sm:px-5 py-1.5 sm:py-2 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-medium rounded-full text-xs sm:text-sm transition-colors duration-200 active:scale-95 font-sans"
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            </div>

            {/* Sticky Search Bar */}
            {isSticky && (
              <div className="lg:hidden fixed top-[70px] left-0 right-0 z-40 px-4 transition-all duration-300">
                <div className="relative">
                  <div className="flex items-center bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-zinc-800">
                    <input
                      type="text"
                      placeholder="Ծառայություն կամ մասնագետ"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                      className="flex-1 px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base outline-none bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-zinc-500 font-sans"
                    />
                    <button
                      onClick={handleSearch}
                      className="px-3 sm:px-8 py-3 sm:py-4 bg-[#82d134] hover:bg-[#73bc2a] text-white font-semibold transition-colors duration-200 active:scale-95 font-sans text-sm sm:text-base"
                    >
                      Գտնել
                    </button>
                  </div>

                  {/* Suggestions Dropdown for Sticky */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div 
                      ref={dropdownRef}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden z-50 max-h-[400px] overflow-y-auto"
                    >
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={`sticky-${suggestion.categoryId}-${suggestion.subcategoryId}`}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={`
                            w-full px-4 sm:px-6 py-3 text-left
                            hover:bg-gray-50 dark:hover:bg-zinc-800
                            transition-colors duration-150
                            border-b border-gray-100 dark:border-zinc-800 last:border-b-0
                            ${selectedIndex === index ? 'bg-lime-50 dark:bg-lime-900/20' : ''}
                          `}
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-sm sm:text-base font-medium text-black dark:text-white">
                              {suggestion.subcategoryName}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
                              {suggestion.categoryName}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bottom CTA Button */}
            <button className="hero-cta-button w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-2.5 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-800 dark:text-green-300 font-semibold rounded-full text-sm sm:text-base transition-colors duration-200 active:scale-95 shadow-sm font-sans">
              Դառնալ կատարող և սկսել վաստակել
            </button>
          </div>

          {/* Hero Image - Right side on desktop, hidden on mobile */}
          <div className="hidden lg:block lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-96 xl:w-[28rem]">
            <Image 
              src="/hero.svg"
              alt="Hero illustration"
              width={500}
              height={500}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
