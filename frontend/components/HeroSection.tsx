"use client";

import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  title?: string;
  titleHighlight?: string;
  description?: string;
  categoryLabel?: string;
  categoryEmoji?: string;
  timeAgo?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImageUrl?: string;
}

export default function HeroSection({
  title = "Τελικός Champions League",
  titleHighlight = "Έτοιμος για Επική Αναμέτρηση",
  description = "Δύο γίγαντες του ποδοσφαίρου ετοιμάζονται για την απόλυτη μάχη καθώς η Manchester City αντιμετωπίζει τη Real Madrid σε αυτό που υπόσχεται να είναι ο πιο συναρπαστικός τελικός Champions League των τελευταίων χρόνων.",
  categoryLabel = "Ποδόσφαιρο",
  categoryEmoji = "🔥",
  timeAgo = "5 λεπτά πριν",
  buttonText = "Διαβάστε περισσότερα →",
  buttonLink = "#",
  backgroundImageUrl = "/216-scaled-1.jpg",
}: HeroSectionProps) {
  return (
    <section className="relative h-[500px] md:h-[650px] overflow-hidden group shadow-lg">
      {/* Background Image with subtle zoom effect on hover */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        <Image
          src={backgroundImageUrl}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-[1]"></div>
      
      {/* Content on top of image */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center z-10">
        <div className="text-white max-w-2xl animate-fadeIn">
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-red-600 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wide shadow-md hover:bg-red-700 transition-colors cursor-pointer">
              {categoryEmoji} {categoryLabel}
            </span>
            <span className="text-gray-300 text-xs font-medium" suppressHydrationWarning>
              • {timeAgo}
            </span>
          </div>

          {/* Main Headline - smaller size */}
          <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 leading-tight drop-shadow-lg">
            {title}
            {titleHighlight && (
              <>
                <br />
                <span className="text-red-500">{titleHighlight}</span>
              </>
            )}
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg mb-6 leading-relaxed text-gray-100 drop-shadow-md">
            {description}
          </p>

          {/* CTA section - smaller buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {buttonLink && buttonLink !== '#' ? (
              <Link
                href={buttonLink}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-105"
              >
                {buttonText}
              </Link>
            ) : (
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-105">
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
