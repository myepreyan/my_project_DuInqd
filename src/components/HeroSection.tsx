"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    console.log("Որոնել:", searchQuery);
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
            <div ref={searchBarRef} className="flex flex-col gap-3 sm:gap-4 w-full">
              <div className="flex items-center bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-zinc-800">
                <input
                  type="text"
                  placeholder="Ծառայություն կամ մասնագետ"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base outline-none bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-zinc-500 font-sans"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="px-3 sm:px-8 py-3 sm:py-4 bg-[#82d134] hover:bg-[#73bc2a] text-white font-semibold transition-colors duration-200 active:scale-95 font-sans text-sm sm:text-base"
                >
                  Գտնել
                </button>
              </div>

              {/* Example Section */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center lg:justify-start">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 font-sans">
                  Օրինակ՝
                </span>
                <button className="px-3 sm:px-5 py-1.5 sm:py-2 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-medium rounded-full text-xs sm:text-sm transition-colors duration-200 active:scale-95 font-sans">
                  Անիմատոր
                </button>
              </div>
            </div>

            {/* Sticky Search Bar */}
            {isSticky && (
              <div className="lg:hidden fixed top-[70px] left-0 right-0 z-40 px-4 transition-all duration-300">
                <div className="flex items-center bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-zinc-800">
                  <input
                    type="text"
                    placeholder="Ծառայություն կամ մասնագետ"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base outline-none bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-zinc-500 font-sans"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <button
                    onClick={handleSearch}
                    className="px-3 sm:px-8 py-3 sm:py-4 bg-[#82d134] hover:bg-[#73bc2a] text-white font-semibold transition-colors duration-200 active:scale-95 font-sans text-sm sm:text-base"
                  >
                    Գտնել
                  </button>
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
