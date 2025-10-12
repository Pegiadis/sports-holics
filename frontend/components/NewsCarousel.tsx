"use client";

import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import { CAROUSEL_CONFIG } from "@/lib/constants";

const carouselNews = [
  {
    category: "HOT",
    categoryColor: "bg-red-100 text-red-800",
    title: "Transfer Deadline Day Chaos",
    description:
      "Last-minute deals shake up European football as clubs scramble to complete signings...",
    timeAgo: "30 minutes ago",
    author: "Emma Rodriguez",
    imageUrl: "/216-scaled-1.jpg",
  },
  {
    category: "HOT",
    categoryColor: "bg-red-100 text-red-800",
    title: "NBA MVP Award Ceremony",
    description:
      "Historic moment as youngest player in league history receives the Most Valuable Player award...",
    timeAgo: "45 minutes ago",
    author: "Marcus Johnson",
    imageUrl: "/216-scaled-1.jpg",
  },
  {
    category: "HOT",
    categoryColor: "bg-red-100 text-red-800",
    title: "F1 Championship Standings Shift",
    description:
      "Unexpected results in Italian Grand Prix completely change the title race dynamics...",
    timeAgo: "1 hour ago",
    author: "Lucas Peterson",
    imageUrl: "/216-scaled-1.jpg",
  },
  {
    category: "HOT",
    categoryColor: "bg-red-100 text-red-800",
    title: "Olympic Records Broken",
    description:
      "Three world records fall in spectacular fashion during track and field competitions...",
    timeAgo: "2 hours ago",
    author: "Sofia Chen",
    imageUrl: "/216-scaled-1.jpg",
  },
  {
    category: "HOT",
    categoryColor: "bg-red-100 text-red-800",
    title: "Wimbledon Upset Victory",
    description:
      "Unseeded player defeats former world number one in straight sets shock result...",
    timeAgo: "3 hours ago",
    author: "James Wilson",
    imageUrl: "/216-scaled-1.jpg",
  },
];

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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Hot News</h2>
        <div className="flex items-center space-x-4">
          <button className="bg-primary text-white px-4 py-2 rounded-[var(--radius-button)] font-medium whitespace-nowrap">
            Last News
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-[var(--radius-button)] font-medium whitespace-nowrap hover:bg-gray-300 transition-colors">
            Breaking
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-[var(--radius-button)] font-medium whitespace-nowrap hover:bg-gray-300 transition-colors">
            Trending
          </button>
        </div>
      </div>

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

