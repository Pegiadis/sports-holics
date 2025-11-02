"use client";

import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import { CAROUSEL_CONFIG } from "@/lib/constants";
import { NewsArticle } from "@/types";

interface NewsCarouselProps {
  articles: NewsArticle[];
}

export default function NewsCarousel({ articles }: NewsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { autoRotateInterval } = CAROUSEL_CONFIG;
  
  // Calculate total slides based on articles length
  const totalSlides = Math.ceil(articles.length / 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [totalSlides, autoRotateInterval]);

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
    <section className="mb-12">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {articles.map((news, index) => (
            <div key={index} className="min-w-full md:min-w-[33.333%] px-2">
              <NewsCard {...news} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-primary" : "bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
