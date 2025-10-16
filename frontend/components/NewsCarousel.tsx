"use client";

import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import { CAROUSEL_CONFIG } from "@/lib/constants";
import { NewsArticle } from "@/types";

const carouselNews: NewsArticle[] = [
  {
    category: "ΣΗΜΑΝΤΙΚΑ ΝΕΑ",
    categoryColor: "bg-red-100 text-red-800",
    title: "Το Παράθυρο Μεταγραφών του Καλοκαιριού Ανοίγει",
    description: "Οι μεγάλες ομάδες ετοιμάζονται για τις μεγαλύτερες υπογραφές καθώς το καλοκαιρινό παράθυρο μεταγραφών ανοίγει...",
    timeAgo: "30 minutes ago",
    author: "Έμμα Ροντρίγκεζ",
    imageUrl: "/basket1.png",
  },
  {
    category: "ΣΗΜΑΝΤΙΚΑ ΝΕΑ",
    categoryColor: "bg-red-100 text-red-800",
    title: "Τελετή Απονομής MVP του NBA",
    description: "Ιστορική στιγμή καθώς ο νεότερος παίκτης στην ιστορία του πρωταθλήματος λαμβάνει το βραβείο Πολυτιμότερου Παίκτη...",
    timeAgo: "45 minutes ago",
    author: "Μάρκους Τζόνσον",
    imageUrl: "/football1.png",
  },
  {
    category: "ΣΗΜΑΝΤΙΚΑ ΝΕΑ",
    categoryColor: "bg-red-100 text-red-800",
    title: "Αλλαγή στη Βαθμολογία του Πρωταθλήματος F1",
    description: "Απροσδόκητα αποτελέσματα στο Grand Prix της Ιταλίας αλλάζουν εντελώς τη δυναμική της διεκδίκησης του τίτλου...",
    timeAgo: "1 hour ago",
    author: "Λούκας Πέτερσον",
    imageUrl: "/f1.png",
  },
  {
    category: "ΣΗΜΑΝΤΙΚΑ ΝΕΑ",
    categoryColor: "bg-red-100 text-red-800",
    title: "Ολυμπιακά Ρεκόρ Σπάνε",
    description: "Τρία παγκόσμια ρεκόρ πέφτουν με εντυπωσιακό τρόπο κατά τη διάρκεια των αγώνων στίβου...",
    timeAgo: "2 hours ago",
    author: "Σοφία Τσεν",
    imageUrl: "/greek_basket.png",
  },
  {
    category: "ΣΗΜΑΝΤΙΚΑ ΝΕΑ",
    categoryColor: "bg-red-100 text-red-800",
    title: "Έκπληξη Νίκη στο Wimbledon",
    description: "Ο αμάτερ παίκτης νικά τον πρώην νούμερο ένα του κόσμου σε ίσια σετ σε σοκαριστικό αποτέλεσμα...",
    timeAgo: "3 hours ago",
    author: "Τζέιμς Γουίλσον",
    imageUrl: "/f2.png",
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
        <h2 className="text-3xl font-bold text-gray-800">Σημαντικά Νέα</h2>
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
