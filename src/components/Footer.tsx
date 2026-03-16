"use client";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-zinc-800 bg-[#F7F8FA] dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          
          {/* About Section - Takes 2 columns on desktop */}
          <div className="lg:col-span-2 text-center md:text-left">
            <h3 className="text-base md:text-lg font-bold text-black dark:text-white mb-3 md:mb-4 font-serif">
              Մեր մասին
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-zinc-400 leading-relaxed font-sans max-w-md mx-auto md:mx-0">
              Մենք միավորում ենք մարդկանց, ովքեր ունեն առաջադրանքներ նրանց հետ, 
              ովքեր կարող են դրանք կատարել։ Մեր նպատակն է դարձնել ծառայությունների 
              փոխանակումը հեշտ և անվտանգ։
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-base md:text-lg font-semibold text-black dark:text-white mb-3 md:mb-4 font-sans">
              Արագ հղումներ
            </h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a 
                  href="#"
                  className="text-sm md:text-base text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 font-sans inline-block hover:translate-x-1 transition-transform"
                >
                  Ստեղծել առաջադրանք
                </a>
              </li>
              <li>
                <a 
                  href="/find-task"
                  className="text-sm md:text-base text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 font-sans inline-block hover:translate-x-1 transition-transform"
                >
                  Գտնել առաջադրանք
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  className="text-sm md:text-base text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 font-sans inline-block hover:translate-x-1 transition-transform"
                >
                  Մեր մասին
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  className="text-sm md:text-base text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 font-sans inline-block hover:translate-x-1 transition-transform"
                >
                  Կապ
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  className="text-sm md:text-base text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 font-sans inline-block hover:translate-x-1 transition-transform"
                >
                  Օգտագործման պայմաններ
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  className="text-sm md:text-base text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 font-sans inline-block hover:translate-x-1 transition-transform"
                >
                  Գաղտնիության քաղաքականություն
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-base md:text-lg font-semibold text-black dark:text-white mb-3 md:mb-4 font-sans">
              Կապ
            </h4>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-gray-600 dark:text-zinc-400 flex-shrink-0"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a 
                  href="tel:+37412345678"
                  className="text-sm md:text-base text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 font-sans"
                >
                  +374 12 345 678
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-gray-600 dark:text-zinc-400 flex-shrink-0"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <a 
                  href="mailto:info@example.am"
                  className="text-sm md:text-base text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 font-sans"
                >
                  info@example.am
                </a>
              </li>
              <li className="flex items-start justify-center md:justify-start gap-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-gray-600 dark:text-zinc-400 flex-shrink-0 mt-0.5"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="text-sm md:text-base text-gray-600 dark:text-zinc-400 font-sans">
                  Երևան, Հայաստան
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h4 className="text-base md:text-lg font-semibold text-black dark:text-white mb-3 md:mb-4 font-sans">
              Սոցիալական ցանցեր
            </h4>
            <div className="flex justify-center md:justify-start gap-3 md:gap-4">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group p-2 md:p-2.5 rounded-full bg-gray-100 dark:bg-zinc-900 hover:bg-black dark:hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="text-gray-700 dark:text-zinc-300 group-hover:text-white dark:group-hover:text-black transition-colors duration-300"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group p-2 md:p-2.5 rounded-full bg-gray-100 dark:bg-zinc-900 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-700 dark:text-zinc-300 group-hover:text-white transition-colors duration-300"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group p-2 md:p-2.5 rounded-full bg-gray-100 dark:bg-zinc-900 hover:bg-blue-600 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="text-gray-700 dark:text-zinc-300 group-hover:text-white transition-colors duration-300"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Twitter/X */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="group p-2 md:p-2.5 rounded-full bg-gray-100 dark:bg-zinc-900 hover:bg-black dark:hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="text-gray-700 dark:text-zinc-300 group-hover:text-white dark:group-hover:text-black transition-colors duration-300"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 dark:border-zinc-800 mt-8 md:mt-12 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-xs md:text-sm text-gray-600 dark:text-zinc-400 font-sans">
              © 2026 Բոլոր իրավունքները պաշտպանված են
            </p>
            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
              <a 
                href="#"
                className="text-xs md:text-sm text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 font-sans"
              >
                Օգտագործման պայմաններ
              </a>
              <span className="text-gray-400 dark:text-zinc-600">•</span>
              <a 
                href="#"
                className="text-xs md:text-sm text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 font-sans"
              >
                Գաղտնիության քաղաքականություն
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
