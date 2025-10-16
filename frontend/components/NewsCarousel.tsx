"use client";

import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import { CAROUSEL_CONFIG } from "@/lib/constants";
import { carouselNews } from "@/lib/data";


export default function NewsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { totalSlides, autoRotateInterval } = CAROUSEL_CONFIG;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [totalSlides, autoRotateInterval]);

  return (
    <section className="mb-12">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselNews.map((news, index) => (
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
