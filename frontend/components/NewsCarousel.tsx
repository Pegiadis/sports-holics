"use client";

import { useState, useEffect, useCallback } from "react";
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
  const { autoRotateInterval } = CAROUSEL_CONFIG;

  const totalItems = articles.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-rotate unless hovered
  useEffect(() => {
    if (isHovered || totalItems <= 1) return;

    const interval = setInterval(goToNext, autoRotateInterval);
    return () => clearInterval(interval);
  }, [isHovered, totalItems, autoRotateInterval, goToNext]);

  // If no articles, show a message
  if (!articles || articles.length === 0) {
    return (
      <section className="mb-12">
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No carousel articles available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="mb-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <div className="relative pb-4">
        {/* Cards Container */}
        <div className="relative h-[420px] md:h-[480px] flex items-center justify-center overflow-visible">
          {/* Navigation Arrow - Left */}
          <button
            onClick={goToPrev}
            className="absolute left-0 md:left-4 z-30 w-10 h-10 md:w-11 md:h-11 bg-white hover:bg-gray-50 rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            aria-label="Previous slide"
          >
            <svg 
              className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards */}
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center px-12 md:px-16">
            {articles.map((article, index) => {
              // Calculate position relative to current
              let position = index - currentIndex;
              
              // Handle wrap-around for circular navigation
              if (position > totalItems / 2) position -= totalItems;
              if (position < -totalItems / 2) position += totalItems;

              // Only render visible cards (-2 to +2)
              if (Math.abs(position) > 2) return null;

              const isCenter = position === 0;
              const isAdjacent = Math.abs(position) === 1;

              // Calculate styles based on position
              const translateX = position * (isCenter ? 0 : isAdjacent ? 320 : 500);
              const scale = isCenter ? 1 : isAdjacent ? 0.85 : 0.7;
              const zIndex = isCenter ? 20 : isAdjacent ? 10 : 5;
              const opacity = isCenter ? 1 : isAdjacent ? 0.6 : 0.3;

              return (
                <div
                  key={article.slug || index}
                  className="absolute transition-all duration-500 ease-out"
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                >
                  <CarouselCard 
                    article={article} 
                    isCenter={isCenter}
                    onClick={() => !isCenter && goToSlide(index)}
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Arrow - Right */}
          <button
            onClick={goToNext}
            className="absolute right-0 md:right-4 z-30 w-10 h-10 md:w-11 md:h-11 bg-white hover:bg-gray-50 rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            aria-label="Next slide"
          >
            <svg 
              className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {articles.map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? "w-8 h-2.5 bg-red-600" 
                  : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Carousel Card Component
interface CarouselCardProps {
  article: NewsArticle;
  isCenter: boolean;
  onClick: () => void;
}

function CarouselCard({ article, isCenter, onClick }: CarouselCardProps) {
  const imageSrc = article.image || article.imageUrl || '/default-news.jpg';

  const cardContent = (
    <div 
      className={`relative w-[300px] md:w-[480px] bg-white rounded-xl overflow-hidden transition-all duration-500 ${
        isCenter 
          ? 'shadow-2xl ring-1 ring-gray-200' 
          : 'shadow-lg cursor-pointer hover:shadow-xl'
      }`}
      onClick={!isCenter ? onClick : undefined}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageSrc}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 300px, 480px"
          className={`object-cover transition-transform duration-500 ${isCenter ? 'hover:scale-105' : ''}`}
          priority={isCenter}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`${CATEGORY_COLORS[article.category] || article.categoryColor} px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide shadow-sm`}>
            {article.category}
          </span>
        </div>

        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-base md:text-lg line-clamp-2 drop-shadow-lg">
            {article.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {article.subtitle && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {article.subtitle}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {article.timeAgo}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {article.author}
          </span>
        </div>

        {/* Read more link for center card */}
        {isCenter && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-red-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Διαβάστε περισσότερα
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (isCenter && article.slug) {
    return (
      <Link href={`/article/${article.slug}`} className="block group">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
