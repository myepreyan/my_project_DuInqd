"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTaskFormStore } from "@/store/useTaskFormStore";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const { resetForm } = useTaskFormStore();

  const handleCreateTask = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    resetForm();
    router.push('/all-services');
    setIsMenuOpen(false);
  };

  const handleFindTask = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    resetForm();
    router.push('/find-task');
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    resetForm();
    router.push('/');
  };
  
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-2 max-w-7xl mx-auto">
        {/* Left side - Search Icon */}
        <div className="flex items-center">
          <button 
            onClick={handleLogoClick}
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
            href="/all-services"
            onClick={handleCreateTask}
            className="relative text-sm font-medium text-black/70 dark:text-white/70 transition-all duration-300 hover:text-black dark:hover:text-white hover:scale-105 active:scale-95 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Ստեղծել առաջադրանք
          </a>
          <a
            href="/find-task"
            onClick={handleFindTask}
            className="relative text-sm font-medium text-black/70 dark:text-white/70 transition-all duration-300 hover:text-black dark:hover:text-white hover:scale-105 active:scale-95 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Գտնել առաջադրանք
          </a>
          
          {status === "loading" ? (
            <div className="px-6 py-2.5">
              <div className="w-16 h-4 bg-black/10 dark:bg-white/10 rounded animate-pulse"></div>
            </div>
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/[.12] dark:border-white/[.2] hover:bg-black/[.04] dark:hover:bg-white/[.06] transition-all"
              >
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || ""}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm font-medium">{session.user.name}</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-black/[.08] dark:border-white/[.145] rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => {
                      router.push('/profile');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-black/[.04] dark:hover:bg-white/[.06] transition-colors"
                  >
                    Իմ պրոֆիլը
                  </button>
                  <hr className="border-black/[.08] dark:border-white/[.145]" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                  >
                    Դուրս գալ
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/login')}
                className="px-6 py-2.5 text-sm font-medium border border-black/[.12] dark:border-white/[.2] rounded-full hover:bg-black/[.04] dark:hover:bg-white/[.06] transition-all"
              >
                Մուտք
              </button>
              <button
                onClick={() => router.push('/register')}
                className="px-6 py-2.5 text-sm font-medium bg-black dark:bg-white text-white dark:text-black rounded-full hover:scale-105 transition-all"
              >
                Գրանցվել
              </button>
            </div>
          )}
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
            href="/all-services"
            onClick={handleCreateTask}
            className="w-full px-6 py-3 text-sm font-medium text-black dark:text-white bg-black/[.04] dark:bg-white/[.06] hover:bg-black/[.08] dark:hover:bg-white/[.12] rounded-full text-center transition-all duration-200 active:scale-95"
          >
            Ստեղծել առաջադրանք
          </a>
          <a
            href="/find-task"
            onClick={handleFindTask}
            className="w-full px-6 py-3 text-sm font-medium text-black dark:text-white bg-black/[.04] dark:bg-white/[.06] hover:bg-black/[.08] dark:hover:bg-white/[.12] rounded-full text-center transition-all duration-200 active:scale-95"
          >
            Գտնել առաջադրանք
          </a>
          
          {session ? (
            <>
              <button
                onClick={() => {
                  router.push('/profile');
                  setIsMenuOpen(false);
                }}
                className="w-full px-6 py-3 text-sm font-medium text-black dark:text-white bg-black/[.04] dark:bg-white/[.06] hover:bg-black/[.08] dark:hover:bg-white/[.12] rounded-full text-center transition-all duration-200 active:scale-95"
              >
                Իմ պրոֆիլը
              </button>
              <button 
                onClick={handleLogout}
                className="w-full mt-1 px-6 py-3 text-sm font-medium text-white dark:text-black bg-red-600 dark:bg-red-500 rounded-full hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                Դուրս գալ
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => {
                  router.push('/login');
                  setIsMenuOpen(false);
                }}
                className="w-full px-6 py-3 text-sm font-medium text-black dark:text-white bg-black/[.04] dark:bg-white/[.06] hover:bg-black/[.08] dark:hover:bg-white/[.12] rounded-full text-center transition-all duration-200 active:scale-95"
              >
                Մուտք
              </button>
              <button 
                onClick={() => {
                  router.push('/register');
                  setIsMenuOpen(false);
                }}
                className="w-full px-6 py-3 text-sm font-medium text-white dark:text-black bg-black dark:bg-white rounded-full hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md"
              >
                Գրանցվել
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
