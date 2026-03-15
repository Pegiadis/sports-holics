"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CAROUSEL_CONFIG, CATEGORY_COLORS } from "@/lib/constants";
import { NewsArticle } from "@/types";

interface NewsCarouselProps {
  articles: NewsArticle[];
}

export default function NewsCarousel({ articles }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const { autoRotateInterval } = CAROUSEL_CONFIG;

  const totalItems = articles.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
    setProgress(0);
    progressRef.current = 0;
    lastTimeRef.current = 0;
  }, [totalItems]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    progressRef.current = 0;
    lastTimeRef.current = 0;
  }, []);

  // Animate progress bar + auto-advance
  useEffect(() => {
    if (isHovered || totalItems <= 1) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      progressRef.current += delta;
      const pct = Math.min(progressRef.current / autoRotateInterval, 1);
      setProgress(pct);

      if (pct >= 1) {
        goToNext();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHovered, totalItems, autoRotateInterval, goToNext, currentIndex]);

  if (!articles || articles.length === 0) {
    return null;
  }

  const currentArticle = articles[currentIndex];

  return (
    <section
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main hero slide area */}
      <div className="relative w-full h-[420px] md:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden group">
        {/* Background images — all stacked, opacity-driven crossfade */}
        {articles.map((article, index) => {
          const imageSrc = article.image || article.imageUrl || "/default-news.jpg";
          return (
            <div
              key={article.slug || index}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: index === currentIndex ? 1 : 0 }}
              aria-hidden={index !== currentIndex}
            >
              <Image
                src={imageSrc}
                alt={article.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          );
        })}

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

        {/* Red brand accent — diagonal stripe */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-500 via-red-600 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
          {/* Category + meta */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`${CATEGORY_COLORS[currentArticle.category] || currentArticle.categoryColor} px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm`}
            >
              {currentArticle.category}
            </span>
            <span className="text-white/60 text-xs font-medium flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              {currentArticle.timeAgo}
            </span>
          </div>

          {/* Title — big and bold */}
          <Link href={`/article/${currentArticle.slug}`} className="group/title block">
            <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-black leading-tight max-w-3xl mb-3 drop-shadow-lg transition-colors duration-200 group-hover/title:text-red-400">
              {currentArticle.title}
            </h3>
          </Link>

          {/* Subtitle */}
          {currentArticle.subtitle && (
            <p className="text-white/70 text-sm md:text-base max-w-2xl line-clamp-2 mb-4">
              {currentArticle.subtitle}
            </p>
          )}

          {/* Author + CTA */}
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              {currentArticle.author}
            </span>
            <Link
              href={`/article/${currentArticle.slug}`}
              className="text-red-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
            >
              Διαβάστε περισσότερα
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Navigation arrows — edges */}
        <button
          onClick={() =>
            goToSlide((currentIndex - 1 + totalItems) % totalItems)
          }
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress indicators — inside the image, bottom-right */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex items-center gap-2">
          {articles.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative h-1 rounded-full overflow-hidden transition-all duration-300 ${
                  isActive ? "w-10 bg-white/30" : "w-5 bg-white/20 hover:bg-white/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {isActive && (
                  <div
                    className="absolute inset-y-0 left-0 bg-red-500 rounded-full transition-none"
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
