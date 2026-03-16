"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-2 max-w-7xl mx-auto">
        {/* Left side - Search Icon */}
        <div className="flex items-center">
          <button 
            onClick={() => router.push('/')}
            aria-label="Գլխավոր"
            className="group relative rounded-xl transition-all duration-300 ease-out hover:bg-black/[.06] dark:hover:bg-white/[.08] hover:scale-105 active:scale-95"
          >
            <img 
              src="/duinqd_logo.svg" 
              alt="Duinqd Logo" 
              className="h-10 w-auto transition-all duration-300 group-hover:rotate-12"
            />
          </button>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#services"
            onClick={scrollToServices}
            className="relative text-sm font-medium text-black/70 dark:text-white/70 transition-all duration-300 hover:text-black dark:hover:text-white hover:scale-105 active:scale-95 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Ստեղծել առաջադրանք
          </a>
          <a
            href="#"
            className="relative text-sm font-medium text-black/70 dark:text-white/70 transition-all duration-300 hover:text-black dark:hover:text-white hover:scale-105 active:scale-95 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Գտնել առաջադրանք
          </a>
          <button className="group relative px-6 py-2.5 text-sm font-medium text-black dark:text-white border border-black/[.12] dark:border-white/[.2] rounded-full transition-all duration-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:scale-105 hover:shadow-lg hover:shadow-black/[.1] dark:hover:shadow-white/[.1] active:scale-95 overflow-hidden">
            <span className="relative z-10">Մուտք</span>
            <span className="absolute inset-0 bg-gradient-to-r from-black/[.03] to-black/[.06] dark:from-white/[.03] dark:to-white/[.06] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </nav>

        {/* Hamburger Menu Button - Visible on mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
          className="md:hidden group relative p-2.5 rounded-xl transition-all duration-300 hover:bg-black/[.06] dark:hover:bg-white/[.08] active:scale-95"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span
              className={`h-0.5 w-full bg-black dark:bg-white rounded-full transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-black dark:bg-white rounded-full transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-black dark:bg-white rounded-full transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-3 px-6 pb-6 pt-4 bg-white dark:bg-black border-t border-black/[.08] dark:border-white/[.145]">
          <a
            href="#services"
            onClick={scrollToServices}
            className="w-full px-6 py-3 text-sm font-medium text-black dark:text-white bg-black/[.04] dark:bg-white/[.06] hover:bg-black/[.08] dark:hover:bg-white/[.12] rounded-full text-center transition-all duration-200 active:scale-95"
          >
            Ստեղծել առաջադրանք
          </a>
          <a
            href="#"
            className="w-full px-6 py-3 text-sm font-medium text-black dark:text-white bg-black/[.04] dark:bg-white/[.06] hover:bg-black/[.08] dark:hover:bg-white/[.12] rounded-full text-center transition-all duration-200 active:scale-95"
          >
            Գտնել առաջադրանք
          </a>
          <button className="w-full mt-1 px-6 py-3 text-sm font-medium text-white dark:text-black bg-black dark:bg-white rounded-full hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md">
            Մուտք
          </button>
        </nav>
      </div>
    </header>
  );
}
