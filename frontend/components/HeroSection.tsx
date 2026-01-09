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
    <section className="relative min-h-[600px] md:h-[650px] overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Animated geometric pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Centered Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-center z-10 py-8 md:py-0">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          
          {/* Left Side - Text Content */}
          <div className="text-white animate-fadeIn order-2 lg:order-1 pb-4 md:pb-0">
            {/* Category badge */}
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <span className="bg-red-600 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wide shadow-md hover:bg-red-700 transition-colors cursor-pointer">
                {categoryEmoji} {categoryLabel}
              </span>
              <span className="text-gray-300 text-xs font-medium" suppressHydrationWarning>
                • {timeAgo}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
              {title}
              {titleHighlight && (
                <>
                  <br />
                  <span className="text-red-500">{titleHighlight}</span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-sm md:text-lg mb-4 md:mb-6 leading-relaxed text-gray-300 line-clamp-3 md:line-clamp-none">
              {description}
            </p>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-3">
              {buttonLink && buttonLink !== '#' ? (
                <Link
                  href={buttonLink}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-red-600/50"
                >
                  {buttonText}
                </Link>
              ) : (
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold text-sm shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-red-600/50">
                  {buttonText}
                </button>
              )}
            </div>
          </div>

          {/* Right Side - Featured Image */}
          <div className="relative order-1 lg:order-2 group">
            <div className="relative h-[250px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105">
              {/* Image Container */}
              <div className="absolute inset-0">
                <Image
                  src={backgroundImageUrl}
                  alt={title}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              
              {/* Subtle gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Decorative border glow */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-red-500/50 transition-all duration-500"></div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-600/20 rounded-full filter blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-600/20 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>

        </div>
      </div>
    </section>
  );
}
