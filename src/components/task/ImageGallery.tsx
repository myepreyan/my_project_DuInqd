"use client";

import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
        {/* Main image */}
        <div
          className="relative w-full aspect-[16/10] cursor-pointer group"
          onClick={() => setIsLightboxOpen(true)}
        >
          <img
            src={images[selectedIndex]}
            alt={`\u0546\u056f\u0561\u0580 ${selectedIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white opacity-0 group-hover:opacity-80 transition-opacity drop-shadow-lg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
              />
            </svg>
          </div>
          {images.length > 1 && (
            <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm">
              {selectedIndex + 1} / {images.length}
            </span>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  i === selectedIndex
                    ? "border-lime-500 ring-1 ring-lime-500/30"
                    : "border-transparent hover:border-gray-300 dark:hover:border-zinc-600"
                }`}
              >
                <img
                  src={img}
                  alt={`\u0546\u056f\u0561\u0580 ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-10"
            onClick={() => setIsLightboxOpen(false)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {images.length > 1 && (
            <button
              className="absolute left-4 text-white/70 hover:text-white p-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <img
            src={images[selectedIndex]}
            alt={`\u0546\u056f\u0561\u0580 ${selectedIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              className="absolute right-4 text-white/70 hover:text-white p-2 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {images.length > 1 && (
            <span className="absolute bottom-6 text-white/70 text-sm">
              {selectedIndex + 1} / {images.length}
            </span>
          )}
        </div>
      )}
    </>
  );
}
